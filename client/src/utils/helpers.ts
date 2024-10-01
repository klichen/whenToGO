import { ServiceLine, StationCode } from '@/types/stationTypes';

export const filterStations = (
  stationsInfo: ServiceLine[],
  selectedStation: StationCode,
): ServiceLine[] => {
  return stationsInfo.reduce((res: ServiceLine[], service: ServiceLine) => {
    if (service.stations.some((station) => station.code === selectedStation)) {
      const filteredStations = [];
      filteredStations.push(
        ...service.stations.filter(
          (station) => station.code !== selectedStation,
        ),
      );
      const filteredServiceLine = {
        line: service.line,
        stations: filteredStations,
      };
      res.push(filteredServiceLine);
    }
    return res;
  }, []);
};
