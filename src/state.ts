import { User } from "./models/user"
import { Role } from "./models/role"

export let roles:Role[] = [
    new Role(1, 'admin'),
    new Role(2, 'finance-manager')
]

export let users:User[] = [
    new User(1, 'exfann', 'password', 'Eva', 'Fann', 'exfann@gmail.com', [roles[0]]),
    new User(2, 'gloomstorm', 'password', 'Talyson', 'Kintago', 'taly@hamr.org', [roles[1]])
]