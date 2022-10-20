import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

function SignOut(props) {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "REMOVE_USER", payload: null });
    localStorage.removeItem("user");
    navigate("/home")
  });
}

export default SignOut;
