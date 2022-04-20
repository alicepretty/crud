const bcrypt = require('bcrypt');
  const hashPassword =(password) =>{ return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }

const checkPassword= (password, hashed) => { return bcrypt.compareSync(password, hashed); }

module.exports = {
    hashPassword,checkPassword
}