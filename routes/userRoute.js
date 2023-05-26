const { registerUser, login, getUsers, verifyUser } = require('../controllers/Authcontroller');

const userRouter = require('express').Router()

userRouter.route('/registration').post(registerUser)
userRouter.route('/login').post(login)
userRouter.route('/users').get(verifyUser,getUsers)

module.exports = userRouter;