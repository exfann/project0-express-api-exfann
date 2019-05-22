import { PoolClient } from 'pg'
import { connectionPool } from '.';
import { sqlUsertojsUser } from '../util/user-converter';
import { Request } from 'express-serve-static-core';

//we are allowing getAllUsers to be added to our c++ apis
export async function getAllUsers(){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT user_id, username, pass, firstname, lastname, email, roles.role_id, roles.role_name FROM ers.users INNER JOIN ers.roles on users.role_id = roles.role_id ')
        // console.log(result.rows)
        return result.rows.map(sqlUsertojsUser)
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}

export async function getUserById(uid:number){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT user_id, username, pass, firstname, lastname, email, roles.role_id, roles.role_name FROM ers.users INNER JOIN ers.roles on users.role_id = roles.role_id WHERE user_id = $1 `, [uid])
        // console.log(result.rows)
        // console.log(result)
        let ret = result.rows.map(user => sqlUsertojsUser(user))
        //console.log(ret[0].role);
        
        return ret
    }
    catch(err){
        console.log(err)
        return 'internal server'
    }
    finally{
        client && client.release()
    }
}

export async function getUserByUsernameAndPassword(username:string, password:string){
    let client:PoolClient
    try{
        console.log('logging in')
        client = await connectionPool.connect()
        let query = 'SELECT user_id, username, pass, firstname, lastname, email, roles.role_id, roles.role_name FROM ers.users INNER JOIN ers.roles on users.role_id = roles.role_id WHERE username = $1 and pass = $2 '
        let result = await client.query(query, [username, password])
        if(!result.rows[0]){
            return 'user not found'
        }
        return sqlUsertojsUser(result.rows[0])
    }
    catch(err){
        console.log(err)
        return 'invalid'
    }
    finally{
        client && client.release()
    }

}

// export async function updateUserById(id:number, username:string = undefined, password:string = undefined, firstName:string = undefined, lastName:string = undefined, email:string = undefined, roles:number = undefined){
export async function updateUserById(id:number, req:Request){
    let client:PoolClient
    let vals = []
    let querf = []
    let i = 1
    try{
        client = await connectionPool.connect()
        let query = ['UPDATE ers.users SET ']

        if(req.body.username !== undefined){
            query.push(`username = $${i}`)
            vals.push(req.body.username)
            i = i+1
        }
        if(req.body.password !== undefined){
            query.push(`pass = $${i}`)
            vals.push(req.body.password)
            i = i+1
        }
        if(req.body.firstName !== undefined){
            query.push(`firstname = $${i}`)
            vals.push(req.body.firstName)
            i = i+1
        }
        if(req.body.lastName !== undefined){
            query.push(`lastname = $${i}`)
            vals.push(req.body.lastName)
            i = i+1
        }
        if(req.body.email !== undefined){
            query.push(`email = $${i}`)
            vals.push(req.body.email)
            i = i+1
        }
        if(req.body.role_id !== undefined){
            query.push(`role_id = $${i}`)
            vals.push(req.body.role_id)
            i = i+1
        }
        query.push(`WHERE user_id = $${i}`)
        vals.push(id)

        let query1 = query.splice(0,2)
        let query2 = query.splice(0, query.length-1)
        //console.log(query1)
        //console.log(query2)
        let quer = query1.join(' ')
        //console.log(quer)
        let quer2 = query2.join(', ')
        //console.log(quer2)
        querf.push(quer)
        querf.push(quer2)
        //console.log(querf.join(", "))
        query.unshift(querf.join(", "))
        //console.log(query.join(' '))

        await client.query(query.join(' '), vals)

        return 'updated'
        //console.log(result.rows)
        // if(!result.rows[0]){
        //     return 'user not found'
        // }
        // return sqlUsertojsUser(result.rows[0])
        //return 'hi'
        
    }
    catch(err){
        console.log(err)
        return 'invalid'
    }
    finally{
        client && client.release()
    }
}