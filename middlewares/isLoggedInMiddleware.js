const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');


const auth = expressAsyncHandler(async (req, res, next) => {


    const authHeader = req.headers.authorization;


    const tokenOfTheUser = authHeader.split(' ')[1];


    if(tokenOfTheUser) {

        const infoOfTheAuthUser = jwt.verify(tokenOfTheUser, process.env.JWT_SECRET);

        const idOfTheAuthUser = infoOfTheAuthUser?.userId;

        req.body.user = idOfTheAuthUser;

        next();

    } 


});


module.exports = {
    auth
};