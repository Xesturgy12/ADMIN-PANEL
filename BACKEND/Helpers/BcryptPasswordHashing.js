const bcrypt = require('bcrypt')


//saltRounds represents number of rounds you want for hashing the password 
// refer to this article:  https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pbkdf2-sha256/3993#3993
const saltRounds = 8;



//hashes password using bcrypt with 8 salt rounds of hashing
async function hashPassword(PlaintextPassword){   
    try{
        let hash  = await bcrypt.hash(PlaintextPassword, saltRounds)
        // console.log(hash);
        return hash
    } 
    catch(err){
        return new Error(err.message)
    }
}




async function ComparePassword(PlaintextPassword,hash){

    try{
        let result = await bcrypt.compare(PlaintextPassword, hash)
        return result
    }
    catch(err){
        return new Error(err.message)
    }
}


module.exports = {
    hashPassword,
    ComparePassword
}