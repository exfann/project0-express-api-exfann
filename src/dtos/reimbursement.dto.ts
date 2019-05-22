//import { User } from "../models/user";

export class ReimbursementDTO{
    reimbursement_id: number // primary key
    author: number // not null, unique
    amount: number // not null
    submit: number // not null
    resolved: number // not null
    description: string // not null
    resolver:number
    status_id:number // not null
    status:string
    type_id:number
    reimbursement_type:string
}