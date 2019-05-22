import { Pool } from 'pg'

// console.log({
//     user: process.env['MUSIC_API_USERNAME'],
//     host: process.env['MUSIC_API_HOST'],
//     databae: process.env['MUSIC_API_DB_NAME'],
//     password: process.env['MUSIC_API_PASSWORD'],
//     port: 5432,
//     max: 5
// })


//we are going to use a connection pool to help manage our conneccton
//because making new connections is expensive (takes a long time)
//we configure a pool to make all the connects right away


//use environment variables
export const connectionPool = new Pool({
    user: process.env['MUSIC_API_USERNAME'],
    host: process.env['MUSIC_API_HOST'],
    database: process.env['MUSIC_API_DB_NAME'],
    password: process.env['MUSIC_API_PASSWORD'],
    port: 5432,
    max: 5

})