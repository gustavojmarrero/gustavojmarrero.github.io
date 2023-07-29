const getDataByOrder = () => {
  const orderNumber = document.getElementById("orderNumber").value;
  const apiEndpoint = `https://script.google.com/macros/s/AKfycbwSu9Sz60cT4CM0N-h37A3wi04C2zqMiqyP-5kyc1IqfX4VQh7xrmKlbmhtYkqs2fwBBA/exec?order=${orderNumber}`;
  showLoader();

  fetchFromApi(apiEndpoint)
    .then((data) => {
      console.log("Success:", data);
      const orderResult = document.getElementById("orderResult");
      orderResult.innerHTML = ""; // Clear the previous results

      const statusElement = document.createElement("h3");
      const total_qtyElement = document.createElement("h3");
      statusElement.innerText = `Estado del Pedido: ${data.status}`;
      total_qtyElement.innerText = `Total de unidades del pedido: ${data.total_qty}`;
      orderResult.appendChild(statusElement);
      orderResult.appendChild(total_qtyElement);

      data.productos.forEach((item) => {
        const titleElement = document.createElement("h2");
        titleElement.innerText = item.title;
        const asinElement = document.createElement("h3");
        asinElement.innerText = item.asin;
        const qtyElement = document.createElement("h4");
        qtyElement.innerText = `Cantidad: ${item.qty}`;
        const imgElement = document.createElement("img");
        imgElement.src = item.img;

        orderResult.appendChild(document.createElement("br")); // Add space
        orderResult.appendChild(titleElement);
        orderResult.appendChild(asinElement);
        orderResult.appendChild(document.createElement("br")); // Add space
        orderResult.appendChild(qtyElement);
        orderResult.appendChild(imgElement);
      });
      
      hideLoader();
    })
    .catch((error) => {
      console.error("Error:", error);
      hideLoader();
    });
}

const urlParams = new URLSearchParams(window.location.search);
const order = urlParams.get("order");

if (order) {
  document.getElementById("orderNumber").value = order;
  getDataByOrder();
}