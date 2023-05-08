const consumoApi = async()=>{
    try{

        const respuesta = await fetch("http://localhost:4002/cliente");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){
            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].apellido}</td>
                <td>${data[res].edad}</td>
                <td>${data[res].documento}</td>
                <td>${data[res].genero}</td>
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