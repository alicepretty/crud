
const Joi = require('joi')
const commentvalidations = {

     createOrupdatecomment:{
         body: Joi.object({
             Name : Joi.string().required(),
             Email: Joi.string().required().email(),
             Message: Joi.string().required()
         })
     }
}
 
module.exports = commentvalidations
