const { StatusCodes } = require('http-status-codes');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('./../models/User');



const registerUser = expressAsyncHandler(async (req, res) => {


    const { fullname, email, password } = req.body;


    const isUserAlreadyExists = await User.findOne({ email: email });


    if (isUserAlreadyExists) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: 'user with this emailID already exists.'
        });
    }


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    await User.create({
        fullname: fullname,
        email: email,
        password: hashedPassword
    });

    res.status(StatusCodes.CREATED).send({
        success: true,
        message: 'You are registered successfully. Now, kindly log in.'
    });

});


const loginUser = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: 'Invalid Credentials!! Please try again!.'
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            success: false,
            message: 'Invalid Credentials!! Please try again!.'
        });
    }


    const tokenGenerated = user.generateToken()


    res.status(StatusCodes.OK).send({
        success: true,
        message: 'You are logged in successfully.',
        user: user,
        token: tokenGenerated
    });

});


const userProfile = expressAsyncHandler(async (req, res) => {

    const fetchUserDetail = await User.findById(req?.body?.user);

    res.status(StatusCodes.OK).send({
        success: true,
        message: 'your profile has been fetched successfully.',
        userFullName: fetchUserDetail?.fullname,
        email: fetchUserDetail.email
    });

});


module.exports = {
    registerUser,
    loginUser,
    userProfile
}