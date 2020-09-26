const express = require('express')

const app = express()

var port = process.env.PORT || 8080

app.get('/',async (req, res)=>{
    const wordTranslat = req.query.wordTranslate

    res.send(wordTranslat)
})

app.listen(port)