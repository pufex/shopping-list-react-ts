import "./StartCustom.css"
import { Link } from 'react-router-dom'
import { FaTools } from "react-icons/fa";

const StartCustom = () => {
  return <Link
    to="/add-custom"
    className='start-custom'
  >
    <FaTools 
        color='white'
        size={50}
    />
  </Link>
}

export default StartCustom
