import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { cn } from '@/lib/utils';
import { convertTo12h } from '@/utils/helpers';

interface TripCardProps {
  serviceName: string;
  transitType: number;
  departureTime: string;
  arrivalTime: string;
  tripDuration: number;
  compact?: boolean;
}

import { FaTrainSubway, FaBusSimple } from 'react-icons/fa6';
const TripCard = ({
  serviceName,
  transitType,
  departureTime,
  arrivalTime,
  tripDuration,
  compact,
}: TripCardProps) => {
  return (
    <Card className={cn('mb-3 border-gray-400 pl-3', compact && 'p-0')}>
      <CardHeader className="px-2 pb-0 pt-3">
        {compact ? null : (
          <div>
            <CardTitle className="text-xl underline">
              {serviceName} Line
            </CardTitle>
            <CardDescription>
              {transitType === 1 ? 'Train' : 'Bus'}
            </CardDescription>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-start gap-3">
          {transitType === 1 ? (
            <FaTrainSubway size={36} className="pt-2" />
          ) : (
            <FaBusSimple size={36} className="pt-2" />
          )}
          <div className="flex flex-col">
            <p className="text-lg font-bold">
              {convertTo12h(departureTime)} - {convertTo12h(arrivalTime)}
            </p>
            <p className="text-base font-thin">Trip time: {tripDuration} min</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
