const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/img/main.jpg',
    '/img/no-img.jpg',
    '/js/app.js'
];

const APP_STATIC = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
];

const CACHE_NAME = 'cache-v2';
const CACHE_DYNAMIC = 'cache-v1-dynamic';
const CACHE_STATIC = 'cache-v1-static';


self.addEventListener('install', e => {

    const cache_shell = caches.open(CACHE_NAME)
        .then( cache => cache.addAll(APP_SHELL));

    const cache_static = caches.open(CACHE_STATIC)
        .then( cache => cache.addAll(APP_STATIC));

    const waitCache = Promise.all([cache_shell,cache_static]);

    e.waitUntil(waitCache);

});


// Las estrategias de caché se realizan en el evento fetch
self.addEventListener('fetch', e => {

    //1.- Cache only
    //e.respondWith( caches.match(e.request));

    //2.- Cache with network fallback
    // const respuesta = caches.match( e.request )
    //     .then( res => {

    //         //existe el recurso que nos piden
    //         if(res) return res;

    //         //No existe el recurso
    //         //hay que llamar a la web
    //         return fetch( e.request )
    //             .then( newResp => {
    //                 caches.open(CACHE_DYNAMIC).then(cache => {
    //                     cache.put(e.request, newResp)
    //                 });
    //                 return newResp.clone();
    //             });

    //     });

    // 3.- Network with cache fallback
    // const respuesta = fetch( e.request)
    //     .then( res => {
    //         caches.open(CACHE_DYNAMIC)
    //             .then( cache => {
    //                 cache.put(e.request, res);
    //             });
    //         return res.clone();
    //     }).catch( err => {
    //         return caches.match( e.request );
    //     });

    // 4.- Cache with network update
    // rendimiento es muy importante
    // siempre se muestra un paso atrás
    // const respuesta = caches.open(CACHE_NAME).then( cache => {

    //         //elementos bootstrap
    //         if(e.request.url.includes('bootstrap')) {
    //             return caches.match(e.request);
    //         }

    //         // 1.- obtenemos el recuros y se almacena en la cache el resultado
    //         fetch(e.request).then( newResp => cache.put(e.request, newResp));

    //         //2.- enviamos al front lo que tenemos guardado en cache.
    //         return cache.match( e.request );
    //     });

    // 5.- Cache & network race, se muestra el primero que llegue.
    const respuesta = new Promise( (resolve, reject) => {

        let rechazada = false;

        //en este caso suponemos que no se encuentra un img y cargamos la 'por defecto'
        const falloUnaVez = () => {
            if(rechazada) {
                
                if( /\.(png|jpg)$/i.test( e.request.url )){
                    resolve( caches.match('/img/no-img.jpg'));
                } else {
                    reject('No se enctro una respuesta...');
                }

            } else {
                rechazada = true;
            }
        };

        fetch(e.request).then( res => {
            res.ok ? resolve(res): falloUnaVez();
        }).catch( falloUnaVez );

        caches.match(e.request).then( res => {
            res ? resolve( res ): falloUnaVez();
        }).catch( falloUnaVez );

    });

    e.respondWith( respuesta );



});