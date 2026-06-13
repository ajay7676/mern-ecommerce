import express from 'express';
import { createRegisterUser, requestForgotPassword, getProfile, loginUser, logoutUser, resetPassword, updateProfile, updatePassword, getAllUserByAdmin, getSingleUserByAdmin, updateRoleByAdmin, deleteUserByAdmin } from '../controllers/userController.js';
import {userAuth} from '../middleware/userAuthMIddleware.js'
import adminOnly from '../middleware/adminMddleware.js';
const router = express.Router();

 router.post("/register" , createRegisterUser)
 router.post("/login" , loginUser)
 router.post("/logout" , logoutUser)
 router.get("/profile" ,userAuth, getProfile)
 router.put("/update-profile" ,userAuth, updateProfile)
 router.put("/update-password" ,userAuth, updatePassword)
 router.post("/forgot-password" , requestForgotPassword)
 router.post("/reset-password/:token" ,resetPassword )


  // Admin routes
    router.get("/admin/users" ,userAuth, adminOnly, getAllUserByAdmin);
    router.get("/admin/user/:userId" ,userAuth, adminOnly, getSingleUserByAdmin)
    router.put("/admin/update-user/:userId" ,userAuth, adminOnly, updateRoleByAdmin)
   router.delete("/admin/delete-user/:userId" ,userAuth, adminOnly, deleteUserByAdmin);



export default router;