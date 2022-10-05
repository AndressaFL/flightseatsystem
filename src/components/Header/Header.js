import { Link } from 'react-router-dom'
import './Header.css'
function Header() {
    //JSX como o react le e tranforma elementos no DOM
    return (
        <header>
            <div class="d-flex flex-column flex-md-row align-items-center pb-3 border-bottom">
                <Link to="home" className="d-flex align-items-center text-dark text-decoration-none">
                    <img width="230" height="30" className="ac-logo-image" alt="Air Canada" src="https://content.achome.digital.aircanada.com/ac/applications/homepage/content/1.0.1009/assets/img/logos/ac/ac_logo.svg" />
                </Link>

                <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <a class="me-3 py-2 text-dark text-decoration-none" href="#">About us</a>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="support">Support</Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="signin">Sign In</Link>
                </nav>
            </div>
        </header>
    )
}
export default Header