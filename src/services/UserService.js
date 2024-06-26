const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');



const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const {name, email, password, confirmPassword, isAdmin, phone, address, avatar} = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUser =await User.create({
                name, 
                email, 
                password: hashPassword, 
                isAdmin,
                phone,
                address, 
                avatar
            })
            if(newUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newUser
                })
            }
            
        }
        catch(e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const { email, password} = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not define'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user incorrect'
                })
            }
            const access_token =await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data, {new: true})

            resolve({
                status: 'OK',
                message: 'Update user success',
                data: updateUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'Delete user success'
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get all user success',
                data: allUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if(user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
           
            resolve({
                status: 'OK',
                message: 'Get details user success',
                data: user
            })
        }
        catch(e) {
            reject(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}
