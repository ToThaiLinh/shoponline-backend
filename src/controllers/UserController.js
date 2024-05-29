const { refreshTokenJWTService } = require('../services/JwtService');
const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;
        const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const isCheckEmail = reg.test(email)
        if(!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        }
        else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is email"
            })
        }
        else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: "The password is equal confirmPassword"
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const isCheckEmail = reg.test(email)
        if(!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        }
        else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is email"
            })
        }
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samsite: 'strict'
        })
        return res.status(200).json(newResponse)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = await req.params.id
        console.log('userId', userId)
        const data = req.body
        console.log(data)
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is required"
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = await req.params.id;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is required"
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = await req.params.id;
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is required"
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = await req.cookies.refresh_token
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: "The token is required"
            })
        }
        const response = await JwtService.refreshTokenJWTService(token)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}