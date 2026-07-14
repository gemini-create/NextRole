import { createPortal } from "react-dom";
import { FaCircleCheck,FaCircleXmark,FaTriangleExclamation,FaCircleInfo} from "react-icons/fa6";

function Toast({ message, type = "success" }) {
  const icons = {
    success: <FaCircleCheck />,
    error: <FaCircleXmark />,
    warning: <FaTriangleExclamation />,
    info: <FaCircleInfo />,
  };

  return createPortal(
    <div className={`toast ${type}`}>
      <span className="toastIcon">{icons[type]}</span>
      <span>{message}</span>
    </div>,
    document.getElementById("portal-root")
  );
}

export default Toast;