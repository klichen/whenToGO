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
  const { schedule, fetchTripSchedule, fetchMockData } = useGetTripSchedule();
  const [viewOption, setViewOption] = useState<'full' | 'single' | null>(null);

  useEffect(() => {
    if (departureStation && destinationStation && date) {
      fetchTripSchedule({
        fromStopCode: departureStation,
        toStopCode: destinationStation,
        date: date,
      });
      // fetchMockData();
      console.log('mock');
    }
  }, [departureStation, destinationStation, date]);

  // console.log(schedule);
  return (
    <ScrollArea className="flex h-[68vh] min-w-0 bg-white px-6">
      <div className="flex flex-col gap-4 pb-5 pt-4">
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
          <div className="inline-flex w-full flex-row gap-1">
            <Button
              variant="outline"
              className={cn(
                'bg-gogreen w-full justify-between text-justify text-white active:scale-95',
              )}
              onClick={() => setViewOption('full')}
              disabled={!(departureStation && destinationStation)}
            >
              Full Schedule
            </Button>
            <Button
              variant="outline"
              className={cn(
                'bg-gogreen w-full justify-between text-justify text-white active:scale-95',
              )}
              onClick={() => setViewOption('single')}
              disabled={!(departureStation && destinationStation)}
            >
              Next Departure
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
