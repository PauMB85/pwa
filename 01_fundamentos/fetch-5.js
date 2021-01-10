fetch('https://reqres.in/api/users/1000')
    .then( resp => {
        if( resp.ok ){
            return resp.json();
        } else {
            throw new Error ('No existe el usuario 10000')
        }
    })
    .then( console.log )
    .catch( error => {
        console.log('Error en la peticion');
        console.log(error);
    });