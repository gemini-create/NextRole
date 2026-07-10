import { createPortal } from "react-dom";

function Toast({message}){
    return createPortal(
        <div className="toast">{message}</div>,
        document.getElementById("portal-root")
    );
}
export default Toast;