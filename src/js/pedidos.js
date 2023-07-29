const getOrdersByLocation = () => {
  const destino = document.getElementById("destino").value;
  const apiEndpoint = `https://script.google.com/macros/s/AKfycbyjdQBCUFJ_lvBchWJkq_Jg5R4UbpZzzPVnNkb0YTc6xrZrqf4IXrQa9XHvAjDmWDRVmg/exec?&destiny=${destino}`;

  // Clear the previous results
  const resultsBody = document.getElementById("results").getElementsByTagName("tbody")[0];
  resultsBody.innerHTML = "";

  showLoader();

  fetchFromApi(apiEndpoint)
    .then((data) => {
      console.log("Success:", data);

      data.resultado.forEach((order) => {
        const row = resultsBody.insertRow();
        row.insertCell().innerText = order.supplier;
        const cell = row.insertCell();
        const link = document.createElement("a");
        link.href = `pedido.html?order=${order.order}`;
        link.innerText = order.order;
        cell.appendChild(link);
        row.insertCell().innerText = order.total_qty;
      });

      hideLoader();
    })
    .catch((error) => {
      console.error("Error:", error);
      hideLoader();
    });
}
