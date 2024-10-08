import DatePicker from '@/app/components/DatePicker';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { StationCode } from '@/types/stationTypes';
import { useCallback, useEffect, useState } from 'react';
import useGetTripSchedule from '@/app/hooks/useGetTripSchedule';
import ScheduleViewer from '@/app/components/ScheduleViewer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { getStationNameByCode } from '@/utils/helpers';

const SavedTripsViewer = () => {
  const [departureStation, setDepartureStation] = useState<StationCode | ''>(
    '',
  );
  const [destinationStation, setDestinationStation] = useState<
    StationCode | ''
  >('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { schedule, fetchTripSchedule, loading } = useGetTripSchedule();
  const [viewOption, setViewOption] = useState<'full' | 'single' | null>(null);
  const savedTrips = Object.keys(localStorage);

  useEffect(() => {
    if (departureStation && destinationStation && date) {
      fetchTripSchedule({
        fromStopCode: departureStation,
        toStopCode: destinationStation,
        date: date,
      });
    }
  }, [departureStation, destinationStation, date]);

  const getSavedCodes = (
    tripString: string,
  ): { departureCode: StationCode; destinationCode: StationCode } => {
    const codes = tripString.split('-');
    return {
      departureCode: codes[0] as StationCode,
      destinationCode: codes[1] as StationCode,
    };
  };

  const resetStations = () => {
    setViewOption(null);
    setDepartureStation('');
    setDestinationStation('');
  };

  const viewSchedule = useCallback(
    (
      departureCode: StationCode,
      destinationCode: StationCode,
      view: 'full' | 'single',
    ) =>
      () => {
        setDepartureStation(departureCode);
        setDestinationStation(destinationCode);
        setViewOption(view);
      },
    [],
  );

  if (savedTrips.length === 0) {
    return (
      <div className="h-[68vh] min-w-0 bg-white px-6 pt-2 text-lg sm:rounded-b-lg">
        Save your frequent trips and access them here!
      </div>
    );
  }

  // console.log(schedule);
  return (
    <ScrollArea className="flex h-[68vh] min-w-0 bg-white px-6 sm:rounded-b-lg">
      <div className="flex flex-col gap-2 pb-5 pt-4">
        <h2 className="text-base font-bold text-black">Your Frequent Trips</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          //   defaultValue="trip-0"
          onValueChange={resetStations}
        >
          {savedTrips.map((trip, index) => {
            const { departureCode, destinationCode } = getSavedCodes(trip);
            const departureName = getStationNameByCode(departureCode);
            const destinationName = getStationNameByCode(destinationCode);
            return (
              <AccordionItem value={`trip-${index}`} key={`trip-${index}`}>
                <AccordionTrigger>
                  {`${departureName} \u2192 ${destinationName}`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <DatePicker date={date} setDate={setDate} />
                    <div className="flex w-full flex-row gap-1 pb-1 sm:w-1/3">
                      <Button
                        variant="outline"
                        className={cn(
                          'bg-gogreen w-full justify-between text-white active:scale-95 sm:whitespace-nowrap',
                        )}
                        onClick={viewSchedule(
                          departureCode,
                          destinationCode,
                          'full',
                        )}
                      >
                        Full Schedule
                      </Button>
                      <Button
                        variant="outline"
                        className={cn(
                          'bg-gogreen w-full justify-between text-white active:scale-95 sm:whitespace-nowrap',
                        )}
                        onClick={viewSchedule(
                          departureCode,
                          destinationCode,
                          'single',
                        )}
                      >
                        Next Departure
                      </Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2">
                    <ScheduleViewer
                      viewOption={viewOption}
                      schedule={schedule}
                      loading={loading}
                      compact
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default SavedTripsViewer;
