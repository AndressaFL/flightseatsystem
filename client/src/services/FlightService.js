import http from "../backend";

class FlightService {
  find(flight_number) {
    return http.get("/flight?flight_number=" + flight_number);
  }

  find_all() {
    return http.get("flights")
  }
}

export default new FlightService();