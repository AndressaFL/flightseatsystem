import http from "../backend";

class ChatService {
  find(flight_number) {
    return http.get("/chat?flight_number=" + flight_number);
  }
}

export default new ChatService();