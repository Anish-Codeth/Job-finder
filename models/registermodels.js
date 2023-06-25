const mongoose=require('mongoose')

const registerSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,'Please provide the first name'],
            minlength:3,
            maxlength:30
        },
                middleName:{
            type:String,
            minlength:3,
            maxlength:30
        },

        lastName:{
            type:String,
            required:[true,'Please provide the Last name'],
            minlength:3,
            maxlength:30
        },

        Email:{
            type:String,
            required:[true,"please provide the email"],
            unique:true
        },

        Password:{
            type:String,
            required:[true,"please provide the email"],
            match:{
               value:/.*[A-Z]+.*[0-9].*[!@#/$&]+.*/,
               message:'You will get random password'
            },
            minlength:8
        },

        confirmPassword:{
            type:String,
            required:[true,"please provide the Password"],
            Validate:{
                validator:function (cp){
                    return cp===this.Password
                },
                message:'Password is not matched'
            }
        }



    }
)


module.exports=mongoose.model('sudhhen',registerSchema)