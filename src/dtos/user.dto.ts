//import { Role } from "../models/role";

export class UserDTO{
    user_id: number // primary key
    username: string // not null, unique
    pass: string // not null
    firstname: string // not null
    lastname: string // not null
    email: string // not null
    role_id:number
    role_name:string // not null
}