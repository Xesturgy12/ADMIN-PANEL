const router = require('express').Router()
const userController = require('../controllers/UserController')
const AdminController = require('../controllers/AdminController')
const {verifyAdminOTPController,sendAdminOTPController} = require('../Helpers/AdminOTPHelper')
const userModel = require('../models/userModel')
const Auth = require('../Helpers/Auth')
const uploadImage = require('../Helpers/UploadPhoto')

////////////////////////////////USER ROUTES////////////////////////////////


// router.post('/user/login',userController.Login)

// router.post('/user/logout',userController.LogOut)

// router.post('/user/signup',userController.SignUp)

// router.post('/user/forgotPassword',sendOTPController)

// router.post('/user/verifyforgotPassword',verifyOTPController)

// router.post('/user/resetPassword',userController.ResetPassword)

// router.post('/user/signup',userController.SignUp)





///////////////////////////////ADMIN ROUTES////////////////////////////////

router.post('/admin/login',AdminController.Login)

router.put('/admin/user/update/:id',Auth.jwtAuthorization,AdminController.UpdateUser)

router.put('/admin/update/:id',[ Auth.jwtAuthorization , uploadImage.single('image') ],AdminController.UpdateAdmin)

router.get('/admin/info',AdminController.GetAdminInfo)

router.post('/admin/add/user',Auth.jwtAuthorization,AdminController.AddNewUser)

router.get('/admin/user/get',Auth.jwtAuthorization,AdminController.GetUsers)

router.post('/admin/forgotPassword',sendAdminOTPController)

router.post('/admin/verifyforgotPassword',verifyAdminOTPController)

router.post('/admin/resetPassword',AdminController.ResetPassword)

router.delete('/user/remove/:id',Auth.jwtAuthorization,userController.Remove)


module.exports = router