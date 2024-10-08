interface Trip {
  departureTimeDisplay: string;
  arrivalTimeDisplay: string;
  durationMinutes: number;
  transitType: number;
}

interface Schedule {
  serviceName: string;
  date: string;
  departureDisplay: string;
  arrivalDisplay: string;
  trips: Trip[];
}

export const getScheduleData = (data: any): Schedule => {
  const getLocalTime = (date: Date) => {
    const offsetMinutes = date.getTimezoneOffset(); // Offset in minutes (for your local timezone)
    return new Date(date.getTime() - offsetMinutes * 60 * 1000); // Adjust to local time
  };

  const upcomingTrips = data.trips.reduce(function (res: any, trip: any) {
    const currentUTC = new Date();
    const currentTime = getLocalTime(currentUTC);
    const tripDepartureTime = new Date(trip.orderTime);
    if (tripDepartureTime > currentTime) {
      const tripInfo = {
        departureTimeDisplay: trip.departureTimeDisplay,
        arrivalTimeDisplay: trip.arrivalTimeDisplay,
        durationMinutes: trip.durationMinutes,
        transitType: trip.transitType,
      };
      res.push(tripInfo);
    }
    return res;
  }, []);
  return {
    serviceName: data.serviceName,
    date: data.date,
    departureDisplay: data.departureDisplay,
    arrivalDisplay: data.arrivalDisplay,
    trips: upcomingTrips,
  };
};
