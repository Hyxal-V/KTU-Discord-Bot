import puppeteer from 'puppeteer';
import storage from 'node-persist';

async function getData() {
    let elementsToPost = [];
    let elements = [];

    await storage.init(); 

    const browser = await puppeteer.launch({ headless: true });  
    const page = await browser.newPage();
    await page.goto('https://ktu.edu.in/academics/notification');

    const rawElements = await page.$$('h6.f-w-bold');

    // Finds all h6 tagged componenets ,appends to elements 
    for (let element of rawElements) {
        const text = await element.evaluate(el => el.innerText);  
        elements.push(text);
    }

    await browser.close();

    
    let oldElement = await storage.getItem('last');  

    if (oldElement !== elements[0]) {
        console.log("New announcements found!");

        // Loop through new elements until the old element is found
        for (let el of elements) {
            if (el !== oldElement) {
                elementsToPost.push(el);
            } else {
                break;
            }
        }

        
        await storage.setItem('last', elements[0]);
    } else {
        console.log("No new announcements.");
    }

    return elementsToPost;
}

export default getData;
