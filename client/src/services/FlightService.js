import http from "../backend";

class FlightService {
  find(flight_number) {
    return http.get("/flight?flight_id=" + flight_number);
  }

  find_all() {
    return http.get("flights")
  }

  book_seat(flightId, seatNumber) {
    const data = {"flightId": flightId, "seatNumber": seatNumber};
    return http.post("/bookseat", data)
  }
}

export default new FlightService();