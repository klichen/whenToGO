import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { FaTrainSubway } from 'react-icons/fa6';
const TripCard = ({ serviceName, transitType, departureTime, arrivalTime }) => {
  return (
    <Card className="mb-3 border-gray-400">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl underline">Stouffville Line</CardTitle>
        <CardDescription>Train</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-start gap-3">
          <FaTrainSubway size={36} className="pt-2" />
          <div className="flex flex-col">
            <p className="text-lg font-bold">7:42 AM - 8:08 AM</p>
            <p className="text-base font-thin">Trip time: 46 min</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
