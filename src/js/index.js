window.onload = () => document.getElementById("PRODUCT").focus();

const loader = document.getElementById("loader");


const getDataByCode = () => {
  const PRODUCT = document.getElementById("PRODUCT").value;
  document.getElementById("PRODUCT").value = "";
  //document.getElementById("CODEdisplay").innerText = CODE;

  const apiEndpoint = `https://script.google.com/macros/s/AKfycbyaWUL6PDWQkyiSC1-oubkhJLfoKzNwjUNP07zVmNDtPIx24-d5t44KCdwUc_6yiXsRuQ/exec?code=${PRODUCT}`;

  showLoader();

  fetchFromApi(apiEndpoint)
    .then(data => {
      console.log("Success:", data);
      document.getElementById("apiTitle").innerText = data.resultado.title;
      document.getElementById("apiImage").src = data.resultado.image;
      document.getElementById("FNSKUdisplay").innerText = data.resultado.fnsku ? data.resultado.fnsku : "";
      document.getElementById("ASINdisplay").innerText = data.resultado.asin ? data.resultado.asin : "";
      document.getElementById("UPCdisplay").innerText = data.resultado.upc ? data.resultado.upc : "";
      
      document.getElementById("PAOdisplay").innerText = data.resultado.pao ? data.resultado.pao : "Falta definir Caducidad";
      
      hideLoader();
      document.getElementById("PRODUCT").focus();
    })
    .catch(error => {
      console.error("Error:", error);
      hideLoader();
      document.getElementById("PRODUCT").focus();
    });
}