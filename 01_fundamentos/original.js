// Tarea sobre promesas y fetch
// Realice resolución de cada ejercicio,

// compruebe el resultado en la consola y posteriormente
// siga con el siguiente.

// Comente TODO el código del ejercicio anterior
// antes de continuar con el siguiente.

// ==============================================
// Ejercicio #1
// ==============================================
/*
 Realizar un llamado FETCH a la siguiente API
 https://swapi.dev/api/people/1/
 Imprima en consola el nombre y género de la persona.
*/

// Resolución de la tarea #1

fetch('https://swapi.dev/api/people/1/')
    .then( data => data.json())
    .then(usuario => {
        console.log('el nombre es: ', usuario.name);
        console.log('el género es: ', usuario.gender);
    })
    .catch(error => console.log(error));



// ==============================================
// Ejercicio #2
// ==============================================
/*
 Similar al ejercicio anterior... haga un llamado a la misma api
 (puede reutilizar el código )
 https://swapi.dev/api/people/1/
 
 Pero con el nombre y el género, haga un posteo
 POST a: https://reqres.in/api/users

 Imprima en consola el objeto y asegúrese que tenga
 el ID y la fecha de creación del objeto
*/

const user = fetch('https://swapi.dev/api/people/1/')
    .then( data => data.json())
    .then(usuario => {
        console.log('el nombre es: ', usuario.name);
        console.log('el género es: ', usuario.gender);
        return {
            name: usuario.name,
            gender: usuario.gender
        };
    })
    .catch(error => console.log(error));

user.then(usuario => {
    return fetch('https://reqres.in/api/users',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    
})
    .then(data => data.json())
    .then(console.log)
    .catch(error => {
        console.log(error);
    })

// Resolución de la tarea #2





