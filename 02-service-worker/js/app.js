
//comprobamos si podemos usar SW
if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js');
}