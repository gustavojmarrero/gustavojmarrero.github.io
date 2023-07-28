// Index
window.onload = function() {
    document.getElementById('FNSKU').focus(); // Focus on the input when the page loads
}

function getDataByFNSKU() {
    var FNSKU = document.getElementById("FNSKU").value;
    document.getElementById("FNSKU").value = "";
    document.getElementById("FNSKUdisplay").innerText = FNSKU;
  
    var apiEndpoint =
      "https://script.google.com/macros/s/AKfycbyaWUL6PDWQkyiSC1-oubkhJLfoKzNwjUNP07zVmNDtPIx24-d5t44KCdwUc_6yiXsRuQ/exec?fnsku=" +
      FNSKU;
  
    document.getElementById("loader").classList.remove("d-none");
  
    fetchFromApi(apiEndpoint)
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("apiTitle").innerText = data.resultado.title;
        document.getElementById("apiImage").src = data.resultado.image;
        document.getElementById("ASINdisplay").innerText = data.resultado.asin ? data.resultado.asin : "";
        
        if (data.resultado.pao) {
          document.getElementById("PAOdisplay").innerText = data.resultado.pao;
        } else {
          document.getElementById("PAOdisplay").innerText = "Falta definir Caducidad";
        }
        
        document.getElementById("loader").classList.add("d-none");
        document.getElementById("FNSKU").focus(); // Focus on the input after fetching data
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("loader").classList.add("d-none");
        document.getElementById("FNSKU").focus(); // Focus on the input after catching an error
      });
  }
  