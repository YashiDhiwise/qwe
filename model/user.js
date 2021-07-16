const mongoose = require("../config/db");
const mongoosePaginate = require('mongoose-paginate-v2');
var idValidator = require('mongoose-id-validator');
const bcrypt = require("bcrypt");
const{USER_ROLE,DEFAULT_ROLE} = require("../config/authConstant");
const {convertObjectToEnum} = require("../utils/common")
   
const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'data',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
};

mongoosePaginate.paginate.options = {
    customLabels: myCustomLabels
};

const Schema = mongoose.Schema;
const schema = new Schema(
{

    
    addedBy:{type:Schema.Types.ObjectId,ref:"user"},

    
    email:{type:String},

    
    isActive:Boolean,

    
    isDeleted:Boolean,

    
    loginTry:{type:Number,default:0},

    
    name:{type:String},

    
    password:{type:String},

    
    resetPasswordLink:{code:String,expireTime:Date},

    
    role:{type:Number,enum:convertObjectToEnum(USER_ROLE)},

    
    username:{type:String}
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);


schema.pre('save', async function(next) {
    this.isDeleted = false;
    this.isActive = true;
    if(this.password){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});



schema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);



const user = mongoose.model("user",schema,"user");
module.exports = user