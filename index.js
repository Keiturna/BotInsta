const ig = require('./instagram');

const index = async ()=>{
    await ig.initialize();
    
    await ig.login();
}


index().then(value=>{
    console.log(value);
})