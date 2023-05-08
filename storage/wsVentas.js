const consumoApi = async()=>{
    try{
        const respuesta = await fetch("http://localhost:4002/venta");
        const data = await respuesta.json();
        let plantilla ="";

        for(const res in data){

            const respuestaCliente = await fetch('http://localhost:4002/cliente/'+data[res].idCliente);
            const dataCliente = await respuestaCliente.json();

            const respuestaProducto = await fetch('http://localhost:4002/producto/'+data[res].idProducto);
            const dataProducto = await respuestaProducto.json();
            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].codigo}</td>
                <td>${data[res].descripcion}</td>
                <td>${data[res].fechaCompra}</td>
                <td>${dataCliente.nombre}</td>
                <td>${dataProducto.producto}</td>
                <td>
                    <a href="#"><i class="fa-solid fa-trash"></i></a>
                    <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `;
        }

        return plantilla

    }catch(e){
        return "Error => "+e;
    }
}


self.addEventListener('message', async  function(event){
    let data = await consumoApi();
    self.postMessage(data);
})