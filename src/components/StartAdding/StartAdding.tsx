import { Link } from "react-router-dom"
import { MdAdd } from "react-icons/md";
import { useOptionsContext } from "../../App";
import { mergeClasses } from "../../utils/mergeClasses";
import "./StartAdding.css"

const StartAdding = (): React.ReactElement => {

    const [reverseBigPlus] = useOptionsContext().reverseBigPlus

    return<Link
        to="/add-product"
        className={mergeClasses(
            "start-adding",
            reverseBigPlus 
                ? "reverse-adding"
                : ""
        )}
    >
        <MdAdd 
            color="white"
            size={90}
        />
    </Link>
}

export default StartAdding
