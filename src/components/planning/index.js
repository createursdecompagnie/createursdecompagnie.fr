import React from 'react';
import clsx from 'clsx';

import styles from './style.module.css';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { CommunityListCalendar } from '../social-community';

import { usePluginData } from '@docusaurus/useGlobalData';

import seedrandom from 'seedrandom';

function shuffle(array, rng) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function EventCalendar(event) {
  var rng = seedrandom(event.title);
  shuffle(event.attendees, rng);
  return (
    <CommunityListCalendar members={[event.maintrack ? '' : ''].concat(event.presenters.concat(event.attendees)).slice(0, 6)} />
  );
}

function FormatDate(date) {
  let localeStringProps = { minimumIntegerDigits: 2, useGrouping: false };
  return (
    <>{date.getHours().toLocaleString('fr-FR', localeStringProps)}:{date.getMinutes().toLocaleString('fr-FR', localeStringProps)}</>
  );
}

export function Planning() {
  const { planning } = usePluginData('social-community-plugin');
  let weekDays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  let uniqueDays = planning.map(function (event) {
    let date = new Date(event.start);
    return {
      dateFormated: `${weekDays[date.getDay()]} ${date.getDate()}`,
      dateString: date.toDateString()
    };
  }).filter(function (item, pos, self) {
    return !pos || item.dateFormated != self[pos - 1].dateFormated;
  });
  const today = new Date();
  const todayDateString = today.toDateString();
  return (
    <Tabs>
      {uniqueDays.map((day, index) => (
        <TabItem key={index} value={day.dateString} label={day.dateFormated} default={day.dateString == todayDateString}>
          <div className="container">
            <div className="row">
              {planning.map((event, index) => {
                let start = new Date(event.start); let end = new Date(event.end);
                let live = today >= start && today <= end;
                if (day.dateString == start.toDateString()) {
                  return (
                    <div key={index} className={clsx('col col--12', styles.calendarEntry)}>
                      <div>
                        <span style={{ minWidth: '50px', display: "inline-block", textAlign: "center" }}>{live ? 'LIVE' : FormatDate(start)}</span>-&nbsp;<span style={{ fontStyle: 'italic' }} >{event.title}</span>
                      </div>
                      <div style={{ minWidth: '90px' }}>{EventCalendar(event)}</div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </TabItem>
      ))}
    </Tabs>
  );
}