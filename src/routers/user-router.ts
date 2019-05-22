import express from 'express'
//import { users } from '../state';
//import { User } from '../models/user';
import { authorization } from '../middleware/auth.middleware';
import { getAllUsersService, getUserByUsernameAndPasswordService, getUsersByIdService, updateUserByIdService } from '../service/users.service';
import { User } from '../models/user';
//import { Role } from "../models/role";



export const userRouter = express.Router()

userRouter.get('', [authorization([{ roleId: 2, role: 'finance-manager' }]), async (req, res) => {
    res.json(await getAllUsersService())
}])


userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body
    //console.log(req.body)
    //console.log(typeof(req.body))
    //console.log(typeof(req.body.username))
    let user = await getUserByUsernameAndPasswordService(req, username, password)

    if (typeof (user) === 'string') {
        res.status(400).send('Invalid Credentials')
    } else {
        res.json(user)// don't send them the session
        //we send them their user object
    }
})
// userRouter.post('/login', (req, res) =>{
//     const {username, password} = req.body
//     const user = users.find(u => u.username === username && u.password === password)
//     if (user){
//         req.session.user = user
//         res.send(user)
//         //res.send(req.session) //dont send them the session object
//         //we send them their user object
//     }
//     else{
//         res.status(400).send('Invalid Credentials')
//     }
// })

// userRouter.get('/user',[authorization([]), (req, res) =>{
//     res.json(getAllUsersService())
// }])

userRouter.get('/:id', [authorization([{ roleId: 2, role: 'finance-manager' }]), async (req, res) => {
    let id = +req.params.id//id is string by default, adding the + turns to int
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        let user = await getUsersByIdService(id)
        console.log(user[0])
        //console.log(user[0].role)

        if (user) {
            res.json(user)
        } else {
            res.sendStatus(400)
        }
    }
}])

userRouter.patch('/:id', [authorization([{ roleId: 1, role: 'admin' }]), async (req, res) => {
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }
    else{
        await updateUserByIdService(id, req)
        let user = await getUsersByIdService(id)
        if(user){
            res.json(user)
        }
        else{
            res.sendStatus(400)
        }
    }
}])
