import React from 'react';
import clsx from 'clsx';

import styles from './style.module.css';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { CommunityListEvent, CommunityListCalendar } from '../social-community';

import { usePluginData } from '@docusaurus/useGlobalData';

import seedrandom from 'seedrandom';

import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

function shuffle(array, rng) {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function EventCalendar(event) {
  var rng = seedrandom(event.title);
  let attendees = shuffle(event.attendees, rng);
  return (
    <CommunityListCalendar members={[/*event.maintrack ? 'createursdecompagnie' : ''*/].concat(event.presenters.concat(attendees)).slice(0, 6)} />
  );
}

function EnventPresenters(event) {
  let length = event.presenters.length;
  if (length > 0) {
    return (
      <>
        <h5 className={styles.popupSubtitle}>{length > 1 ? 'Présentateurs' : 'Présentateur'}</h5>
        <CommunityListEvent members={event.presenters} />
      </>
    );
  }
}

function EventAttendees(event) {
  let length = event.attendees.length;
  if (length > 0) {
    var rng = seedrandom(event.title);
    let attendees = shuffle(event.attendees, rng);
    return (
      <>
        <h5 className={styles.popupSubtitle}>{length > 1 ? 'Participants' : 'Participant'}</h5>
        <CommunityListEvent members={attendees} />
      </>
    );
  }
}

function EventLink(event) {
  var rng = seedrandom(event.title);
  let all = event.presenters.concat(shuffle(event.attendees, rng));
  let length = all.length;

  if (length > 1) {
    return "https://multitwitch.live/" + all.join('/');
  }
  else if (length == 1) {
    return "https://www.twitch.tv/" + all[0];
  }
  else {
    return "";
  }
}

function GetTimezone(date) {
  let timezoneOffset = date.getTimezoneOffset();
  let timezoneOffsetAbs = Math.abs(timezoneOffset);
  let localeStringProps = { minimumIntegerDigits: 2, useGrouping: false };
  return (
    <>UTC{((timezoneOffset <= 0) ? '+' : '-')}{(~~(timezoneOffsetAbs / 60)).toLocaleString('fr-FR', localeStringProps)}:{(timezoneOffsetAbs % 60).toLocaleString('fr-FR', localeStringProps)}</>
  );
}

function FormatHour(date) {
  let localeStringProps = { minimumIntegerDigits: 2, useGrouping: false };
  return (
    <>{date.getHours().toLocaleString('fr-FR', localeStringProps)}:{date.getMinutes().toLocaleString('fr-FR', localeStringProps)}</>
  );
}

function FormatDate(date) {
  let weekDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  let day = weekDays[date.getDay()];
  return (
    <>{day} {FormatHour(date)}</>
  );
}

export function Planning2022() {
  const { planning2022 } = usePluginData('social-community-plugin');
  return (
    <>{Planning(planning2022)}</>
  );
}

export function Planning2024() {
  const { planning2024 } = usePluginData('social-community-plugin');
  return (
    <>{Planning(planning2024)}</>
  );
}

function Planning(planning) {
  let weekDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  let uniqueDays = planning.map(function (event) {
    let date = new Date(event.start);
    return {
      weekDay: weekDays[date.getDay()],
      date: date.getDate(),
      dateString: date.toDateString()
    };
  }).filter(function (item, pos, self) {
    return !pos || item.dateString != self[pos - 1].dateString;
  });
  const today = new Date();
  const todayDateString = today.toDateString();
  return (
    <>
      <Tabs>
        {uniqueDays.map((day, index) => (
          <TabItem key={index} value={day.dateString} label={day.date} default={day.dateString == todayDateString} attributes={{ className: styles['calendarTab' + day.weekDay] }}>
            <div className="container">
              <div className="row">
                {planning.map((event, index) => {
                  let start = new Date(event.start); let end = new Date(event.end);
                  let live = today >= start && today <= end;
                  if (day.dateString == start.toDateString()) {
                    return (
                      <Popup
                        key={index}
                        trigger={
                          <div className={clsx('col col--12', styles.calendarEntry)}>
                            <div>
                              <span className={styles.calendarEntryTime}>{live ? <span className={styles.calendarEntryTimeLive}>🔴LIVE</span> : FormatHour(start)}</span>-&nbsp;<span className={styles.calendarEntryTitle} >{event.title}</span>
                            </div>
                            <div className={styles.calendarEntryCalendar}>{EventCalendar(event)}</div>
                          </div>
                        }

                        modal
                      >
                        {close => (
                          // <div className="card-demo">
                          <div className="card">
                            <div className={clsx('card__header', styles.popupHeader)}>
                              <button aria-label="Close" className="clean-btn close" type="button" onClick={close}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <div className="avatar">
                                <div className="avatar__intro">
                                  <h4 className={styles.popupTitle}>{event.title}</h4>
                                  <small>{FormatDate(start)} - {FormatDate(end)}</small>
                                </div>
                              </div>
                            </div>
                            <div className="card__body">
                              <p>
                                {event.description}
                              </p>
                              {EnventPresenters(event)}
                              {EventAttendees(event)}
                            </div>
                            <div className="card__footer">
                              <a className="button button--block button--primary" href={EventLink(event)}>Regarder en Live</a>
                            </div>
                          </div>
                          // </div>
                        )}
                      </Popup>
                    );
                  }
                })}
              </div>
            </div>
          </TabItem>
        ))}
      </Tabs>
      <span className={styles.localTime}>Horaires en temps local {GetTimezone(today)}</span>
    </>
  );
}