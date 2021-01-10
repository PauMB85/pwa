function sumarUno( numero ){

    const promesa = new Promise( function(resolve, reject) {

        console.log(numero);
        if( numero >= 7) {
            reject('El numero es muy alto');
        }

        setTimeout( function () {
            resolve(numero +1);
        }, 800);

    });

    return promesa;
}


sumarUno(5)
    .then( sumarUno )
    .then( sumarUno )
    .then( nuevoNumero => console.log(nuevoNumero) )
    .catch( error => {
        console.log('ERROR en las promesas');
        console.log(error);
    })
