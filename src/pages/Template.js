import { Outlet, Link } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';


const Template = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};

export default Template;