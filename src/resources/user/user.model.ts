import mongoose from 'mongoose'
import { BodyData } from './user.types';

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;



const userSchema = new mongoose.Schema<BodyData>(
    {
      name: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 50
      },

      role:{
        type: String,
        // required: true,
        trim: true,
        maxlength: 50
      },

      password:{
          type:String,
          required:true
      },
      email: {
          type:String,
          required:true
      }
    },
    { timestamps: true }
)
  
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err: mongoose.CallbackError | undefined, salt: any) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err: mongoose.CallbackError | undefined, hash: any) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = async function(candidatePassword, cb) {
    await bcrypt.compare(candidatePassword, this.password, function(err: any, isMatch: any) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



  export const User:any = mongoose.model('user', userSchema)