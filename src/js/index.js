window.onload = () => document.getElementById('FNSKU').focus();

const loader = document.getElementById("loader");


const getDataByFNSKU = () => {
  const FNSKU = document.getElementById("FNSKU").value;
  document.getElementById("FNSKU").value = "";
  document.getElementById("FNSKUdisplay").innerText = FNSKU;

  const apiEndpoint = `https://script.google.com/macros/s/AKfycbyaWUL6PDWQkyiSC1-oubkhJLfoKzNwjUNP07zVmNDtPIx24-d5t44KCdwUc_6yiXsRuQ/exec?fnsku=${FNSKU}`;

  showLoader();

  fetchFromApi(apiEndpoint)
    .then(data => {
      console.log("Success:", data);
      document.getElementById("apiTitle").innerText = data.resultado.title;
      document.getElementById("apiImage").src = data.resultado.image;
      document.getElementById("ASINdisplay").innerText = data.resultado.asin ? data.resultado.asin : "";
      
      document.getElementById("PAOdisplay").innerText = data.resultado.pao ? data.resultado.pao : "Falta definir Caducidad";
      
      hideLoader();
      document.getElementById("FNSKU").focus();
    })
    .catch(error => {
      console.error("Error:", error);
      hideLoader();
      document.getElementById("FNSKU").focus();
    });
}