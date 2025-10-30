import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { CommunityListEvent, CommunityListCalendar, getMembersFromPluginData } from '../social-community';
import { usePluginData } from '@docusaurus/useGlobalData';
import seedrandom from 'seedrandom';
import Popup from 'reactjs-popup';
import type { SocialCommunityPluginData, PlanningEvent, Member } from '@site/src/plugins/social-community/data/types';
import { Group } from '@site/src/plugins/social-community/data/types';

const WEEK_DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

interface DayInfo {
  weekDay: string;
  date: number;
  dateString: string;
}

function shuffle(array: string[], rng: () => number): string[] {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function EventCalendar(event: PlanningEvent): ReactElement {
  var rng = seedrandom(event.title);
  let attendees = shuffle(event.attendees, rng);
  return (
    <CommunityListCalendar memberIds={event.presenters.concat(attendees).slice(0, 6)} />
  );
}

function EnventPresenters(event: PlanningEvent): ReactElement | undefined {
  let length = event.presenters.length;
  if (length > 0) {
    return (
      <>
        <h5 className={styles.popupSubtitle}>{length > 1 ? 'Présentateur·ices' : 'Présentateur·ice'}</h5>
        <CommunityListEvent memberIds={event.presenters} />
      </>
    );
  }
}

function EventAttendees(event: PlanningEvent): ReactElement | undefined {
  let length = event.attendees.length;
  if (length > 0) {
    var rng = seedrandom(event.title);
    let attendees = shuffle(event.attendees, rng);
    return (
      <>
        <h5 className={styles.popupSubtitle}>{length > 1 ? 'Participant·es' : 'Participant·e'}</h5>
        <CommunityListEvent memberIds={attendees} />
      </>
    );
  }
}

function EventLink(event: PlanningEvent): string {
  const members = getMembersFromPluginData();
  const rng = seedrandom(event.title);
  const all = event.presenters.concat(shuffle(event.attendees, rng));

  const eventMembers = members.filter(member => all.includes(member.id));

  const twitchLogins = eventMembers
    .map(m => m.socials?.twitch?.user_data?.login)
    .filter((login): login is string => !!login);

  if (twitchLogins.length > 1) {
    return "https://multitwitch.live/" + twitchLogins.join('/');
  } else if (twitchLogins.length === 1) {
    return "https://www.twitch.tv/" + twitchLogins[0];
  } else {
    return "";
  }
}

function GetTimezone(date: Date): ReactElement {
  let timezoneOffset = date.getTimezoneOffset();
  let timezoneOffsetAbs = Math.abs(timezoneOffset);
  let localeStringProps: Intl.NumberFormatOptions = { minimumIntegerDigits: 2, useGrouping: false };
  return (
    <>UTC{((timezoneOffset <= 0) ? '+' : '-')}{(~~(timezoneOffsetAbs / 60)).toLocaleString('fr-FR', localeStringProps)}:{(timezoneOffsetAbs % 60).toLocaleString('fr-FR', localeStringProps)}</>
  );
}

function FormatHour(date: Date): ReactElement {
  let localeStringProps: Intl.NumberFormatOptions = { minimumIntegerDigits: 2, useGrouping: false };
  return (
    <>{date.getHours().toLocaleString('fr-FR', localeStringProps)}:{date.getMinutes().toLocaleString('fr-FR', localeStringProps)}</>
  );
}

function FormatDate(date: Date): ReactElement {
  let day = WEEK_DAYS[date.getDay()];
  return (
    <>{day} {FormatHour(date)}</>
  );
}

interface PlanningProps {
  group: Group;
}

export function Planning({ group }: PlanningProps): ReactElement {
  const { plannings } = usePluginData('social-community-plugin') as SocialCommunityPluginData;
  const planningEvents = plannings[group] ?? [];
  
  let uniqueDays: DayInfo[] = planningEvents.map(function (event) {
    let date = new Date(event.start);
    return {
      weekDay: WEEK_DAYS[date.getDay()],
      date: date.getDate(),
      dateString: date.toDateString()
    };
  }).filter(function (item, pos, self) {
    return !pos || item.dateString !== self[pos - 1].dateString;
  });
  const today = new Date();
  const todayDateString = today.toDateString();

  if (uniqueDays.length == 0) return;

  return (
    <>
      <Tabs>
        {uniqueDays.map((day, index) => (
          <TabItem key={index} value={day.dateString} label={day.date.toString()} default={day.dateString === todayDateString} attributes={{ className: styles['calendarTab' + day.weekDay] }}>
            <div className="container">
              <div className="row">
                {planningEvents.map((event, index) => {
                  let start = new Date(event.start); let end = new Date(event.end);
                  let live = today >= start && today <= end;
                  if (day.dateString === start.toDateString()) {
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
                        {((close: () => void) => (
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
                        )) as any}
                      </Popup>
                    );
                  }
                  return null;
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

export { Group } from '@site/src/plugins/social-community/data/types';
