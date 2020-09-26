const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.json({"cavalo":"opa"})
})

app.listen(3001)