import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../atoms/auth";

const PrivateRoute = ({ Component }) => {
    const { isAuth } = useRecoilValue(auth);
    return isAuth ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
