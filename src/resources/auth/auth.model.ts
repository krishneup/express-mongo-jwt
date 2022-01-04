import mongoose from 'mongoose'

import { authTypes } from './auth.types'

const authDataSchema = new mongoose.Schema<authTypes>(
    {
        user:{
            type:String,
            required:true
        },

        token:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
)

export const authData:any =  mongoose.model('authdata', authDataSchema)