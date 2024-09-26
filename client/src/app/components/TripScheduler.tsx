import { StationSelector } from '@/app/components/StationSelector';
import { StationCode } from '@/types/stationTypes';
import { useState } from 'react';

function TripScheduler() {
  const [departureStation, setDepartureStation] = useState<StationCode | ''>(
    '',
  );
  const [destinationStation, setDestinationStation] = useState<
    StationCode | ''
  >('');

  return (
    <div className="flex flex-col gap-4 px-8 py-4">
      <h2 className="text-base font-bold text-black">
        Find Upcoming Trains and Buses
      </h2>
      <div className="flex flex-row gap-3">
        <StationSelector
          value={departureStation}
          setValue={setDepartureStation}
          placeHolder="From"
        />
        <StationSelector
          value={destinationStation}
          setValue={setDestinationStation}
          placeHolder="To"
        />
      </div>
    </div>
  );
}

export default TripScheduler;
