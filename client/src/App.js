import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Template from "./pages/Template";
import SignIn from "./pages/SignIn";
import SearchFlight from "./pages/SearchFlight";
import SignUp from "./pages/SignUp";
import BookingSeat from "./pages/BookingSeat";
import ChangeSeat from "./pages/ChangeSeat";
import Chat from "./pages/Chat";
import SignOut from "./pages/SignOut";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

function App() {
  //const [state, dispatch] = useContext(UserContext);
  
  function useAuth(next, replace) {
    console.log("next => " + next + " replace => " + replace);

    /*
    useEffect(() => {
      let currentUser = localStorage.getItem("user");
      if (currentUser) {
        dispatch({ type: "SET_USER", payload: JSON.parse(currentUser) });
      }

      if (next.location.pathname === '/signin' && currentUser) {
        replace(null, '/');
      } else if (next.location.pathname !== '/signin' && !currentUser) {
        replace(null, '/signin');
      }
    }, [dispatch]);
    */
  };

  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Template />} onEnter={useAuth}>
           <Route index element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="support" element={<Support />} />
           <Route path="signin" element={<SignIn />} />
           <Route path="signup" element={<SignUp />} />
           <Route path="signout" element={<SignOut />} />
           <Route path="searchflight" element={<SearchFlight />} />
           <Route path="bookseat" element={<BookingSeat />} />
           <Route path="changeseat" element={<ChangeSeat />} />
           <Route path="chat" element={<Chat />} />
           <Route path="*" element={<NoMatch />} />
         </Route>
       </Routes>
     </BrowserRouter>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p><Link to="/home">Go to the home page</Link></p>
    </div>
  );
}

export default App;
