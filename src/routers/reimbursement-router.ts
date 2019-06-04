import express from 'express'
//import { users } from '../state';
//import { User } from '../models/user';
import { authorization } from '../middleware/auth.middleware';
//import { getAllUsersService, getUserByUsernameAndPasswordService, getUsersByIdService, updateUserByIdService } from '../service/users.service';
//import { User } from '../models/user';
import { getReimbursementByStatusService, getReimbursementByUserService, updateReimbursementService} from '../service/reimbursement.services';
import { submitReimbursement } from '../dao/reimbursement.dao';
//import { updateUserByIdService } from '../service/users.service';
//import { Role } from "../models/role";

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:id', [authorization([{ roleId: 2, role: 'finance-manager' }, {roleId: 1, role: 'admin'}]), async (req, res) => {
    let id = +req.params.id
    //console.log(id)
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        let reim = await getReimbursementByStatusService(id)
        //console.log(reim[0])
        //console.log(user[0].role)

        if (reim) {
            res.json(reim)
        } else {
            res.sendStatus(400)
        }
    }
}])

reimbursementRouter.get('/author/userId/:id', [authorization([{ roleId: 2, role: 'finance-manager' }, {roleId: 1, role: 'admin'}]), async (req, res) => {
    let id = +req.params.id
    //console.log(id)
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        let reim = await getReimbursementByUserService(id)
        //console.log(reim[0])
        //console.log(user[0].role)

        if (reim) {
            res.json(reim)
        } else {
            res.sendStatus(400)
        }
    }
}])

reimbursementRouter.post('', async (req,res) => {
    let reim = await submitReimbursement(req)
    if(reim){
        res.sendStatus(201)
    }
    else{
        res.sendStatus(400)
    }
})

reimbursementRouter.patch('/:id', [authorization([{ roleId: 2, role: 'finance-manager' }, {roleId: 1, role: 'admin'}]), async (req, res) => {
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }
    else{
        let reim = await updateReimbursementService(id, req)
        //let user = await getUsersByIdService(id)
        if(reim){
            res.json(reim)
        }
        else{
            res.sendStatus(400)
        }
    }
}])
