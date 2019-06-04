import { Role } from "../models/role";

export function authorization(authRoles:Role[]){
    //the function we return is the middleware
    //console.log(authRoles)
    return (req, res, next) => {
        let isAuth = false
        //make sure user is logged in, otherwise user will be undefined
        // if(!req.session.user){
        //     res.sendStatus(401)
        // }
        // console.log(req.session.user.role)
        // console.log(authRoles[0])
        // if(!authRoles.includes(req.session.user.role)){
        //     console.log('if')
        //     isAuth = true
        // }
        //make sure user has at least one role in authroles
        //console.log(req.session.user.role)
        for(let userRole of req.session.user.role){
            console.log(userRole.roleId)
            //console.log(typeof(req.session.user.role.roleId))
            // console.log(req.session.user.role)
            // console.log(`req.session.user.role = ${[req.session.user.role]}`)
            //console.log(`${req.session.user.role[0].roleId} has a type of ${typeof(req.session.user.role[0].roleId)}`)
            //console.log(typeof(authRoles[0].roleId))
            // console.log(`${authRoles[0].roleId} has a type of ${typeof(authRoles[0].roleId)}`)
            //console.log(req.session.user.role)
            //console.log(authRoles)
            //console.log(userRole)


            if(userRole.roleId){
                //console.log('THEYRE THE SAME WHY DO YOU GOTTA DO THIS TO ME')
                authRoles.forEach(element => {
                    if(element.roleId === element.roleId){
                        isAuth = true
                    }
                });
                //isAuth = true

            }
            //console.log('DSAJLKFDSAJFDSAKJGFDSAIJGDSAIFDSAIJDSAPFIJFDSAIJFDSAIJ')
            // if(authRoles.includes(userRole)){
            //     //console.log('scresalkdjflkja')
            //     isAuth = true
            // }
            // else{
            //     //console.log('scream')
            //     res.sendStatus
            // }
        } 
        if(isAuth){
            next()
        } else {
            //console.log('heck')
            res.status(401).send('The incoming token has expired')
        }

    }
}

export function authorization2electricboogaloo(authRoles:Role[]){
    //the function we return is the middleware
    //console.log(authRoles)
    return (req, res, next) => {
        let isAuth = false
        //make sure user is logged in, otherwise user will be undefined
        // if(!req.session.user){
        //     res.sendStatus(401)
        // }
        // console.log(req.session.user.role)
        // console.log(authRoles[0])
        // if(!authRoles.includes(req.session.user.role)){
        //     console.log('if')
        //     isAuth = true
        // }
        //make sure user has at least one role in authroles
        //console.log(req.session.user.role)
        for(let userRole of req.session.user.role){
            //console.log(typeof(req.session.user.role.roleId))
            // console.log(req.session.user.role)
            // console.log(`req.session.user.role = ${[req.session.user.role]}`)
            //console.log(`${req.session.user.role[0].roleId} has a type of ${typeof(req.session.user.role[0].roleId)}`)
            //console.log(typeof(authRoles[0].roleId))
            // console.log(`${authRoles[0].roleId} has a type of ${typeof(authRoles[0].roleId)}`)
            //console.log(req.session.user.role)
            //console.log(authRoles)
            //console.log(userRole)


            if(userRole.roleId === authRoles[0].roleId || req.session.user.id){
                //console.log('THEYRE THE SAME WHY DO YOU GOTTA DO THIS TO ME')
                isAuth = true

            }
            //console.log('DSAJLKFDSAJFDSAKJGFDSAIJGDSAIFDSAIJDSAPFIJFDSAIJFDSAIJ')
            // if(authRoles.includes(userRole)){
            //     //console.log('scresalkdjflkja')
            //     isAuth = true
            // }
            // else{
            //     //console.log('scream')
            //     res.sendStatus
            // }
        } 
        if(isAuth){
            next()
        } else {
            //console.log('heck')
            res.sendStatus(403)
        }

    }
}
