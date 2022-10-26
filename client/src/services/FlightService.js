import http from "../backend";

class FlightService {
  find(flight_number) {
    return http.get("/flight?flight_number=" + flight_number);
  }
}

export default new FlightService();