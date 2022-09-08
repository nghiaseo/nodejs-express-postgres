const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const db = require('./appPool')
const app = express()
const port = 3000
const swaggerDoc = {  
    swaggerDefinition: {  
        openapi:'3.0.0',
        info: {  
            title:'Employee API',  
            version:'1.0.0'  
        }  
    },  
    apis:['index.js'],  
}  
const specs = swaggerJsdoc(swaggerDoc)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,resp)=>{
    resp.json({info:'CRUD with express and PostgresSQL'})
})
app.get('/user',db.getAllUser)
app.get('/user/:id',db.getUser)
app.post('/',db.createUser)

app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})