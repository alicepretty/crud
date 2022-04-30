
import bcrypt from 'bcrypt';

  const { hashSync, genSaltSync, compareSync } = bcrypt;

  const hashPassword =(password) =>{ return hashSync(password, genSaltSync(10)); }

const checkPassword= (password, hashed) => { return compareSync(password, hashed); }

export default {
    hashPassword,checkPassword
}