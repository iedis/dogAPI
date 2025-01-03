fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        const imgUrl = data.message;
        const img = new Image();
        img.src = imgUrl;
        img.onload = function(){
            const canvas = document.getElementById('doggy');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(-1,1);
            ctx.drawImage(img, -canvas.width,0,canvas.width, canvas.height);
            ctx.restore();
        }

    })

