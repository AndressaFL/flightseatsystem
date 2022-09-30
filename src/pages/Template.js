import { Outlet, Link } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';


const Template = () => {
    return (
        <div className="App container py-3">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Template;