import { useSelector } from "react-redux";
import {  useNavigate,Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    console.log(user)
    return (
        user.user?(<Outlet/>):(navigate('/login'))
    );
};

export default ProtectedRoute;