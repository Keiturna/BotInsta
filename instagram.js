const puppeteer = require('puppeteer');

const BASE_URL = "https://www.instagram.com/";

let login = ''; // Pas de hack svp
let mdp = ''; // Pas de hack svp

const TAG_URL = "https://www.instagram.com/explore/tags/animememe";

//page.$x('//a[contains(text(),"Connectez-vous")]');

const instagram = {
    browser: null,
    page:null,

    initialize: async ()=>{
        const browser = await puppeteer.launch({headless:false, slowMo:50});
        const page = await browser.newPage();

        await page.goto(BASE_URL);
        await page.waitFor('body')
        await page.waitFor(1500)

        await page.click('a[href="/accounts/login/?source=auth_switcher"]');

        // await page.waitForNavigation({waitUntil:'networkidle2'})

        await page.waitFor('body');

        await page.focus('input[aria-label="Numéro de téléphone, nom d’utilisateur ou adresse e-mail"]');
        //await page.focus('input[name="username"]');
        await page.keyboard.type(login)

        await page.waitFor(200)
        //await page.focus('input[aria-label="Mot de passe"]');
        await page.focus('input[name="password"]');
        await page.keyboard.type(mdp)

        await page.click("button[type='submit']");

        //await page.waitFor('networkidle2');
        await page.waitForNavigation({waitUntil:'networkidle2'})

        try{
            await page.click("div[role='presentation'] > div > div > div:nth-child(3) > button:first-of-type");
        }catch{}

            await page.goto(TAG_URL)
            await page.waitFor('body')

        const result = await page.evaluate(() => {
            //let items = document.querySelector('main article > div > div > div > div');
            // Enlever > div le dernier si jamais trop loin
            // let items = Array.from(document.querySelector('main article > div > div > div > div').children);
            let items = document.querySelector('main article > div > div > div > div').childNodes
            let numberSearch = 3;
            let resultItem = [];
            let counter = 0;

            //for(let i = 0; i < numberSearch; i++){
            //  let item = items[i];

            //    await item.click();

            // await page.waitFor('span[id="react-root"]');
            //    await page.waitFor(1000);

            //    let isLikable = await item.$('span[aria-label="Like"]');

            //  if(isLikable){
            //        await post.click('span[aria-label="J’aime"]');
            //  }

            // await page.click('//button[contains(text(), "Fermer")]')

            //}
            //for(let pas = 0; pas < numberSearch; pas++){
            items.forEach(async (item)=>{

                // await page.waitForNavigation({waitUntil:'networkidle2'})

                counter++;
                //console.log(counter +"° - "+ item)
                await document.querySelector('main article > div > div > div > div > div:nth-child('+counter+') > a').click();

                //await page.click('main article > div > div > div > div > div:nth-child('+counter+') > a');
                await window.setTimeout(function(){
                    document.querySelector('span[aria-label="J’aime"]').click();
                }, 2000);
                //await document.waitFor(2000);

                // await document.querySelector('span[aria-label="J’aime"]').click();
                //await page.click('span[aria-label="J’aime"]');
                //await document.waitFor(1000);

                //document.$x("//td[text()='Fermer']");

                await window.setTimeout(function(){
                    var btnTags = document.getElementsByTagName("button");
                    var searchText = "Fermer";
                    var found;

                    for (var i = 0; i < btnTags.length; i++) {
                        if (btnTags[i].textContent == searchText) {
                            found = btnTags[i];
                            
                            break;
                        }
                    }
                    found.click();
// Maraboutage de l'extrème
                    //document.$x("//td[text()='Fermer']").click(); //document.querySelector("button:contains('Fermer')").click();
                }, 2500);

                //await page.click("button:contains('Fermer')")

                
                 await window.setTimeout(function(){
                    console.log("Post n°"+counter+" liké");
                }, 5000);
                


                //await item.querySelector('> div:nth-child('+counter+')')





                // item.click()
                //page.waitForNavigation({waitUntil:'networkidle2'})

                /*  try{
                    //page.click("div[role='presentation'] > div > div > div:nth-child(3) > button:first-of-type");
                    //console.log(item)
                    await item.click({ clickCount: 2 })
                    console.log("Liked photo "+counter);
                }catch{
                    console.log("Pas réussi à liker photo "+counter);
            }*/
                //page.waitForNavigation({waitUntil:'networkidle2'})
                //item.style.display = 'None';
                //resultItem.push({
                //lien : //item.querySelector("a").getAttribute('href')
                //})
            })
            return resultItem
        })
        //return console.log("Cc -");
        return result;
    },
    login: async () =>{
    },
}
module.exports=instagram;