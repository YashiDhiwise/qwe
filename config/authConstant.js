/*
 * constants
 */

const JWT={
    CLIENT_SECRET:"myjwtclientsecret",
    EXPIRES_IN: 10000
}

const USER_ROLE ={
    User:1,
}

const PLATFORM = {
    CLIENT:1,
}

let LOGIN_ACCESS ={
    [USER_ROLE.User]:[PLATFORM.CLIENT],        
}

const DEFAULT_ROLE= 1

const ROLE_RIGHTS={
    
    [USER_ROLE.User] : [
  "getAllByUserInClientPlatform",
  "getByUserInClientPlatform",
  "aggregateByUserInClientPlatform",
  "getCountByUserInClientPlatform",
  "createByUserInClientPlatform",
  "addBulkByUserInClientPlatform",
  "updateByUserInClientPlatform",
  "updateBulkByUserInClientPlatform",
  "partialUpdateByUserInClientPlatform",
  "deleteByUserInClientPlatform",
  "softDeleteByUserInClientPlatform",
  "upsertByUserInClientPlatform",
  "fileUploadByUserInClientPlatform",
  "changePasswordByUserInClientPlatform"
],
    
}
const MAX_LOGIN_RETRY_LIMIT = 3;   


const FORGOT_PASSWORD_WITH = {
  OTP: {
    email: true,
    sms: false
  },
  EXPIRETIME: 20
}

module.exports = {
    JWT,
    USER_ROLE,
    DEFAULT_ROLE,
    ROLE_RIGHTS,
    PLATFORM,
    MAX_LOGIN_RETRY_LIMIT,
    FORGOT_PASSWORD_WITH,
    LOGIN_ACCESS,
        
}