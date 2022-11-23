import http from "../backend";

//send a backend request to keep data and use ’em as we need.

class ChatService {
  getMessages(flightId) {
    return http.get("/chat/" + flightId);
  }

  sendMessage(flightId, data) {
    return http.post("/chat/" + flightId, data);
  }
}

export default new ChatService();