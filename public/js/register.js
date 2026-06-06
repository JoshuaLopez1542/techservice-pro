const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nombre = document.getElementById('nombre').value;

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    const { data, error } = await client.auth.signUp({
        email,
        password
    });

    console.log(data);

    console.log(error);

    if(error){

        console.log(error.message);

        alert(error.message);

        return;
    }

    alert('Cuenta creada correctamente');

});