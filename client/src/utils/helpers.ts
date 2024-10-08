import { ServiceLine, StationCode } from '@/types/stationTypes';
import * as stationInfo from '@/utils/stationCodeLookup.json';

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

export const convertTo12h = (timeString24h: string) => {
  return new Date('1970-01-01T' + timeString24h + 'Z').toLocaleTimeString(
    'en-US',
    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' },
  );
};

export const getStationNameByCode = (code: StationCode): string => {
  return stationInfo[code];
};
