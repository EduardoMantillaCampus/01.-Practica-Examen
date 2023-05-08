export default {
    
    showProductos(){
        let plantilla = 
        `
        <div class="cont_tablas">
        <h2>Lista de productos</h2>
        <div class="filtros">
            <input value="" name="buscar" placeholder="Buscar por producto" id="inputBuscarProducto"/>            
        </div>
            <table class="table" id="tabla-productos">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="dataProductos">
                </tbody>
            </table>

        <div class="editarProducto">
            <form id="edit_producto">
                <input type="hidden" name="id" id="produc_id">
                <input type="text" name="producto" id="produc_nombre">
                <input type="text" name="descripcion" id="produc_descripcion">
                <input type="text" name="categoriaId" id="produc_categoria">
                <button class="btn btn-primary" id="edit_producto" type="submit">Enviar</button>
            </form>
        </div>
        <my-registrar></my-registrar>
        </div>
        `;

        document.querySelector("#productos").insertAdjacentHTML("beforeend",plantilla);

        const worker = new Worker("./storage/wsProductos.js")

        worker.postMessage({"type":"mostrar"});
        
        worker.onmessage = function(event){
            document.querySelector("#dataProductos").insertAdjacentHTML("beforeend",event.data);
            //dropProducto();
            //editProducto(); 
            //buscarProducto();
        }        
        

        function dropProducto(){
            let btnEliminarProducto = document.querySelectorAll(".btnEliminar");
            btnEliminarProducto.forEach(element =>{
                    element.addEventListener('click', (event)=>{

                        let idProducto=event.target.getAttribute("id");
                        const confirma=confirm("Deseas eliminar?");
                        if(confirma){
                        worker.postMessage({"type":"eliminar","idProdu":idProducto});
                        worker.onmessage = function(event){
                            console.log(event.data);
                        }} 
                        
                })
            })     
        }

        /*function editProducto(){
            let btnEditar = document.querySelectorAll(".btnEditarProducto");
    
            btnEditar.forEach(element =>{
                element.addEventListener('click', (event)=>{

                    let idProducto=event.target.getAttribute("id");
                
                    worker.postMessage({"type":"showProducto","idProdu":idProducto});
                    worker.onmessage = function(event){
        
                        let producto = document.querySelector("#produc_nombre");
                        let descripcion = document.querySelector("#produc_descripcion");
                        let categoria = document.querySelector("#produc_categoria");
                        let id = document.querySelector("#produc_id");

                        producto.value=event.data.producto
                        descripcion.value=event.data.descripcion
                        categoria.value=event.data.categoriaId
                        id.value = event.data.id

                    }    
                })
            })   
        }*/

        document.querySelector("#edit_producto").addEventListener("submit", (e)=>{
            let data = Object.fromEntries(new FormData(e.target))
            
            worker.postMessage({"type":"editarProducto","data":data});
            worker.onmessage = function(event){
                console.log("Respuesta => ", event.data)
            }
            e.preventDefault();
        })

 
        document.querySelector("#tabla-productos").addEventListener('click', (e)=>{
            if (e.target.matches('.btnEditarProducto')) {
                let idProducto=e.target.id;
                
                worker.postMessage({"type":"showProducto","idProdu":idProducto});
                worker.onmessage = function(event){
    
                    let producto = document.querySelector("#produc_nombre");
                    let descripcion = document.querySelector("#produc_descripcion");
                    let categoria = document.querySelector("#produc_categoria");
                    let id = document.querySelector("#produc_id");

                    producto.value=event.data.producto
                    descripcion.value=event.data.descripcion
                    categoria.value=event.data.categoriaId
                    id.value = event.data.id

                }     
            } else if (e.target.matches('.btnEliminar')) {
                let idProducto=e.target.id;
                const confirma=confirm("Deseas eliminar?");
                if(confirma){
                worker.postMessage({"type":"eliminar","idProdu":idProducto});
                worker.onmessage = function(event){
                    console.log(event.data);
                }}
            }
        })
        

       
        document.querySelector("#inputBuscarProducto").addEventListener("input", (e)=>{            
            const worker = new Worker("./storage/wsProductos.js")
            worker.postMessage({"type":"buscarProductos","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#dataProductos").innerHTML=event.data;
            }        
        })
        
        
    }

}