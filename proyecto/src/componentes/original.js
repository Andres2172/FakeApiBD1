const API_URL = "https://myfakeapi.com/api/cars/";
const PIXABAY_API_KEY = "49710500-3a2411a573b4b0d71cb32f17f";

export default async function mostrarGaleria() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2 style="text-align:center;">Catálogo de Autos</h2>
    <div id="galeria"></div>
    <div id="detalle"></div>
  `;

  const galeria = document.getElementById("galeria");
  const detalle = document.getElementById("detalle");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const autos = data.cars.slice(0, 6);

    for (const auto of autos) {
      const nombreAuto = `${auto.car} ${auto.car_model}`;
      const imagenUrl = await buscarImagenAuto(nombreAuto);

      const tarjeta = document.createElement("div");
      tarjeta.innerHTML = `
        <img src="${imagenUrl}" alt="${nombreAuto}" />
        <h4>${nombreAuto}</h4>
      `;
      tarjeta.addEventListener("click", () => {
        mostrarDetalle(auto, imagenUrl);
      });

      galeria.appendChild(tarjeta);
    }

    function mostrarDetalle(auto, imagen) {
      detalle.innerHTML = `
        <h3>Detalles del Auto Seleccionado</h3>
        <div style="display:flex; flex-wrap: wrap; gap: 20px; align-items: center;">
          <img src="${imagen}" />
          <div>
            <p><strong>Marca:</strong> ${auto.car}</p>
            <p><strong>Modelo:</strong> ${auto.car_model}</p>
            <p><strong>Año:</strong> ${auto.car_year}</p>
            <p><strong>Color:</strong> ${auto.car_color}</p>
            <p><strong>Precio:</strong> ${auto.price}</p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    app.innerHTML = `<p>Error al cargar la galería: ${error.message}</p>`;
  }
}

async function buscarImagenAuto(nombre) {
  try {
    const res = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(nombre)}&image_type=photo&category=transportation`);
    const data = await res.json();
    if (data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      return "https://via.placeholder.com/300x200?text=Sin+Imagen";
    }
  } catch {
    return "https://via.placeholder.com/300x200?text=Error+de+Imagen";
  }
}