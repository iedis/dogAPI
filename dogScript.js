//declare the img variable to use in mirroring functions
let imgUrl;
let img;
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
let start1, start2;
let timeTaken1, timeTaken2;
//function to mirror the image vartically
async function VerticalMirror(){
    const canvas = document.getElementById('doggy');
    const ctx = canvas.getContext('2d');
    //undo the first mirror of the image
    if(ok){
        start1 = Date.now();
        setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        ok = false;
        timeTaken1 = Date.now() - start1;
        DisplayTimeTaken();}, 1000);
        
    }
    //mirror the image again
    else {
        start2 = Date.now();
        setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(img, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        ok = true;
        timeTaken2 = Date.now() - start2;
        DisplayTimeTaken();},1000);
        
    }
}
//function to horizontally mirror the image
var ok2 = true;
let start3, start4;
let timeTaken3, timeTaken4;
async function HorizontalMirror(){
    //mirror the image
    if(ok2) {
        start3 = Date.now();
        setTimeout(function(){
        const canvas = document.getElementById('doggy');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(1,-1);
        ctx.drawImage(img, 0, -canvas.height,canvas.width, canvas.height);
        ctx.restore();
        ok2 = false;
        timeTaken3 = Date.now() - start3;
        DisplayTimeTaken();},
        1000);
        
    }
    //undo the mirroring
    else {
        start4 = Date.now();
        setTimeout(function(){
            const canvas = document.getElementById('doggy');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
            ctx.restore();
            ok2 = true;
            timeTaken4 = Date.now() - start4;
            DisplayTimeTaken();},
            1000);
            
    }
}
//function to display time taken for all 4 processes
function DisplayTimeTaken() {
    let outputText = `Time taken for each process:`;
    if(timeTaken1) {
        outputText += `<br>Time taken for process 1 (Reverting the original vertical mirror): ${timeTaken1} ms`;
    }
    if(timeTaken2) {
        outputText += `<br>Time taken for process 2 (Vertically mirroring): ${timeTaken2} ms`;
    }
    if(timeTaken3) {
        outputText += `<br>Time taken for process 3 (Horizontally mirroring): ${timeTaken3} ms`;
    }if(timeTaken4) {
        outputText += `<br>Time taken for process 4 (Undoing the horizontal mirroring): ${timeTaken4} ms`;
    }
    document.getElementById("timeDisplay").innerHTML = outputText;
}
