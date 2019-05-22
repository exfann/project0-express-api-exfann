import { ReimbursementDTO } from "../dtos/reimbursement.dto";
import { Reimbursement } from "../models/reimbursement";
import { ReimbursementStatus } from "../models/reimbursementstatus";
import { getUsersByIdService } from "../service/users.service";
import { ReimbursementType } from "../models/reimbursementtype";

export function sqlReimbursementtojsReimbursement(sqlrem: ReimbursementDTO):Reimbursement{
    //console.log(sqluser.roles)
    //let role = new Role(sqluser.role_id, sqluser.role_name)
    let status = new ReimbursementStatus(sqlrem.status_id, sqlrem.status)
    let type = new ReimbursementType(sqlrem.type_id, sqlrem.reimbursement_type)
    //console.log(role.roleId, role.role)
    //let author = await getUsersByIdService(sqlrem.author)
    //let resolver = await getUsersByIdService(sqlrem.resolver)
    //console.log('converting')
    return new Reimbursement(sqlrem.reimbursement_id, sqlrem.author, sqlrem.amount, sqlrem.submit, sqlrem.resolved, sqlrem.description, sqlrem.resolver, status, type)
    //return new User('lkadsflkj', 'adsflkjdsaf', undefined, 8, ['jadsf', 'jkadsf'])
}