export default{
    showBody(){
        let plantilla=
        `
        <main>
            <div id="productos" class="tablas"></div>
            <div id="clientes" class="tablas"></div>
            <div id="categorias" class="tablas"></div>
            <div id="ventas" class="tablas"></div>
        </main>

        `;
        document.querySelector("#app").insertAdjacentHTML("beforeend",plantilla);
    }
}