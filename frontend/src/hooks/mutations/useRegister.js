import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {registerUser} from '../../api/authApi'
import {setUser} from '../../features/auth/authSlice'
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const useRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            dispatch(setUser(data.user));
            toast.success("Account created successfully");
            navigate("/");
        },
        onError: (error) => {
             toast.error(getErrorMessage(error));
        },
    });


};

export default useRegister;