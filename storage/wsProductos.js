const showProducts = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4002/producto");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){
            let categorias = await fetch(`http://localhost:4002/categoria/${data[res].categoriaId}`);
            const categoria = await categorias.json();

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].producto}</td>
                <td>${data[res].descripcion}</td>
                <td>${categoria.categoria}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="btnEliminar">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="btnEditarProducto">Editar</button>
                </td>
            </tr>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const productoIndividual = async(id)=>{
    try{
        let respuesta = await fetch(`http://localhost:4002/producto/${id}`);
        const data = await respuesta.json();
        return data
    }catch(e){
        return "Error => "+e;
    }
}

const dropProducto = async(id)=>{
    try{
        let config={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        };
        
        let respuesta = await fetch(`http://localhost:4002/producto/${id}`,config);
        const data = await respuesta.json();

        return data
    }catch(e){
        return e
    }
}
const editarProducto = async(data2)=>{
    try{
        let config={
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4002/producto/${data2.id}`,config);
        const data = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const addProductos= async(datos)=>{
    try{
        let config={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(datos)
        };
        
        let respuesta = await fetch(`http://localhost:4002/producto/`,config);
        const data = await respuesta.json();
        return data

    }catch(e){
        return e
    }
}
const showCategorias = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4002/categoria");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){

            plantilla +=
            `
            <option value="${data[res].id}">${data[res].categoria}</option>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const buscarProductos = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4002/producto?producto_like=${palabra}`);
        const data = await respuesta.json();
        for(const dat in data){
            
            let categorias = await fetch(`http://localhost:4002/categoria/${data[dat].categoriaId}`);
            const categoria = await categorias.json();

            plantilla +=
            `
            <tr>
                <th scope="row">${data[dat].id}</th>
                <td>${data[dat].producto}</td>
                <td>${data[dat].descripcion}</td>
                <td>${categoria.categoria}</td>
                <td>
                    <button href="#" id='${data[dat].id}' class="btnEliminar">Eliminar</button>
                    <button href="#" id='${data[dat].id}' class="btnEditarProducto">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}

self.addEventListener('message', async function(event){
    let data = "";
    switch(event.data.type){
        case "agregar":
            data = await addProductos(event.data.data);
            break;
        case "mostrar":
            data = await showProducts();
            break;
        case "eliminar":
            data = await dropProducto(event.data.idProdu);
        break;
        case "showProducto":
            data = await productoIndividual(event.data.idProdu);
            break;
        case "editarProducto":
            data = await editarProducto(event.data.data);
        break;
        case "showCategorias":
            data = await showCategorias();
        break; 
        case "buscarProductos":
            data = await buscarProductos(event.data.data);
        break; 
    }

    self.postMessage(data);
})