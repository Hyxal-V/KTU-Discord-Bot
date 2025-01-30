const puppeteer = require('puppeteer');
const storage = require('node-persist');

async function getData() {
sentElements = []
elements = []
  const browser = await puppeteer.launch({ headless: true });  
  const page = await browser.newPage();
  await page.goto('https://ktu.edu.in/academics/notification');
  Unproccesedelements=  await page.$$('h6.f-w-bold')
  for (let element of Unproccesedelements) {
    const text = await element.evaluate(el => el.innerText);  
    await elements.push(text)
}
  await browser.close();
     pastElement= await storage.getItem('last')
  
     if(pastElement!= elements[0]){
     console.log("nowdefined")
     for(let el of elements){
            if(el !=pastElement){
                sentElements.push(el)
            }else{
                break
            }
     }
     storage.setItem('last', elements[0]);
  
     }else{
     newElement= storage.getItem('last')
     console.log("Already Build")
    
}

  
     return sentElements
}


module.exports = {getData}