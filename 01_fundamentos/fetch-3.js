// url  --> https://reqres.in/api/users
// metodos --> GET

const usuario = {
    nombre: 'Pau',
    edad: '35'
};

fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(resp => resp.json())
.then(console.log)
.catch(error => {
    console.log('Error en la peticón');
    console.log(error);
});

