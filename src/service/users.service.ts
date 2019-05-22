import { getAllUsers, getUserByUsernameAndPassword, getUserById, updateUserById } from "../dao/user.dao";
import { Request } from "express";

export async function getAllUsersService(){
    //send email to Big Boss who asked for all users
    //write specific log file about it
    return await getAllUsers()
}

export async function getUserByUsernameAndPasswordService(req:Request, username:string, password:string ){
    let user = await getUserByUsernameAndPassword(username, password)
    if(typeof(user) === 'string'){
        return user
    }
    else{
        req.session.user = user
        return user
    }
}

export async function getUsersByIdService(uid:number){
    return await getUserById(uid)
}

export async function updateUserByIdService(id:number, req:Request){
    return await updateUserById(id, req)
}