/*
 * modelValidation.js
 * purpose     : request validation
 * description : validate each post and put request as per mongoose model
 **/

const {USER_ROLE} = require("../../config/authConstant");
const {convertObjectToEnum} = require("../common");   
const joi = require("joi")
exports.schemaKeys = {
	id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
	username: joi.string(),
	password: joi.string(),
	email: joi.string(),
	name: joi.string(),
	role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
	resetPasswordLink: joi.object({code:joi.string(),expireTime:joi.date()}),
	loginTry: joi.number().integer(),
	isActive: joi.boolean(),
	isDeleted: joi.boolean()
};
exports.updateSchemaKeys = {
	id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
	username: joi.string(),
	password: joi.string(),
	email: joi.string(),
	name: joi.string(),
	role: joi.number().integer().valid(...convertObjectToEnum(USER_ROLE)),
	resetPasswordLink: joi.object({code:joi.string(),expireTime:joi.date()}),
	loginTry: joi.number().integer(),
	isActive: joi.boolean(),
	isDeleted: joi.boolean()
};