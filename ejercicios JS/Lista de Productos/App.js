class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}
/*Case del producto, como se van a ver dentro de la aplicación*/

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        /*Se coge para acceder al col-8 y se guarda en una constante*/
        const element = document.createElement('div');
        /*Se va crear un div donde esté el producto creado*/
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div><strong>Nombre</strong>: ${product.name}</div>
                    <div><strong>Precio</strong>: ${product.price}</div>
                    <div><strong>Año</strong>: ${product.year}</div>
                    <a href='#' class="btn btn-danger" name="delete">Borrar</a>
                </div>
            </div>
        `;
        /*innerHTML = añadir elemento html*/
        productList.appendChild(element)
        /*a productList se le va a añadir un producto hijo*/
        
    }
    /*Hará que se añada y vea en pantalla*/

    resetForm() {
        document.getElementById('product-form').reset();
    }
    /*Metodo para resetear formulario*/

    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove()
            /*Si element tiene una propiedad llamada name y es igual a delete es que le ha clicado en el enlace, por lo tanto se accede al padre principal y se borra*/
            this.showMessage('Producto eliminado satisfactoriamente', 'info')
            /*Porque esta dentro de la misma clase*/
        }
    }

    showMessage(message, cssClass) {
        /*Se le añade el mensaje y la clase de Bootstrap*/
        const div = document.createElement ("div");
        div.className = `alert alert-${cssClass} mt-2`;
        /*Para agregarle clases al DIV, con bootstrap*/
        div.appendChild(document.createTextNode(message));
        /*Dentro del div se le añade el mensaje*/
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        /*Insertar el mensaje antes de app en el container*/
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
        /*Cuando pasa el tiempo todos los mensajes de bootstrap de alerta se van*/
    }
}
/*Esta clase va a estar interactuando con el html en col-8*/

//DOM EVENTS

document.getElementById('product-form')
/*Coge lo que hay dentro */
    .addEventListener('submit', function(e) {
        /*Cuando se hace el submit recoge lo siguiente*/
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name,price,year)
        /*Crea un nuevo objeto con la estructura del "Producto". Y lo guarda en una constante*/

        const ui = new UI();

        if(name === '' || price === '' || year === '') {
            ui.showMessage('Por favor, completa los campos', 'danger');
        } else {
        ui.addProduct(product);
        /*Crea un nuevo objeto para la interfaz, recogiendo la instancia de addProduct y añadiendole la constante anterior*/
        ui.resetForm();

        ui.showMessage('Producto agregado satisfactoriamente', 'success');
        }
        e.preventDefault();
        /*(e)-> elemento. Evita el refresco de la pagina, o sea el comportamiento que hace el formulario de base, ojo en la funcion anterior*/
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    /*Se le pasa una instancia de la interfaz*/ 
    ui.deleteProduct(e.target);
    /*Comprueba el enlace exacto donde hace click el usuario*/
});
/*Captura el evento del delete*/