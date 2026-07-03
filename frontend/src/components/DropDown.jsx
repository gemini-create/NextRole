import { useState} from "react";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({options,selected,onSelect,placeholder = "Select"})=>{
    const [open,setOpen] = useState(false);

    return(
        <div className="dropdown-container">
            <button  type="button" className="toggleBtn" onClick={()=>setOpen(open=>!open)}>
                {selected || placeholder}
                <FaChevronDown className={`dropdown-arrow ${open ? "open" : ""}`}/>
            </button>

            {open && ( 
                <ul className="dropdown-list"> 
                {
                options.map((opt) => ( 
                <li key={opt} 
                    className={`dropdown-option ${opt === selected ? "active" : ""}`} 
                    onClick={() => { 
                        onSelect(opt); 
                        setOpen(false); 
                    }}> {opt} 
                    </li> 
                ))
                } 
                </ul> 
                )} 
        </div> 
        ); 
    };
export default Dropdown