const APP_SHELL = [
    '/',
    '/index.html',
    '/css/style.css',
    '/img/main.jpg',
    '/img/no-img.jpg',
    '/js/app.js',
    '/pages/offline.html'
];

const APP_STATIC = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
];

const CACHE_NAME = 'cache-v3-shell';
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

//
self.addEventListener('activate', e => {


    //borrarmos todas las caches distintas a la actual
    const respuesta = caches.keys().then( keys => {
        keys.forEach(key => {
            if( key !== CACHE_NAME && key.includes('shell')) {
                caches.delete(key);
            }
        })
    });

    e.waitUntil(respuesta);

});

// En la pruebas se utiliza la segunfa estrategia de cache --> Cache with Network fallback
self-addEventListener('fetch', e => {

    //2.- Cache with network fallback
    const respuesta = caches.match( e.request )
        .then( res => {

            //existe el recurso que nos piden
            if(res) return res;

            //No existe el recurso
            //hay que llamar a la web
            return fetch( e.request )
                .then( newResp => {
                    caches.open(CACHE_DYNAMIC).then(cache => {
                        cache.put(e.request, newResp)
                    });
                    return newResp.clone();
                }).catch( err => {

                    if(e.request.headers.get('accept').includes('text/html')){
                        return caches.match('/pages/offline.html')
                    }
                    
                });

        });

    e.respondWith( respuesta );
});