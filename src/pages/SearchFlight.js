import './SearchFlight.css'
function SearchFlight() {
    //JSX como o react le e tranforma elementos no DOM
    return (
        <header>
            <div id="search-form">
                <div id="header">
                    <h1>SEARCH YOUR FLIGHT</h1>
                </div>
                <section>
                    <div className="flight" id="flightbox">
                        <form id="flight-form">
                            <div id="flight-info">
                                <div className="info-box">
                                    <label form="adults">FLIGHT</label>
                                    <select name="adults" id="adults">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div className="info-box" id="arrive-box">
                                    <label form="">ARRIVING</label>
                                    <input type="text" id="dep-to" readOnly/>
                                    <div id="arrive-res"></div>
                                </div>
                                <div id="flight-dates">
                                    <div className="info-box">
                                        <label form="">DEPARTING</label>
                                        <input type="text" id="leave-date" readOnly />
                                    </div>
                                    <div className="info-box">
                                        <label form="">TRAVEL TIME</label>
                                        <input type="text" id="leave-date" readOnly />
                                    </div>
                                    <div className="info-box">
                                        <label form="">SEAT</label>
                                        <input type="text" id="leave-date" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div id="flight-search">
                                <div className="info-box">
                                    <input type="submit" id="search-flight" value="SEARCH" />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <div id="confirm"></div>
        </header>
    )
}
export default SearchFlight