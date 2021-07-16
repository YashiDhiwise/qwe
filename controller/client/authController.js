const authService =  require("../../services/auth")
const utils = require("../../utils/messages");
const User = require("../../model/user");
const dbService = require("../../utils/dbService");
const moment = require("moment");
const userSchemaKey = require("../../utils/validation/userValidation");
const validation = require("../../utils/validateRequest");
    
module.exports = {
    /*
     * api: user register 
     * description : first time user registration.
     */
    register : async(req, res) => {
        try {
            let isValid = validation.validateParamsWithJoi(
                req.body,
                userSchemaKey.schemaKeys
            );
            if (isValid.error) {
               return utils.inValidParam(isValid.details, res);
            } 
            const data = new User({
                ...req.body
            })    
            const result = await dbService.createDocument(User,data);
            return  utils.successResponse(result, res);
        } catch (error) {
            if(error.name === "ValidationError"){
                return utils.validationError(error.message, res);
            }
            if(error.code && error.code == 11000){
                return utils.isDuplicate(error.message, res);
            }
            return utils.failureResponse({},res);
        }  
    },
    /*
     * api : forgot password
     * description : send email or sms to user for forgot password.
     */
    forgotPassword: async (req, res) => {
        const params = req.body;
        try {
            if (!params.email) {
                return utils.insufficientParameters(res);
            }
            let where = {email: params.email};
            params.email = params.email.toString().toLowerCase();
            let isUser = await dbService.getDocumentByQuery(User,where);
            if (isUser) {
                let {resultOfEmail,resultOfSMS} = await authService.sendResetPasswordNotification(isUser);
                if(resultOfEmail && resultOfSMS){
                    return utils.successResponse("otp successfully send.", res);
                }else if(resultOfEmail && !resultOfSMS) {
                    return utils.successResponse("otp successfully send to your email.", res);
                } else if (!resultOfEmail && resultOfSMS) { 
                    return utils.successResponse("otp successfully send to your mobile number.", res);
                }else{
                    return utils.failureResponse("otp can not be sent due to some issue try again later", res);
                }
            } else {
                return utils.recordNotFound("user not found", res);
            }
        } catch (error) {
            //console.log(error);
            return utils.failureResponse(error, res);
        }
    },
    /*
     * api : validate forgot password otp 
     * description : after successfully sent mail or sms for forgot password validate otp
     */
    validateResetPasswordOtp: async (req, res) => {
        const params = req.body;
        try {
            if (!params || !params.otp) {
                return utils.insufficientParameters(res);
            }
            let isUser = await dbService.getDocumentByQuery(User, { 'resetPasswordLink.code': params.otp });
            if (!isUser || !isUser.resetPasswordLink.expireTime) {
                return utils.successResponse("Invalid OTP", res);
            }
            // link expire
            if (moment(new Date()).isAfter(moment(isUser.resetPasswordLink.expireTime))) {
                return utils.successResponse("Your reset password link is expired or invalid", res);
            }
            // await dbService.updateDocument(User, isUser.id, { resetPasswordLink: {} })
            return utils.successResponse('Otp verified', res);
        } catch (error) {
            //console.log(error);
            return utils.failureResponse(error.message, res);
        }
    },
    /*
     * api : reset password
     * description : after successfully sent email or sms for forgot password,
     *                validate otp or link and reset password
     */
    resetPassword : async (req, res) => {
        const params = req.body;
        try {
            if (!params.code || !params.newPassword) {
                return utils.insufficientParameters(res);
            }
            let isUser = await dbService.getDocumentByQuery(User, { 'resetPasswordLink.code': params.code });
            if (isUser && isUser.resetPasswordLink.expireTime) {
                if (moment(new Date()).isAfter(moment(isUser.resetPasswordLink.expireTime))) {// link expire
                    return utils.failureResponse("Your reset password link is expired on invalid", res);
                }
            } else {
                // invalid token
                return utils.failureResponse("Invalid Code", res);
            }
            let response = await authService.resetPassword(isUser, params.newPassword);
            return utils.successResponse(response.data, res);
        } catch (error) {
            //console.log(error);
            return utils.failureResponse(error.message, res);
        }
    },
    /*
     * api :  authentication
     * description : login user
     */
    login:async(req,res)=>{
        try {
            let {username,password} = req.body;
            let url = req.originalUrl
            if(username && password){
                let result = await authService.loginUser(username,password,url); 
                if(!result.flag){
                    return utils.loginSuccess(result.data,res);
                }
                return utils.loginFailed(result.data,res);
            }else{
                return utils.insufficientParameters(res);
            }
        } catch (error) {
            return utils.failureResponse(error.message, res);
        }
    }
}
