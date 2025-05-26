const API_URL = "https://myfakeapi.com/api/cars/";
const PIXABAY_API_KEY = "49710500-3a2411a573b4b0d71cb32f17f";

export default async function mostrarHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div style="text-align: center;">
      <button id="btn-auto-detalle">Ver Auto Aleatorio</button>
    </div>
    <h2 style="text-align:center;">Lista de Autos</h2>
    <div id="lista-autos"></div>
  `;

  document.getElementById("btn-auto-detalle").addEventListener("click", mostrarAutoDetalle);

  const lista = document.getElementById("lista-autos");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.cars.slice(0, 12).forEach((auto) => {
      const item = document.createElement("div");
      item.innerHTML = `
        <h4>${auto.car} ${auto.car_model}</h4>
        <p>Año: ${auto.car_model_year}</p>
        <p>Color: ${auto.car_color}</p>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    lista.innerHTML = `<p>Error al cargar los autos: ${error.message}</p>`;
  }
}

async function mostrarAutoDetalle() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div style="text-align: center;">
      <button id="btn-volver-home">Volver al Home</button>
    </div>
    <h2 style="text-align:center;">Auto Aleatorio</h2>
    <div id="auto-detalle"></div>
  `;

  document.getElementById("btn-volver-home").addEventListener("click", mostrarHome);

  const contenedor = document.getElementById("auto-detalle");

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const autos = data.cars;

    const auto = autos[Math.floor(Math.random() * autos.length)];
    const query = `${auto.car} ${auto.car_model}`;
    const imgRes = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`);
    const imgData = await imgRes.json();
    const imageUrl = imgData.hits[0]?.webformatURL || "https://via.placeholder.com/240x160?text=Sin+Imagen";

    const item = document.createElement("div");
    item.innerHTML = `
      <h3>${auto.car} ${auto.car_model} (${auto.car_model_year})</h3>
      <img src="${imageUrl}" />
      <p>Color: <strong>${auto.car_color}</strong></p>
      <p>VIN: ${auto.car_vin}</p>
      <p>Precio: ${auto.price}</p>
    `;

    contenedor.appendChild(item);
  } catch (error) {
    contenedor.innerHTML = `<p>Error al cargar el auto: ${error.message}</p>`;
  }
}