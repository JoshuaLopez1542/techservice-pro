let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarCarrito(nombre, precio, imagen = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'){

    carrito.push({
        nombre,
        precio,
        imagen
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert('Producto agregado al carrito');
}

function mostrarCarrito(){

    const container = document.getElementById('carrito-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if(!container) return;

    container.innerHTML = '';

    let total = 0;

    if(carrito.length === 0){

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega tus sneakers favoritas para continuar.</p>
                <a href="productos.html">Ver productos</a>
            </div>
        `;

        subtotalElement.textContent = '$0 MXN';
        totalElement.textContent = '$0 MXN';

        return;
    }

    carrito.forEach((producto, index) => {

        total += Number(producto.precio);

        container.innerHTML += `
            <div class="cart-product">
                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div class="cart-product-info">
                    <h3>${producto.nombre}</h3>
                    <p>Producto premium SneakerStore</p>
                    <span>$${producto.precio} MXN</span>
                </div>

                <button onclick="eliminarProducto(${index})" class="delete-btn">
                    Eliminar
                </button>
            </div>
        `;
    });

    subtotalElement.textContent = `$${total} MXN`;
    totalElement.textContent = `$${total} MXN`;
}

function eliminarProducto(index){

    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}

async function checkout(){

    if(carrito.length === 0){
        alert('Tu cotización está vacía');
        return;
    }

    try{
        const response = await fetch('/crear-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrito })
        });

        const data = await response.json();

        console.log(data);

        if(data.url){
            window.location.href = data.url;
        }else{
            alert(data.error || 'Error al iniciar pago');
        }

    }catch(error){
        console.error(error);
        alert('No se pudo conectar con el servidor de pago');
    }
}

mostrarCarrito();