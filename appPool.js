const Pool = require('pg').Pool
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'1',
    database:'demo',
    port:5432
})
const getAllUser = (req,resp)=>{
    pool.query('SELECT * FROM users ORDER BY id ASC',(err,res)=>{
        if(err) throw err
        resp.status(200).json(res.rows)
    })
}
const getUser = (req,resp)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1',[id],
    (err,res)=>{
        if(err) throw err
        resp.status(200).json(res.rows)
    })
}
const createUser = (req,resp)=>{
    const {username,password} = req.body
    pool.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *',
    [username,password],
    (err,res)=>{
        if(err) throw err
        resp.status(201).send(`User add with id ${res.rows[0].id}`)
    })
}
module.exports = {
    getAllUser,getUser,createUser
}