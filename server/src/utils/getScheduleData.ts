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
  const getESTTime = (date: Date) => {
    // Calculate offset for EST (UTC-5) or EDT (UTC-4)
    // const utcHours = date.getUTCHours();
    const isDaylightSaving = date.getMonth() >= 2 && date.getMonth() <= 10; // Approximate daylight saving months (March-November)
    const estOffset = isDaylightSaving ? -4 : -5; // EDT (UTC-4) or EST (UTC-5)

    return new Date(date.getTime() + estOffset * 60 * 60 * 1000); // Convert UTC to EST/EDT
  };

  const upcomingTrips = data.trips.reduce(function (res: any, trip: any) {
    const currentUTC = new Date();
    const currentTime = getESTTime(currentUTC);
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
