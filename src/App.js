import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Support from "./pages/Support";
import Template from "./pages/Template";

function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/flightseatsystem" element={<Template />}>
           <Route index element={<Home />} />
           <Route path="home" element={<Home />} />
           <Route path="support" element={<Support />} />
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
      <p><Link to="/flightseatsystem">Go to the home page</Link></p>
    </div>
  );
}

export default App;
