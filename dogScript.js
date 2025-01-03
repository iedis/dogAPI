//declare the img variable to use in mirroring functions
let imgUrl;
let img;
//variables to hold current starting point
let dx = 0;
let dy = 0;
//fetch a random image from dog.ceo
fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        imgUrl = data.message;
        img = new Image();
        img.src = imgUrl;
        img.onload = async function (){
            let myPromise = new Promise(function(resolve){
                setTimeout(function(){
                const canvas = document.getElementById('doggy');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.scale(-1,1);
                ctx.drawImage(img, -canvas.width,0,canvas.width, canvas.height);
                ctx.restore();},
                5000);
            });
            document.getElementById("doggy").innerHTML = await myPromise;
        }
    })
var ok = true;
//function to mirror the image vartically
async function VerticalMirror(){
    const canvas = document.getElementById('doggy');
    const ctx = canvas.getContext('2d');
    //undo the first mirror of the image
    if(ok){
        setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();}, 1000);
        ok = false;
    }
    //mirror the image again
    else {
        setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(img, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();},1000);
        ok = true;
    }
}
//function to horizontally mirror the image
var ok2 = true;
async function HorizontalMirror(){
    //mirror the image
    if(ok2) {
        setTimeout(function(){
        const canvas = document.getElementById('doggy');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(1,-1);
        ctx.drawImage(img, 0, -canvas.height,canvas.width, canvas.height);
        ctx.restore();},
        1000);
        ok2 = false;
    }
    //undo the mirroring
    else {
        setTimeout(function(){
            const canvas = document.getElementById('doggy');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
            ctx.restore();},
            1000);
            ok2 = true;
    }
}
