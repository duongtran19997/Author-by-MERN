import { Outlet,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const FreeRoute = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    console.log(user)
    return (
        !user.user?(<Outlet/>):(navigate('/home'))
    );
};

export default FreeRoute;