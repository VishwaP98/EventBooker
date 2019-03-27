
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {

    createUser: async (args) => {

        try {

            // before creating a user, check if a user already exists
            const existingUser = User.findOne({ email: args.userInput.email });
            
            console.log(existingUser._doc);

            if(existingUser._doc) {
                throw new Error("User exists already!");
            }
            
            const hashPassword = await bcrypt.hash(args.userInput.password, 12);
            
            const user = new User({
                email: args.userInput.email,
                password: hashPassword
            });
            
            const result = await user.save();
            
            return {...result._doc, password: null};
            
        } catch(err) {
            throw err;
        }
    }
}