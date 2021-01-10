

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}


// Recordar que cache siempre devuelve promesas
/* if(window.caches) {
    caches.open('prueba-1')


    caches.open('cache-v1.1').then( cache => {
        //cache.add('/index.html');

        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then(() => {
            //cache.delete('/css/style.css');

            //sustituir un elemento de la cache
            cache.put('/index.html', new Response('Hola Mundo'));
        });

        //leer un archivo
        // busca en todas las caches de un mismo dominio.
        /* cache.match('/index.html')
            .then( resp => {
                resp.text().then( console.log )
            }); */
    //});

    //devuelve todas las caches que existen
    //caches.keys().then( console.log );
//} */