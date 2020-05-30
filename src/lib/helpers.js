const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
 const salt = await bcrypt.genSalt(10);
 const finalPassword = await bcrypt.hash(password, salt);
 return finalPassword;
}

helpers.comaprePassword = async (password, savedPassword) => {
    try{
     return await bcrypt.compare(password, savedPassword);
    } catch(e){
      console.error(e);
    }
} 

module.exports = helpers;