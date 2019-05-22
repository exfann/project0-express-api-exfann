import { getReimbursementByStatus, getReimbursementByUser, submitReimbursement, updateReimbursement } from "../dao/reimbursement.dao";
import { Request } from "express-serve-static-core";

export async function getReimbursementByStatusService(rid:number){
    return await getReimbursementByStatus(rid)
}

export async function getReimbursementByUserService(uid:number){
    return await getReimbursementByUser(uid)
}

export async function submitReimbursementService(req:Request){
    return await submitReimbursement(req)
}

export async function updateReimbursementService(rid:number, req:Request){
    return await updateReimbursement(rid, req)
}