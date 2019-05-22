import { PoolClient } from "pg";
import { connectionPool } from ".";
import { sqlReimbursementtojsReimbursement } from "../util/reimbursement-converter";
import { Request } from "express";

export async function getReimbursementByStatus(rid:number){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT reimbursement_id, author, amount, submit, resolved, description, resolver, reimbursementstatus.status_id, reimbursementstatus.status, reimbursementtype.type_id, reimbursementtype.reimbursement_type FROM ers.reimbursements INNER JOIN ers.reimbursementstatus ON reimbursements.status = reimbursementstatus.status_id INNER JOIN ers.reimbursementtype ON reimbursements.reimbursement_type = reimbursementtype.type_id WHERE reimbursementstatus.status_id = $1 `, [rid])
        // console.log(result.rows)
        // console.log(result)
        console.log('author')
        console.log(result.rows[0].author)
        let ret = result.rows.map(sqlReimbursementtojsReimbursement)
        //console.log(ret)
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

export async function getReimbursementByUser(uid:number){
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT reimbursement_id, author, amount, submit, resolved, description, resolver, reimbursementstatus.status_id, reimbursementstatus.status, reimbursementtype.type_id, reimbursementtype.reimbursement_type FROM ers.reimbursements INNER JOIN ers.reimbursementstatus ON reimbursements.status = reimbursementstatus.status_id INNER JOIN ers.reimbursementtype ON reimbursements.reimbursement_type = reimbursementtype.type_id WHERE author = $1 `, [uid])
        let ret = result.rows.map(sqlReimbursementtojsReimbursement)
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

export async function submitReimbursement(req:Request){
    let client:PoolClient
    let vals = []
    let querf = []
    let valsf = []
    let i = 1
    try{
        client = await connectionPool.connect()
        let query = ['INSERT INTO ers.reimbursements (']
        let values = ['VALUES (']

        if(req.body.author !== undefined){
            query.push(`author`)
            values.push(`$${i}`)
            vals.push(req.body.author)
            i = i+1
        }
        if(req.body.amount !== undefined){
            query.push(`amount`)
            values.push(`$${i}`)
            vals.push(req.body.amount)
            i = i+1
        }
        if(req.body.submit !== undefined){
            query.push(`submit`)
            values.push(`$${i}`)
            vals.push(req.body.submit)
            i = i+1
        }
        if(req.body.resolved !== undefined){
            query.push(`resolved`)
            values.push(`$${i}`)
            vals.push(req.body.resolved)
            i = i+1
        }
        if(req.body.description !== undefined){
            query.push(`description`)
            values.push(`$${i}`)
            vals.push(req.body.description)
            i = i+1
        }
        if(req.body.resolver !== undefined){
            query.push(`resolver`)
            values.push(`$${i}`)
            vals.push(req.body.resolver)
            i = i+1
        }
        if(req.body.status !== undefined){
            query.push(`status`)
            values.push(`$${i}`)
            vals.push(req.body.status)
            i = i+1
        }
        if(req.body.reimbursement_type !== undefined){
            query.push(`reimbursement_type`)
            values.push(`$${i}`)
            vals.push(req.body.reimbursement_type)
            i = i+1
        }
        //query.push(`WHERE user_id = $${i}`)
        query.push(`)`)
        values.push(`)`)
        //vals.push(id)

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
        //console.log(values.join(', '))
        let value1 = values.splice(0,1)
        console.log(values)
        let value2 = values.splice(0, values.length-1)
        console.log(value2)
        let val = value1.join(' ')
        let val2 = value2.join(', ')
        valsf.push(val)
        valsf.push(val2)
        valsf.push(values)
        query.push(valsf.join(' '))
        console.log(query.join(' '))
        console.log(vals)
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

export async function updateReimbursement(rid:number, req:Request){
    let client:PoolClient
    let vals = []
    let querf = []
    //let valsf = []
    let i = 1
    try{
        client = await connectionPool.connect()
        let query = ['UPDATE ers.reimbursements SET ']
        //let values = ['VALUES (']

        if(req.body.author !== undefined){
            query.push(`author = $${i}`)
            //values.push(`$${i}`)
            vals.push(req.body.author)
            i = i+1
        }
        if(req.body.amount !== undefined){
            query.push(`amount = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.amount)
            i = i+1
        }
        if(req.body.submit !== undefined){
            query.push(`submit = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.submit)
            i = i+1
        }
        if(req.body.resolved !== undefined){
            query.push(`resolved = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.resolved)
            i = i+1
        }
        if(req.body.description !== undefined){
            query.push(`description = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.description)
            i = i+1
        }
        if(req.body.resolver !== undefined){
            query.push(`resolver = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.resolver)
            i = i+1
        }
        if(req.body.status !== undefined){
            query.push(`status = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.status)
            i = i+1
        }
        if(req.body.reimbursement_type !== undefined){
            query.push(`reimbursement_type = $${i}`)
            // values.push(`$${i}`)
            vals.push(req.body.reimbursement_type)
            i = i+1
        }
        query.push(`WHERE reimbursement_id = $${i} RETURNING *`)
        //query.push(`)`)
        //values.push(`)`)
        vals.push(rid)

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
        //console.log(values.join(', '))
        // let value1 = values.splice(0,1)
        // console.log(values)
        // let value2 = values.splice(0, values.length-1)
        // console.log(value2)
        // let val = value1.join(' ')
        // let val2 = value2.join(', ')
        // valsf.push(val)
        // valsf.push(val2)
        // valsf.push(values)
        // query.push(valsf.join(' '))
        console.log(query.join(' '))
        console.log(vals)
        //console.log(query.join(' '))
        



        let result = await client.query(query.join(' '), vals)
        let ret = result.rows.map(sqlReimbursementtojsReimbursement)


        return ret
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