import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Template from "./pages/Template";
import SignIn from "./pages/SignIn";
import SearchFlight from "./pages/SearchFlight";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Template />}>
           <Route index element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="support" element={<Support />} />
           <Route path="signin" element={<SignIn />} />
           <Route path="signup" element={<SignUp />} />
           <Route path="searchflight" element={<SearchFlight />} />
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
