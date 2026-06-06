const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });

    console.log(data);

    console.log(error);

    if(error){

        alert(error.message);

        return;
    }

    localStorage.setItem(
        'token',
        data.session.access_token
    );

    alert('Login exitoso');

    window.location.href = 'index.html';

});