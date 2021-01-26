
// indexedDB: Reforzamiento

const request = window.indexedDB.open('mi-database', 1);

// Se actualiza cuando se crea o se sube de version de la BBDD
request.onupgradeneeded = event => {

    console.log('Actualización BBDD');

    const db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });

}

//Control errores
request.onerror = event => {

    console.log('DB error: ', event.target.error);

}


//insertar datos
request.onsuccess = event => {

    const db = event.target.result;

    const heroresData = [
        {id: '111', heores: 'Spiderman', mensaje: 'Aquí su amigo Spiderman'},
        {id: '112', heores: 'Ironman', mensaje: 'Aquí en mi nuevo Mark 50'}
    ]

    const heroesTransaction = db.transaction('heroes', 'readwrite');

    //KO
    heroesTransaction.onerror = event => {
        console.log('Error guardado', event.target.error);
    }

    //OK
    heroesTransaction.oncomplete = event => {
        console.log('Transacción finalizada', event);
    }

    const heroesStore = heroesTransaction.objectStore('heroes');

    heroresData.forEach(heroe => {
        heroesStore.add(heroe);
    });

    heroesStore.onsuccess = event => {
        console.log('Nuevo elemento insertado en BBDD', event)
    }



}

