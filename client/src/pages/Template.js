import { Outlet } from "react-router-dom";
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
            <div aria-live="polite" aria-atomic="true">
                <div id="toast-container" style={{position: "absolute", top: 10 + "px", right: 10 + "px"}}></div>
            </div>
        </>
    )
};

export default Template;