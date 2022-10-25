import http from "../backend";

class UserService {
  signIn(data) {
    return http.post("/signin", data);
  }

  signUp(data) {
    return http.post("/signup", data);
  }

  signOut() {
    return http.get("/signout");
  }

  currentUser() {
    return http.get("/current_user");
  }
}

export default new UserService();