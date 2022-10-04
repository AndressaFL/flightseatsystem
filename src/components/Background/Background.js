import './Background.css'

function Background() {

    //JSX como o react le e tranforma elementos no DOM
    return (
        <div className="background responsive">
            <div className= "gradient responsive" >
                It’s more than just a trip.
            </div>
            <div className="information">
                Advance Seat Selection<br />
                Looking for an aisle or window seat? You can always select your seat free of charge. <b>Sign In</b> to find out! <br />
            </div>
            <img src="/images/aircanada.jpeg" alt="main backgroud image"  className="responsive"/>
        </div>
    )
}
export default Background