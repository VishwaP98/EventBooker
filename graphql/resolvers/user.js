
const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {
    createUser: (args) => {

        // before creating a user, check if a user already exists

        return User.findOne({
            email: args.userInput.email
        }).then(user => {
            if(user) {
                throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12)
        }).
        then(hashPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashPassword
                });

                return user.save();

            }).then(result => {
                return {...result._doc, password: null};
            }).catch(err => {
                console.log(err);
                throw err;
            })
        
    }
}