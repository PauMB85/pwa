importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CHACHE = 'inmutable-v1';

const APP_SHELL = [
    //'/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/style.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', e => {

    //almacenamos en cache
    const cacheStatic = caches.open( STATIC_CACHE ).then( cache => 
        cache.addAll(APP_SHELL)
    ); 

    const cacheInmutable = caches.open( INMUTABLE_CHACHE ).then( cache => 
        cache.addAll(APP_SHELL_INMUTABLE)
    );

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]))

});

self.addEventListener('activate', event => {

    //Eliminamos caches antiguas
    const keysCache = caches.keys().then( keys => {
        keys.forEach( key => {
            if(key !== DYNAMIC_CACHE && keys.includes('static')){
                return caches.delete(key);
            }
            if(key !== DYNAMIC_CACHE && keys.includes('dynamic')){
                return caches.delete(key);
            }
        });
    });

    event.waitUntil(keysCache);
});

//Polita de caches
self.addEventListener('fetch', event => {
    
    const respuesta = caches.match( event.request ).then(res => {

        if(res) {
            return res;
        } else {
            return fetch( event.request ).then( newResp => {

                return actualizarCacheDinamico(DYNAMIC_CACHE, event.request, newResp);

            });
        }


    });

    event.respondWith( respuesta );

});