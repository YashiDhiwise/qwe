const User = require("../../model/user")
const utils = require("../../utils/messages")
const userSchemaKey = require("../../utils/validation/userValidation");
const validation = require("../../utils/validateRequest");
const dbService = require("../../utils/dbService");
const auth = require("../../services/auth");
const addUser = async(req, res) => {
    try {

        let isValid = validation.validateParamsWithJoi(
                    req.body,
            userSchemaKey.schemaKeys);
        if (isValid.error) {
            return utils.inValidParam(isValid.details, res);
        } 
        const data = new User({
            ...req.body,
        })
                let result = await dbService.createDocument(User,data);
        

        return  utils.successResponse(result, res);
    } catch (error) {
        if(error.name === "ValidationError"){
            return utils.validationError(error.message, res);
        }
        if(error.code && error.code == 11000){
            return utils.isDuplicate(error.message, res);
        }
        return utils.failureResponse(error.message,res); 
    }
}
const findAllUser = async(req, res) => {
    try {
        let options = {}
        let query={}
        let result;
        if(req.body.isCountOnly){
            if (req.body.query !== undefined) {
                query = { ...req.body.query }
            }
            result = await dbService.countDocument(User, query);
            if (result) {
                result = { totalRecords: result }
                return utils.successResponse(result, res);
            } 
            return utils.recordNotFound([], res)
        }
        else {
            if (req.body.options !== undefined) {
                if(req.body.options.populate){
                    delete req.body.options.populate;
                }
                options = { ...req.body.options };
                
                if(req.body.query !==undefined){
                    query={...req.body.query}
                }
                result = await dbService.getAllDocuments( User,query,options);
               
                if(!result){
                    return utils.recordNotFound([],res);
                }
                return utils.successResponse(result, res);
            }
        }
    }
    catch(error){
        return utils.failureResponse(error.message,res);
    }
}

const getUser = async(req, res) => {
    try {
        let query={};
        query.id = req.params.id;

        let result = await dbService.getDocumentByQuery(User,query);
        if(result){
            return  utils.successResponse(result, res);
            
        }
        return utils.recordNotFound([],res);
    }
    catch(error){
        return utils.failureResponse(error.message,res)
    }
}
const getUserCount = async(req, res) => {
    try {
        let where ={};
        if(req.body.where){
            where = req.body.where;
        }

        let result = await dbService.countDocument(User,where);
        if(result){
            result = {totalRecords:result}
            return utils.successResponse(result, res);
        }
        return utils.recordNotFound([],res);
    }
    catch(error){
        return utils.failureResponse(error.message,res);
    }
}

const getUserByAggregate = async (req,res)=>{
    try{
        let result=await dbService.getDocumentByAggregation(User,req.body);
        if(result){
            return utils.successResponse(result, res);
            return utils.successResponse(result, res);
        }
        return utils.recordNotFound([],res);
    }catch(error){
        return utils.failureResponse(error.message,res)
    }
}
const updateUser = async(req, res) => {
    try {
        const data = {
                ...req.body,
            id:req.params.id
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            userSchemaKey.schemaKeys
        );
        if (isValid.error) {
            return  utils.inValidParam(isValid.details, res);
        }

        let result = await dbService.findOneAndUpdateDocument(User,{_id:req.params.id},data,{new:true});
        if(!result){
            return utils.failureResponse("something is wrong",res)
        }


        
        return  utils.successResponse(result, res);
    }
    catch(error){
        if(error.name === "ValidationError"){
            return utils.isDuplicate(error.message, res);
        }
        if(error.code && error.code == 11000){
            return utils.isDuplicate(error.message, res);
        }
        return utils.failureResponse(error.message,res);
    }
}
const partialUpdateUser = async (req, res) => {
    try {
        const data = {
            ...req.body,
            id: req.params.id
        }
        let isValid = validation.validateParamsWithJoi(
            data,
            userSchemaKey.updateSchemaKeys
        );
        if (isValid.error) {
            return utils.inValidParam(isValid.details, res);
        }

        let result = await dbService.updateDocument(User, req.params.id, data);
        if (!result) {
            return utils.failureResponse("something is wrong", res)
        }

        
        return utils.successResponse(result, res);
        
    }
    catch(error){
        return utils.failureResponse(error.message, res)
    }
}
const softDeleteUser = async (req, res) => {
    try{
        let result = await dbService.updateDocument(User, { _id: req.params.id }, { isDeleted: true });
        if(!result){
            return utils.failedSoftDelete(res);
        }
        return  utils.successResponse(result, res);
    }catch(error){
        return utils.failureResponse(error.message,res); 
    }
}
const bulkInsertUser = async(req,res)=>{
    try{
        let data;   
        if(req.body.data !== undefined && req.body.data.length){
        data = req.body.data;

            let result =await dbService.bulkInsert(User,data);
            return  utils.successResponse(result, res);
        }else{
            return utils.failureResponse('Invalid Data',res)
        }  
    }catch(error){
        if(error.name === "ValidationError"){
            return utils.validationError(error.message, res);
        }
        if(error.code && error.code == 11000){
            return utils.isDuplicate(error.message, res);
        }
        return utils.failureResponse(error.message,res);
    }
}
const bulkUpdateUser=async(req,res)=>{
    try {
        let filter={};
        let data;
        if(req.body.filter !== undefined){
            filter = req.body.filter
        }
        if(req.body.data !== undefined){
            data = req.body.data;

            let result = await dbService.bulkUpdate(User,filter,data);
            if(!result){
                return utils.failureResponse("something is wrong.",res)
            }

            return  utils.successResponse(result, res);
        }
        else{
            return utils.failureResponse("Invalid Data", res)
        }
    }
    catch(error){
        return utils.failureResponse(error.message,res); 
    }
}
const deleteUser =async(req, res) => {
    try {
        const result = await dbService.findOneAndDeleteDocument(User, {_id:req.params.id});
        if(result){
            return  utils.successResponse(result, res);
        }
        return utils.failureResponse("something went wrong",res);
    }
    catch(error){
        return utils.failureResponse(error.message,res);
    }
}


    const changePassword = async (req, res) => {
        try {
            let params = req.body;
            if (!params.newPassword || !params.userId) {
                return utils.inValidParam({}, res);
            }
            let result = await auth.changePassword(params);
            return utils.successResponse(result.data, res);
        } catch (error) {
            return utils.failureResponse(error, res);
        }
    }

module.exports = {
    addUser,
    findAllUser,
    getUser,
    getUserCount,
    getUserByAggregate,
    updateUser,
    partialUpdateUser,
    softDeleteUser,
    bulkInsertUser,
    bulkUpdateUser,
    deleteUser,
    changePassword,
}
