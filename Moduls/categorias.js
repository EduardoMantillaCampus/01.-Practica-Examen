export default {
    
    showCategorias(){
        let plantilla = 
        `
        <div class="cont_tablas">
        <h2>Lista de categorias</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="dataCategorias">
                </tbody>
            </table>
        </div>
        `;

        document.querySelector("#categorias").insertAdjacentHTML("beforeend",plantilla)

        function showProducts(){
            const worker = new Worker("./storage/wsCategorias.js")
            worker.postMessage({"a":15});
            worker.onmessage = function(event){
                document.querySelector("#dataCategorias").insertAdjacentHTML("beforeend",event.data)
            }        
        }
        
        showProducts();
    }
}