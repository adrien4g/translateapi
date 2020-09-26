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

console.log('acho que foi cu')
app.get('/',async (req, res)=>{
    const word  = req.query.word
    const lang  = req.query.lang
    const translated = await translate(lang, word)
    res.send(translated)
})

async function translate(lang, word){
    await browser.setLanguage(lang)
    const translated = await browser.translate(word)
    return translated
}

app.listen(port)