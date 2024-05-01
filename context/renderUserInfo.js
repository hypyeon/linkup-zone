import { useState, useEffect } from 'react';
import { avoidGMT } from '../components/Clock';
import { DateTime } from 'luxon';

export default function renderUserInfo(zoneName) {
  const zoneNameShort = avoidGMT(zoneName);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const dt = DateTime.local().setZone(zoneName);
        const time = dt.toFormat('t');
        setCurrentTime(time);

        const day = dt.toFormat('ccc');
        const month = dt.toFormat('LLL');
        const date = dt.toFormat('dd');
        const fullDate = `${day}, ${month} ${date}`;
        setCurrentDate(fullDate);
      } catch (error) {
        console.error('Error setting time:', error);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [zoneName]);

  return {
    zone: zoneNameShort,
    time: currentTime,
    date: currentDate
  }
}