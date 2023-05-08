const consumoApi = async()=>{
    try{
        const respuesta = await fetch("http://localhost:4002/categoria");
        const data = await respuesta.json();
        let plantilla ="";

        for(const res in data){
            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].codigo}</td>
                <td>${data[res].categoria}</td>
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
