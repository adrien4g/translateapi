const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    const jsona = {
        "cavalo":"tendi vadia",
        "nude":"agora"
    }
    res.json(jsona.cavalo)
})

app.listen(3001)