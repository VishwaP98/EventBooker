
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {

    login: async ({email, password}) => {   // this is object destructuring
        try {

            const user = await User.findOne({email: email});
            if(!user) {
                throw new Error("User does not exist / Password is incorrect");
            }

            console.log(user);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if(!isPasswordValid) {
                throw new Error("User does not exist / Password is incorrect");
            }

            console.log("Fine here");
            // create a token
            const token = jwt.sign({userID: user.id, email: user.email}, "longsecretkey", {
                expiresIn: '1h'
            });

            return { userID: user.id, token: token, tokenExpiration: 1 };

        } catch(err) {
            throw err;
        }
    },

    createUser: async (args) => {

        try {

            // before creating a user, check if a user already exists
            const existingUser = await User.findOne({ email: args.userInput.email });
            
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