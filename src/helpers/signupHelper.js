/**
 * This helper function is created to help signup mechanism.
 * If a client provide role field with admin or moderator
 * this function will prevent them to becoming an unwanted admin or moderator
 * @return boolean
 *
 */

//dependencies
const bcrypt = require("bcrypt");

async function signupHelper(newUser){
    //gets role from the newUser object
    let role = newUser.role;

    //if role isn't there in newUser object or role is not admin or moderator, return true
    if(!role || (role !== 'admin' && role !== 'moderator')){
        return true;
    }

    // Ensure that admin credentials are available
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_USERNAME) {
        throw new Error("Admin credentials are not defined in the environment variables.");
    }

    //if role is admin, check if the password & username is correct
    const isValidPassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, newUser.password)
    return isValidPassword && newUser.email === process.env.ADMIN_EMAIL;
}
module.exports = signupHelper;