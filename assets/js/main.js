const heroname = document.querySelector("#hero-name");
const heroTabla = document.querySelector("#hero-tabla");
const heroImagen = document.querySelector("#hero-imagen");

const heroFormulario = document.querySelector("#hero-formulario");
const heroBuscar = document.querySelector("#hero-buscar");

const grafico = function (data) {

    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadisticas de Poder para ${data.name}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - ( {y} )",
            dataPoints: [
                { y: data.powerstats.combat, label: "Combate" },
                { y: data.powerstats.durability, label: "Resistencia" },
                { y: data.powerstats.intelligence, label: "Inteligencia" },
                { y: data.powerstats.power, label: "Poder" },
                { y: data.powerstats.speed, label: "Velocidad" },
                { y: data.powerstats.strength, label: "Fuerza" },
            
            ]
        }]
    });
    chart.render();
}
const insertarHtml = (data) => {
    console.log(data)
    const name = data.name;
    const groupAffiliation = data.connections['group-affiliation'];
    const publisher = data.biography.publisher
    const occupation = data.work.occupation
    const firstAppearance = data.biography['first-appearance']
    const height = data.appearance.height[1]
    const weight = data.appearance.weight[1]
    const aliases = data.biography.aliases
    const imagen = data.image.url;
    
    
    heroname.innerHTML = name;

    heroTabla.innerHTML = `
      <tr>
          <td>conexiones</td>
          <td>${groupAffiliation}</td>
      </tr>
      <tr>
            <td>publicado por</td>
            <td>${publisher}</td>
      </tr>
      <tr>
            <td>Ocupación</td>
            <td>${occupation}</td>
      </tr>
      <tr>
            <td>Primera Aparición</td>
            <td>${firstAppearance}</td>
      </tr>
      
      <tr>
          <td>Altura</td>
          <td>${height}</td>
      </tr>
      <tr>
            <td>Peso</td>
            <td>${weight}</td>
       </tr>
       <tr>
            <td>Alianzas</td>
            <td>${aliases}</td>
  </tr>
      
      
  `

    heroImagen.innerHTML = `
      <img src="${imagen}" alt="${name}">
  `
}



heroFormulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const hero = heroBuscar.value;
    if(parseInt(hero) > 732){
        alert("Número fuera de Rango. Debe ingresar un número menor a 733")
    }
    else{
    fetch(`https://www.superheroapi.com/api.php/4905856019427443/${hero}`).then((response) => {
        response.json().then((data) => {
            insertarHtml(data)
            grafico(data)
        });
    })
    }
})




