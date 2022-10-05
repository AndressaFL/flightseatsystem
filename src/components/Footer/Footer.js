import './Footer.css'
function Footer() {
  //JSX como o react le e tranforma elementos no DOM
  return (
    <footer className="pt-md-3 bg-color">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src="/images/ac_logo_white.png" alt="logo" width="250" height="46" />
        </div>
      </div>
    </footer>
  )
}
export default Footer