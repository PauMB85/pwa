
// Ciclo de vida del SW

//1.- install - primer ciclo ideal para descargar assets y crear cache
self.addEventListener('install', event => {

    //Descargar assets
    //Creamos una cache
    console.log('SW: Instalando...');

    //en el caso que la instalación tarde mucho y arranque otro evento(activate) debemos utilizar la
    // instrucción event.waitUntil()

    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('SW: Finalizamos instalaciones!');
            //solo usarlo para practicas, el nuevo SW se deberia instalar cuando el user abre un nuevo navegador.
            resolve();
        }, 1);
        
    });

    event.waitUntil(instalacion);
});

//2.- activate - cuando el SW tiene el control de la app, ideal para borrar la antigua cache
self.addEventListener('activate', event => {

    //borrar cachae

    console.log('SW: Activo y listo para controlar la app');
});


// fetch - manejamos peticiones HTTP
self.addEventListener('fetch', event => {

    //console.log(event.request.url);
    /*if( event.request.url.includes('https://reqres.in/')) {
        const resp = new Response(`
            {
                ok: false,
                mensaje: 'jajaja'
            }
        `);

        event.respondWith(resp);
    }*/

});

// sync - cuando recuperamos la conexión a internet
self.addEventListener('sync', event => {
    //console.log('tenemos conexión!');

    //console.log(event);

    //console.log(event.tag);
});

// push: - gestiones las notificaciones push

self.addEventListener('push', event =>  {

    console.log('SW: Notificacion recibida');

})


