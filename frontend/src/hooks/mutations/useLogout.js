
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../../api/authApi";
import { logout } from "../../features/auth/authSlice";
import { getErrorMessage } from "../../utils/getErrorMessage";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            dispatch(logout());
            queryClient.removeQueries({ queryKey: ["auth-profile"] });
            toast.success("Logged out successfully");
            navigate("/");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
    })
}

export default useLogout;