import {FaPlus,FaCircleUser} from "react-icons/fa6";
import { BsBarChart } from "react-icons/bs";

function Navbar({user,onAddClick,onUserClick,onLogout}) {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logoBox"><BsBarChart/></div>
        <h2>NextRole</h2>
      </div>

      <div className="navActions">
        <button className="addBtn" onClick={onAddClick}><FaPlus/> Add Application</button>
        {user? (
          <>
            <span className="username">
              <FaCircleUser className="userBtn"/> {user.username}
            </span>
            <button className="logoutBtn" onClick={onLogout}>Logout</button>
          </>
        ):(
          <button className="userBtn" onClick={onUserClick}><FaCircleUser/></button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;