// url  --> https://reqres.in/api/users
// metodos --> GET

fetch('https://reqres.in/api/users')
    .then(resp => resp.json())
    .then(console.log);