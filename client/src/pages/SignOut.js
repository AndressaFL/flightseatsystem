import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { UserContext } from "../userContext";

function SignOut(props) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
/*userReducer*/
  UserService.signOut()
    .then((response) => {
      dispatch({ type: "REMOVE_USER", payload: null });
      navigate("/home");
    })
    .catch((e) => {
      console.log(e);
    });
}

export default SignOut;
