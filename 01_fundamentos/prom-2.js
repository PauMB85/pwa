

function sumarLento( numero ){
    return new Promise(function(resolve, reject){
        setTimeout( function (){
            resolve(numero + 1);
        }, 800);
    });
}

const sumarRapido = numero => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve( numero + 1)
        }, 300);
    });
}

const promesas = [sumarLento(5), sumarRapido(10), 'hola mundo', 100000000]


Promise.all(promesas)
    .then(respuestas => {
        console.log(respuestas);
    })
    .catch(error => {
        console.log(error);
    })
//sumarLento(5).then(console.log);
//sumarRapido(10).then(console.log);