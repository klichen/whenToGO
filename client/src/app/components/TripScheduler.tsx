import DatePicker from '@/app/components/DatePicker';
import { StationSelector } from '@/app/components/StationSelector';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { StationCode } from '@/types/stationTypes';
import { useEffect, useState } from 'react';
import useGetTripSchedule from '@/app/hooks/useGetTripSchedule';
import ScheduleViewer from '@/app/components/ScheduleViewer';

const TripScheduler = () => {
  const [departureStation, setDepartureStation] = useState<StationCode | ''>(
    '',
  );
  const [destinationStation, setDestinationStation] = useState<
    StationCode | ''
  >('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { schedule, fetchTripSchedule } = useGetTripSchedule();
  const [viewOption, setViewOption] = useState<'full' | 'single' | null>(null);

  useEffect(() => {
    if (departureStation && destinationStation && date) {
      fetchTripSchedule({
        fromStopCode: departureStation,
        toStopCode: destinationStation,
        date: date,
      });
    }
  }, [departureStation, destinationStation, date]);

  // console.log(schedule);
  return (
    <ScrollArea className="overflow-hidden">
      <div className="flex flex-col gap-4 px-8 pb-36 pt-4">
        <h2 className="text-base font-bold text-black">
          Find Upcoming Trains and Buses
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <StationSelector
            value={departureStation}
            setValue={setDepartureStation}
            placeHolder="From"
            isDestination={false}
          />
          <StationSelector
            value={destinationStation}
            setValue={setDestinationStation}
            placeHolder="To"
            departureStation={departureStation}
            isDestination={true}
          />
          <DatePicker date={date} setDate={setDate} />
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              className={cn('bg-gogreen w-full justify-between text-white')}
              onClick={() => setViewOption('full')}
            >
              See Full Schedule
            </Button>
            <Button
              variant="outline"
              className={cn('bg-gogreen w-full justify-between text-white')}
              onClick={() => setViewOption('single')}
            >
              See Next Departure
            </Button>
          </div>
          <div className="pt-4">
            <ScheduleViewer viewOption={viewOption} schedule={schedule} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TripScheduler;
