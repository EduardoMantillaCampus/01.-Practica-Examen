export default {
    
    showVentas(){
        let plantilla = 
        `
        <div class="cont_tablas">
        <h2>Lista de Ventas</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Compra</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="dataVentas">
                </tbody>
            </table>
        </div>
        `;

        document.querySelector("#ventas").insertAdjacentHTML("beforeend",plantilla)

        function showProducts(){
            const worker = new Worker("./storage/wsVentas.js")
            worker.postMessage({"a":15});
            worker.onmessage = function(event){
                document.querySelector("#dataVentas").insertAdjacentHTML("beforeend",event.data)
            }        
        }
        
        showProducts();
    }
}