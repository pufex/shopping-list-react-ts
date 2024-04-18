import { Link } from "react-router-dom"
import { MdAdd } from "react-icons/md";
import "./StartAdding.css"

const StartAdding = (): React.ReactElement => {
    return<Link
        to="/add-product"
        className="start-adding"
    >
        <MdAdd 
            color="white"
            size={90}
        />
    </Link>
}

export default StartAdding
