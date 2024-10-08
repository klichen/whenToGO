import DatePicker from '@/app/components/DatePicker';
import { StationSelector } from '@/app/components/StationSelector';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { StationCode } from '@/types/stationTypes';
import { useEffect, useRef, useState } from 'react';
import useGetTripSchedule from '@/app/hooks/useGetTripSchedule';
import ScheduleViewer from '@/app/components/ScheduleViewer';
import { MdSwapVerticalCircle, MdBookmarkAdd } from 'react-icons/md';

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
  const [spin, setSpin] = useState(false);
  const [tripSaved, setTripSaved] = useState(false);
  const tripsRef = useRef<HTMLDivElement>(null);

  const swapStations = () => {
    const departureTemp = departureStation;
    const destinationTemp = destinationStation;
    setDepartureStation(destinationTemp);
    setDestinationStation(departureTemp);
  };

  const toggleSaveTrip = () => {
    if (tripSaved) {
      localStorage.removeItem(`${departureStation}-${destinationStation}`);
      setTripSaved(false);
    } else {
      localStorage.setItem(`${departureStation}-${destinationStation}`, 's');
      setTripSaved(true);
    }
  };

  const scrollToTrips = () =>
    tripsRef.current?.scrollIntoView({ behavior: 'smooth' });

  const viewFullSchedule = () => {
    setViewOption('full');
    setTimeout(function () {
      scrollToTrips();
    }, 250);
  };

  const viewNextDeparture = () => {
    setViewOption('single');
    setTimeout(function () {
      scrollToTrips();
    }, 250);
  };

  useEffect(() => {
    if (departureStation && destinationStation && date) {
      fetchTripSchedule({
        fromStopCode: departureStation,
        toStopCode: destinationStation,
        date: date,
      });
      console.log('mock');
    }
  }, [departureStation, destinationStation, date]);

  useEffect(() => {
    if (departureStation && destinationStation) {
      if (
        localStorage.getItem(`${departureStation}-${destinationStation}`) !==
        null
      ) {
        setTripSaved(true);
      } else {
        setTripSaved(false);
      }
    }
  }, [departureStation, destinationStation]);

  // console.log(schedule);
  return (
    <ScrollArea className="flex h-[68vh] min-w-0 rounded-b-lg bg-white px-6">
      <div className="flex flex-col gap-4 pb-5 pt-4">
        <h2 className="text-base font-bold text-black">
          Find Upcoming Trains and Buses
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:border-b-2 sm:pb-2">
          <div className="flex flex-row items-center gap-2 sm:flex-col sm:justify-between sm:gap-0">
            <div className="sm: flex flex-grow flex-col gap-3 sm:w-[35vw] sm:flex-row lg:w-[45vw]">
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
            </div>
            {departureStation && destinationStation ? (
              <Button
                variant="ghost"
                size="icon"
                className={`${spin && 'animate-spin'} background-transparent`}
                onClick={() => {
                  setSpin(true);
                  swapStations();
                }}
                onAnimationEnd={() => setSpin(false)}
              >
                <div className="sm: sm:rotate-90">
                  <MdSwapVerticalCircle
                    size={42}
                    style={{ color: '#42631c' }}
                  />
                </div>
              </Button>
            ) : null}
          </div>
          <DatePicker date={date} setDate={setDate} />
          <div className="inline-flex w-full flex-row gap-1 border-b-2 pb-2 sm:w-full sm:flex-col sm:border-b-0 sm:pb-0">
            <Button
              variant="outline"
              className={cn(
                'bg-gogreen w-full justify-between text-white active:scale-95',
              )}
              onClick={viewFullSchedule}
              disabled={!(departureStation && destinationStation)}
            >
              Full Schedule
            </Button>
            <Button
              variant="outline"
              className={cn(
                'bg-gogreen w-full justify-between text-white active:scale-95',
              )}
              onClick={viewNextDeparture}
              disabled={!(departureStation && destinationStation)}
            >
              Next Departure
            </Button>
          </div>
        </div>
        <div ref={tripsRef} className="flex flex-col gap-2 pt-4">
          {departureStation && destinationStation && viewOption !== null ? (
            <Button
              variant="outline"
              className={cn(
                'text-gogreen w-fit justify-between self-end border-gray-400 bg-white p-2 active:scale-95',
                tripSaved && 'bg-gogreen text-white',
              )}
              onClick={toggleSaveTrip}
              disabled={!(departureStation && destinationStation)}
            >
              <MdBookmarkAdd size={24} style={{ paddingRight: '4px' }} />
              {tripSaved ? 'Saved' : 'Save this Trip'}
            </Button>
          ) : null}
          <ScheduleViewer viewOption={viewOption} schedule={schedule} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default TripScheduler;
