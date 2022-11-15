import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Template from "./pages/Template";
import SignIn from "./pages/SignIn";
import SearchFlight from "./pages/SearchFlight";
import SignUp from "./pages/SignUp";
import BookingSeat from "./pages/BookingSeat";
import Chat from "./pages/Chat";
import io from "socket.io-client";
import SignOut from "./pages/SignOut";

function App() {
  const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:5000", { autoConnect: false });

  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Template />}>
           <Route index element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="signin" element={<SignIn />} />
           <Route path="signup" element={<SignUp />} />
           <Route path="signout" element={<SignOut />} />
           <Route path="searchflight" element={<SearchFlight />} />
           <Route path="bookseat/:flightId" element={<BookingSeat />} />
           <Route path="chat/:flightId" element={<Chat socket={socket} />} />
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
