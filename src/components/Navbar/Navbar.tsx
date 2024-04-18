import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className="nav">
    <div className="nav__container">
      <div
        className="nav--left"
      >
        <Link
          to="/"
          className='nav--left'
        >
          <div className="nav__logo"></div>
        </Link>
      </div>
      {/* <div className="nav--right">
        <Link
          to="/add-product"
          className="nav__link"
        >
          Add to list
        </Link>
      </div> */}
    </div>
  </nav>
}

export default Navbar
