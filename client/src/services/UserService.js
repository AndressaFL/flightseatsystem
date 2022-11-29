import http from "../backend";

//send a backend request to keep data and use ’em as we need.

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