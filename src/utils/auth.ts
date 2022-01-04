import { Request, Response, NextFunction } from 'express';
var jwt = require('jsonwebtoken');
import config from './config'
import { User } from '../resources/user/user.model'
const bcrypt = require('bcrypt');
import { authData } from '../resources/auth/auth.model'


module.exports = {

    generateToken: (userId: string) => {
        return new Promise<string>((resolve, reject) => {

            const options = {
                expiresIn: 100
            }

            jwt.sign({ id: userId }, config.secret_key, options, (err: any, token: string) => {
                if (err) {
                    reject("unauthorized")
                }
                resolve(token)
            })
        })
    },


    verifyAccessToken :(req:any, res:Response, next:NextFunction) => {
        let token = req.headers['accesstoken'];

        // console.log(req.headers)
        if(!token) {
            return res.status(403).send({message:"no token"});
        }
    
        jwt.verify(token, config.secret_key, function(err: any,decoded: any){
           
            if(err){
                return res.status(403).send({message:err})
            }
    
            // console.log('token verified')
             req.user= decoded.id;
            next()
        })
    },

    generateRefreshToken: (userId: string) => {
        return new Promise<string>(async(resolve, reject) => {

            const options = {
                expiresIn: 864000
            }

            await jwt.sign({ id: userId }, config.refresh_token, options, async(err: any, token: string) => {
                if (err) {
                    reject("unauthorized")
                }
                
                // find if the userId has refresh token saved in the db
                let isTokenSaved = await authData.findOne({ user: userId }).exec();

                // console.log("refresh token saved status "+ isTokenSaved)

                if(isTokenSaved === null){
                   await authData.create({
                       user:userId,
                       token:token
                   })
                } 

                // console.log(token)
                
                resolve(token)
            })
        })
    },

    verifyRefreshToken :(req:any, res:Response, next:NextFunction) => {
        const token = req.headers['refresh-token'];


        if(!token) {
            return res.status(403).send({message:"no token"}); 
        }
    
        jwt.verify(token, config.refresh_token, function(err: any,decoded: any){
           
            if(err){
                return res.status(403).send({message:err})
            }
    
            // console.log(res.locals)
             req.user= decoded.id;
            next()
        })
    }
}

