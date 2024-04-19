import "./Navbar.css"
import { Link } from 'react-router-dom'
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeContext } from "../../App";

const Navbar = () => {

  const {theme, switchTheme} = useThemeContext();

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
        <button
          className="btn btn--switch-theme"
          onClick={switchTheme}
        >
          {
            theme == "light"
              ? <FaSun 
                color="white"
                size={40}
              />
              : <FaMoon 
                color="white"
                size={40}
              />
          }
        </button>
      </div>
      <div className="nav--right">
      
        <Link
          to="/options"
          className="nav__link--options"
        ></Link>
      </div>
    </div>
  </nav>
}

export default Navbar
