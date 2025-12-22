import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../shared/Loading";


const PrivateRoute = ({children}) => {
    const {user ,loading} = useAuth()
    const location = useLocation()
  console.log("in register" , location)


    if(loading){
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;