import {FaPlus} from "react-icons/fa6";
import { BsBarChart } from "react-icons/bs";

function Navbar({onAddClick}) {
  return (
    <nav className="navbar">

      <div className="logo">
        <div className="logoBox"><BsBarChart/></div>
        <h2>NextRole</h2>
      </div>

      <button className="addBtn" onClick={onAddClick}><FaPlus/> Add Application</button>
    </nav>
  );
}

export default Navbar;