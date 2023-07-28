




  // Pedido

  var urlParams = new URLSearchParams(window.location.search);
  var order = urlParams.get("order");
  if (order) {
    document.getElementById("orderNumber").value = order;
    getDataByOrder();
  }
  function getDataByOrder() {
    var orderNumber = document.getElementById("orderNumber").value;
    var apiEndpoint =
      "https://script.google.com/macros/s/AKfycbwSu9Sz60cT4CM0N-h37A3wi04C2zqMiqyP-5kyc1IqfX4VQh7xrmKlbmhtYkqs2fwBBA/exec?order=" +
      orderNumber;

    document.getElementById("loader").style.display = "block"; // Show the loader
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        var orderResult = document.getElementById("orderResult");
        orderResult.innerHTML = ""; // Clear the previous results

        var statusElement = document.createElement("h3");
        var total_qtyElement = document.createElement("h3");
        statusElement.innerText = "Estado del Pedido: " + data.status;
        total_qtyElement.innerText = "Total de unidades del pedido: " + data.total_qty;
        orderResult.appendChild(statusElement);
        orderResult.appendChild(total_qtyElement);

        data.productos.forEach((item) => {
          var titleElement = document.createElement("h2");
          titleElement.innerText = item.title;
          var asinElement = document.createElement("h3");
          asinElement.innerText = item.asin;
          var qtyElement = document.createElement("h4");
          qtyElement.innerText = "Cantidad: " + item.qty;
          var imgElement = document.createElement("img");
          imgElement.src = item.img;

          orderResult.appendChild(document.createElement("br")); // Add space
          orderResult.appendChild(titleElement);
          orderResult.appendChild(asinElement);
          orderResult.appendChild(document.createElement("br")); // Add space
          orderResult.appendChild(qtyElement);
          orderResult.appendChild(imgElement);
        });
        document.getElementById("loader").style.display = "none"; // Hide the loader
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("loader").style.display = "none"; // Hide the loader
      });
  }

  // Pedidos 

  function getOrdersByLocation() {
    var destino = document.getElementById("destino").value;
    var apiEndpoint =
      "https://script.google.com/macros/s/AKfycbyjdQBCUFJ_lvBchWJkq_Jg5R4UbpZzzPVnNkb0YTc6xrZrqf4IXrQa9XHvAjDmWDRVmg/exec?&destiny=" +
      destino;

    // Clear the previous results
    var resultsBody = document
      .getElementById("results")
      .getElementsByTagName("tbody")[0];
    resultsBody.innerHTML = "";

    document.getElementById("loader").style.display = "block"; // Show the loader

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        data.resultado.forEach((order) => {
          var row = resultsBody.insertRow();
          row.insertCell().innerText = order.supplier;
          var cell = row.insertCell();
          var link = document.createElement("a");
          link.href = "pedido.html?order=" + order.order;
          link.innerText = order.order;
          cell.appendChild(link);
          row.insertCell().innerText = order.total_qty;
        });

        document.getElementById("loader").style.display = "none"; // Hide the loader
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("loader").style.display = "none"; // Hide the loader
      });
  }