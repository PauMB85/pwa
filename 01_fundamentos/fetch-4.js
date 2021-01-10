
const img = document.querySelector('img');

fetch('./superman.png')
    .then( resp => resp.blob())
    .then( imagen => {
        const imgPath = URL.createObjectURL( imagen );
        img.src = imgPath;
    });