(() => {
  let canvas = document.getElementById('memeCanvas');
  let ctx = canvas.getContext('2d');
  let imageInput = document.getElementById('imageInput');
  let uploadedImage = null;

  imageInput.addEventListener('change', (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      let img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        uploadedImage = img;
        drawImage();
      };
    };

    reader.readAsDataURL(file);
  });

  function drawImage() {
    if(!uploadedImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    let topText = document.getElementById('topText').value;
    let bottomText = document.getElementById('bottomText').value;

    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }

  window.generateMeme = drawImage;

  window.downloadMeme = () => {
    let link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };
})();