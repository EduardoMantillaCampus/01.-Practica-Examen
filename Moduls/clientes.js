export default {
    
    showClientes(){
        let plantilla = 
        `
        <div class="cont_tablas">
        <h2>Lista de Clientes</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="dataClientes">
                </tbody>
            </table>
        </div>
        `;

        document.querySelector("#clientes").insertAdjacentHTML("beforeend",plantilla)

        function showClientes(){
            const worker = new Worker("./storage/wsClientes.js")
            worker.postMessage({"a":15});
            worker.onmessage = function(event){
                document.querySelector("#dataClientes").insertAdjacentHTML("beforeend",event.data)
            }        
        }
        
        showClientes();
    }
}