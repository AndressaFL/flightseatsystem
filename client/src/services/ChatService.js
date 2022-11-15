import http from "../backend";

class ChatService {
  getMessages(flightId) {
    return http.get("/chat/" + flightId);
  }

  sendMessage(flightId, data) {
    return http.post("/chat/" + flightId, data);
  }
}

export default new ChatService();