import { Schedule, StationCode } from '@/types/stationTypes';
import { useState, useCallback } from 'react';

interface FetchTripScheduleProps {
  fromStopCode: StationCode;
  toStopCode: StationCode;
  date: Date;
}

const useGetTripSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(false);
  // const [savedEventIds, setSavedEventIds] = useState([]);

  function formatDate(date: Date) {
    //   const date = new Date(dateString);

    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const fetchTripSchedule = useCallback(
    async ({ fromStopCode, toStopCode, date }: FetchTripScheduleProps) => {
      setLoading(true);
      try {
        const baseUrl = 'http://localhost:8000/schedule';
        const params = new URLSearchParams();
        params.append('fromStop', fromStopCode);
        params.append('toStop', toStopCode);
        params.append('date', formatDate(date)); // yyyy-mm-dd format

        const url = new URL(`${baseUrl}?${params}`);
        // console.log(url)

        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        // console.log(json);
        // const data = json.events;
        // console.log(data);
        setLoading(false);
        // return data;
        setSchedule(data as Schedule);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        return null;
      }
    },
    [],
  );

  return { loading, schedule, fetchTripSchedule };
};

export default useGetTripSchedule;
