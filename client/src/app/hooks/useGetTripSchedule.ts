import { Schedule, StationCode } from '@/types/stationTypes';
import { useState, useCallback } from 'react';

interface FetchTripScheduleProps {
  fromStopCode: StationCode;
  toStopCode: StationCode;
  date: Date;
}

// const mockSchedule = {
//   serviceName: 'Stouffville',
//   date: '2024-10-02T00:00:00-04:00',
//   departureDisplay: 'Centennial GO',
//   arrivalDisplay: 'Union Station GO',
//   trips: [
//     {
//       departureTimeDisplay: '16:56',
//       arrivalTimeDisplay: '18:05',
//       durationMinutes: 69,
//       transitType: 0,
//     },
//     {
//       departureTimeDisplay: '17:31',
//       arrivalTimeDisplay: '18:35',
//       durationMinutes: 64,
//       transitType: 0,
//     },
//     {
//       departureTimeDisplay: '18:31',
//       arrivalTimeDisplay: '19:25',
//       durationMinutes: 54,
//       transitType: 0,
//     },
//     {
//       departureTimeDisplay: '19:43',
//       arrivalTimeDisplay: '20:29',
//       durationMinutes: 46,
//       transitType: 1,
//     },
//     {
//       departureTimeDisplay: '20:43',
//       arrivalTimeDisplay: '21:29',
//       durationMinutes: 46,
//       transitType: 1,
//     },
//     {
//       departureTimeDisplay: '21:43',
//       arrivalTimeDisplay: '22:29',
//       durationMinutes: 46,
//       transitType: 1,
//     },
//     {
//       departureTimeDisplay: '22:43',
//       arrivalTimeDisplay: '23:29',
//       durationMinutes: 46,
//       transitType: 1,
//     },
//     {
//       departureTimeDisplay: '23:33',
//       arrivalTimeDisplay: '00:10',
//       durationMinutes: 37,
//       transitType: 0,
//     },
//     {
//       departureTimeDisplay: '01:38',
//       arrivalTimeDisplay: '02:15',
//       durationMinutes: 37,
//       transitType: 0,
//     },
//   ],
// };

const useGetTripSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => {
    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const fetchTripSchedule = useCallback(
    async ({ fromStopCode, toStopCode, date }: FetchTripScheduleProps) => {
      setLoading(true);
      try {
        const baseUrl = 'https://whentogo-syi6.onrender.com/schedule';
        const params = new URLSearchParams();
        params.append('fromStop', fromStopCode);
        params.append('toStop', toStopCode);
        params.append('date', formatDate(date)); // yyyy-mm-dd format

        const url = new URL(`${baseUrl}?${params}`);

        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();

        setLoading(false);
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

  // const fetchMockData = useCallback(() => {
  //   setSchedule(mockSchedule as Schedule);
  // }, []);

  return { loading, schedule, fetchTripSchedule };
};

export default useGetTripSchedule;
