import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from '../../api/authApi'
import {setUser} from '../../features/auth/authSlice'
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(setUser(data.user));
            toast.success("Login successful");
            navigate("/");
        },
        onError: (error) => {
             toast.error(getErrorMessage(error));
        },
    });


};

export default useLogin;