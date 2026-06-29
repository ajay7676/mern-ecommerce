import useAuthProfile from "../hooks/queries/useAuthProfile";

const AuthProvider = ({ children }) => {

    useAuthProfile();
    
    return children;
}

export default AuthProvider