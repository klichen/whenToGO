"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleData = void 0;
const getScheduleData = (data) => {
    const upcomingTrips = data.trips.reduce(function (res, trip) {
        const currentTime = new Date();
        const tripDepartureTime = new Date(trip.orderTime);
        if (tripDepartureTime > currentTime) {
            const tripInfo = {
                departureTimeDisplay: trip.departureTimeDisplay,
                arrivalTimeDisplay: trip.arrivalTimeDisplay,
                durationMinutes: trip.durationMinutes,
                transitType: trip.transitType
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
exports.getScheduleData = getScheduleData;
