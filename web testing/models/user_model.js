

    const mongoose = require("mongoose")
    

    

    




var userSchema = new mongoose.Schema({

    fullname : {
        type: String,
        
    },

    email : {
        type: String,

    },

    phone : {
        type: String
    },

    city : {
        type: String
    }

    

});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');




userSchema.path('phone').validate((val) => {
    phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
    return phoneRegex.test(val);
}, 'Invalid phone number.');



mongoose.model("User", userSchema);






