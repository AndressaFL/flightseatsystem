import http from "../backend";

class UserService {
  signIn(data) {
    return http.post("/signin", data);
  }
}

export default new UserService();