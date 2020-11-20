  miStorage = window.localStorage;
  localStorage.setItem('miAgrBoton', 'carrito');
   var butn = localStorage.getItem('miAgrBoton');
 
 window.onload = function () {
      
            // Los Productos /////////
            let baseDeDatos = [   ////// let me ayuda a definir una variable global en las funciones 
                {
                    id: 1,
                    nombre: 'Leche',
                    precio: 14.00,
                    imagen: 'img/lacteo.jpg'
                },
                {
                    id: 2,
                    nombre: 'Carne',
                    precio: 32.00,
                    imagen: 'img/carne.jpg'
                },
                {
                    id: 3,
                    nombre: 'Huevos',
                    precio: 18.00,
                    imagen: 'img/huevos.jpg'
                },
                {
                    id: 4,
                    nombre: 'Frijol',
                    precio: 4.00,
                    imagen: 'img/frijol.jpg'
                },
                {
                    id: 5,
                    nombre: 'Cereal',
                    precio: 20.00,
                    imagen: 'img/cereal.jpg'
                },
                {
                    id: 6,
                    nombre: 'Azucar',
                    precio: 15.00,
                    imagen: 'img/azucar.jpg'
                }       
               

            ]
            
            let $items = document.querySelector('#items');
            let carrito = [];   let total = 0;
            let $carrito = document.querySelector('#carrito');
            let $total = document.querySelector('#total');
            let $botonVaciar = document.querySelector('#boton-vaciar');

            // FUNCIONES//////////////////
            function devolverItems() {
                for (let info of baseDeDatos) {
                    
                    // Estructura//////////
                    let miDiv = document.createElement('div');
                    miDiv.classList.add('card', 'col-sm-4');
                     // Titulo
                    let miTitle = document.createElement('h5');
                    miTitle.classList.add('card-title');
                    miTitle.textContent = info['nombre'];
                    
                    // Body/////////
                    let miCardBody = document.createElement('div');
                    miCardBody.classList.add('card-body');
                   
                    // Imagen///////////
                    let miImagen = document.createElement('img');
                    miImagen.classList.add('img-thumbnail');///crea un recuadro a las imagenes de productos
                    miImagen.setAttribute('src', info['imagen']);
                    
                    // Precio///////////
                    let miPrecio = document.createElement('p');
                    miPrecio.classList.add('card-text');
                    miPrecio.textContent = info['precio'] + 'Q';
                    
                    // Boton 
                    let miAgrBoton = document.createElement('button');
                    miAgrBoton.classList.add('btn', 'btn-primary');
                    miAgrBoton.textContent = 'Agregar';
                    miAgrBoton.setAttribute('marcador', info['id']);
                    miAgrBoton.addEventListener('click', agregaralCarrito);
                    
                    // Insertamos
                    miCardBody.appendChild(miImagen);
                    miCardBody.appendChild(miTitle);
                    miCardBody.appendChild(miPrecio);
                    miCardBody.appendChild(miAgrBoton);
                    miDiv.appendChild(miCardBody);
                    $items.appendChild(miDiv);
                }
            }

            function agregaralCarrito () {
                // agregamos al carrito
                carrito.push(this.getAttribute('marcador'))
                // Calculo el total
                calcularTotal();
                devolverCarrito();
            }

            function devolverCarrito() {
                // Vaciamos todo 
                $carrito.textContent = '';
                // Quitamos los duplicados
                let carritoSinDuplicados = [...new Set(carrito)];
                // Generamos los Nodos a partir de carrito
                carritoSinDuplicados.forEach(function (item, indice) {
                    
                    // Obtenemos el item que necesitamos de la variable base de datos
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    
                    // Va contando el número de veces que se repite el producto que tengo
                    let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                        return itemId === item ? total += 1 : total;
                    }, 0);
                    // Crear el item del carrito
                    let miDiv = document.createElement('li');
                    miDiv.classList.add('list-group-item', 'text-right', 'mx-2');
                    miDiv.textContent = `${numeroUnidadesItem} ${miItem[0]['nombre']} -> ${miItem[0]['precio']}Q`;
                    
                    // Boton que borra los productos que tengo en el carrito
                    let miBoton = document.createElement('button');
                    miBoton.classList.add('btn', 'btn-vacarrito', 'mx-4');
                    miBoton.textContent = 'Quitar';
                    miBoton.style.marginLeft = '1rem';
                    miBoton.setAttribute('item', item);
                    miBoton.addEventListener('click', borrarItemCarrito);
                    
                    miDiv.appendChild(miBoton);
                    $carrito.appendChild(miDiv);
                })
            }

            function borrarItemCarrito() {
                console.log()
                // Obtenemos el producto ID que tenemos en el boton en el boton ///////////////////
                let id = this.getAttribute('item');
                // Borramos todos los productos 
                carrito = carrito.filter(function (carritoId) {
                    return carritoId !== id;
                });
                
                devolverCarrito();
                // Calcular  de nuevo el precio del producto//////////
                calcularTotal();
            }

            function calcularTotal() {
                // Limpiamos el precia que teniamos anteriormente////////
                total = 0;
                // se recorre el array del carrito//////////////////
                for (let item of carrito) {
                    
                    // De cada producto se obtiene su precio
                    let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                        return itemBaseDatos['id'] == item;
                    });
                    total = total + miItem[0]['precio'];
                }
                // borramos el total para que solo tenga dos decimales
                let totalDosDecimales = total.toFixed(2);
                //devolvemos  el precio //////////
                $total.textContent = totalDosDecimales;
            }

            function vaciarCarrito() {
                // LAyuda a limpiar los productos que se guardaron en el carrito
                carrito = [];
                // se devuelven  los cambios
                devolverCarrito();
                calcularTotal();
            }

            $botonVaciar.addEventListener('click', vaciarCarrito);// Evento del boton

           
            devolverItems();
        } 

