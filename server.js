const express = require('express')
const languages = require('fs').readFileSync('ISO6391', 'utf8').split('\n')
const Translate = require('./translate')

var browser
var port = process.env.PORT || 8080
const app = express()

;(async ()=>{
    browser = await new Translate
    await browser.start()
})()

app.get('/',async (req, res)=>{
    const word  = req.query.word
    const lang  = req.query.lang
    if(word == null || lang == null){
        return res.json({"error":"Define lang and word as query params."})
    }
    //const translated = await translate(lang, word)
    res.json({"translate":word,"lang":lang,"translated":translated})
})

async function translate(lang, word){
    await browser.setLanguage(lang)
    const translated = await browser.translate(word)
    return translated
}

app.listen(port);