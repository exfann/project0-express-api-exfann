import { User } from "../models/user";
import { UserDTO } from "../dtos/user.dto";
import { Role } from "../models/role";

export function sqlUsertojsUser(sqluser: UserDTO):User{
    //console.log(sqluser.roles)
    let role = new Role(sqluser.role_id, sqluser.role_name)
    //console.log(role.roleId, role.role)
    //console.log('converting')
    return new User(sqluser.user_id, sqluser.username, sqluser.pass, sqluser.firstname, sqluser.lastname, sqluser.email, [role])
    //return new User('lkadsflkj', 'adsflkjdsaf', undefined, 8, ['jadsf', 'jkadsf'])
}