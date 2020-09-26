class Translate{
    constructor(){
        //System
        this.puppeteer = require('puppeteer')

        this.languages = require('fs').readFileSync('ISO6391', 'utf8').split('\n')

        this.browser
        this.page
        this.link

        this.selectedLanguage

        this.input = ''
        this.lastInput = ''
        this.output = ''
        
}

    async setLanguage(lang){
        this.link = `https://translate.google.com/#view=home&op=translate&sl=auto&tl=${lang}`
        await this.page.goto(this.link)
    }

    async start(){
        this.browser = await this.puppeteer.launch({
            'args' : [
              '--no-sandbox',
              '--disable-setuid-sandbox'
            ]
          })
        this.page = await this.browser.newPage()
        
        
    }
    async translate(msg){
        if (msg.toLowerCase().trim() == this.lastInput.toLowerCase().trim()){
            return this.output
        }
        await this.page.waitForSelector('#source')
        await this.page.evaluate((input)=>{document.querySelector('#source').value = input}, msg)
        await this.page.waitForSelector('.translation')
        this.output = await this.page.evaluate(()=>{return document.querySelector('.translation').innerText})
        await this.page.evaluate(()=>{document.querySelector('#source').value = ''})
        await this.page.waitForSelector('.translation', {hidden: true});
        return this.output
    }
}
module.exports = Translate
