import http from "../backend";

class FlightService {
  find(flight_number) {
    return http.get("/flight?flight_number=" + flight_number);
  }

  find_all() {
    return http.get("flights")
  }

  book_seat(flightNumber, seatNumber) {
    const data = {"flightNumber": flightNumber, "seatNumber": seatNumber};
    return http.post("/bookseat", data)
  }
}

export default new FlightService();