import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user ,loading} = useAuth()
    const location = useLocation()
  console.log("in register" , location)


    if(loading){
        return <div>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;