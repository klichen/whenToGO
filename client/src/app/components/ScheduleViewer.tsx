import TripCard from '@/app/components/TripCard';
import { Schedule } from '@/types/stationTypes';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel';

interface ScheduleViewerProps {
  viewOption: 'full' | 'single' | null;
  schedule: Schedule | null;
}

const ScheduleViewer = ({ viewOption, schedule }: ScheduleViewerProps) => {
  if (viewOption === null) {
    return null;
  }
  if (schedule === null) {
    return <div>There are currently no scheduled trips D:</div>;
  }
  console.log(schedule);

  const { serviceName, trips } = schedule as Schedule;

  if (viewOption === 'full') {
    return (
      <div>
        {trips.map((trip) => (
          <TripCard
            serviceName={serviceName}
            transitType={trip.transitType}
            arrivalTime={trip.arrivalTimeDisplay}
            departureTime={trip.departureTimeDisplay}
            tripDuration={trip.durationMinutes}
          />
        ))}
      </div>
    );
  }
  if (viewOption === 'single') {
    return (
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {trips.map((trip, index) => (
            <CarouselItem key={index}>
              <TripCard
                serviceName={serviceName}
                transitType={trip.transitType}
                arrivalTime={trip.arrivalTimeDisplay}
                departureTime={trip.departureTimeDisplay}
                tripDuration={trip.durationMinutes}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute inset-y-3/4 left-2" />
        <CarouselNext className="absolute inset-y-3/4 right-2" />
      </Carousel>
    );
  }
};

export default ScheduleViewer;
