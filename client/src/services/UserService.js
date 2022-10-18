import http from "../backend";

class UserService {
  signIn(data) {
    return http.post("/signin", data);
  }


  signUp(data) {
    return http.post("/signup", data);
  }

}

export default new UserService();