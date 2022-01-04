import { Request, Response, NextFunction } from 'express';
import config from '../../utils/config';
import { crudControllers } from '../../utils/cruds';
import { User } from '../user/user.model';
import { BodyData } from '../user/user.types';
import { authData } from './auth.model';
const bcrypt = require('bcrypt');
const { generateRefreshToken, generateToken} = require('../../utils/auth')
var jwt = require('jsonwebtoken');


export const CrudUser = crudControllers(User)


// signin 
export const signIn = async(req:Request,res:Response) => {

    try {
     const user = await User.findOne({
         email: req.body.email
     })
 
     if(user){
         var passwordIsValid = await bcrypt.compareSync(
             req.body.password,
             user.password
           );
     }
 
     if (!passwordIsValid) {
         res.status(401).send({
             accessToken: null,
             message: "Invalid Password!"
         });
     }
 
     //generate refresh token
     var token = await generateToken(user.id);
 
     //generate refresh token and saved in DB : FUNCTION
     //important - do not remove this
     var refresh_token = await generateRefreshToken(user.id);
    
     

    await res.status(200).send({
            id: user._id,
            email: user.email,
            accessToken: token,
        });
    } catch(e){
        res.status(403).send({ message: e })
    }
 
}

// get new access token
export const newToken = async(req:any, res:any) => {
    try{
        // get access token from the headers/body
        let token = await req.headers['accesstoken']


        // store new token here
        let newToken:string

        if(!token){
             return await res.status(403).send({ message: "No Refresh Token Found" })
        }

         await jwt.verify(token, config.secret_key, async function(err: any,decoded: any){

            
            // decode the jwt 
            const { id, iat, exp } = jwt.decode(token)

            if(err.name !== 'TokenExpiredError'){
             return await res.status(403).send({ message: "Malformed token" })
                
            }
            // get user id
            const { user } = await authData.findOne({ user: id }).exec();

            // check if the decoded ID and the db id matches
            if(id === user){
                newToken = await generateToken(user.id);
            }
            

            await res.status(201).send({
                accesstoken:newToken
                
            })
        })

        
    }
    catch(e){
        return res.status(403).send({message:e})
    }
}



// validate signup user data
export const checkUserInfo = async(req:Request,res:Response,next:NextFunction) => {

    const {name,role,password, email} : BodyData = req.body;

    if(!password){
       await res.status(201).json("ERROR: password is empty")
    }

    let errors: boolean = false;

    // first verify email address regex
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) === false){
        errors = true;
        res.status(201).json('error with email address format')

    }


    // validate if the email address already exists
    await User.findOne({email:email}).then((user: any)=>{
        if(user){
            errors = true;
            res.status(201).json(' email with same email address exists')
        }
    })

    if(errors === false) {
    
        next()

    }

 
}