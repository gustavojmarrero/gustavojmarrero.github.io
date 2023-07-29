// Add event listener to button
document.getElementById('saveButton').addEventListener('click', saveData);
window.onload = function() {
    document.getElementById('barcode').focus();
  };
function saveData() {
    console.log("Saving data...")
    // Get form data
    const destino = document.getElementById("destino").value;
    const barcode = document.getElementById("barcode").value;
    const quantity = document.getElementById("quantity").value;
  
    // Build API endpoint
    const apiEndpoint = `https://script.google.com/macros/s/AKfycbwHzZwWagAWwjBf5PDZB9CoF26AARBGT1smO1H1Ty6JvAfLX5GBK5LV0yULy624nf1s/exec?whs=${destino}&upc=${barcode}&qty=${quantity}`;
  
    // Show the loader
    showLoader();
  
    // Call the API
    fetchFromApi(apiEndpoint)
      .then(data => {
        console.log("Success:", data);
        // Process the response data as needed
        // Clear form
      document.getElementById("barcode").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("barcode").focus(); // Set focus to the barcode input
      })
      .catch(error => {
        console.error("Error:", error);
      })
      .finally(() => {
        // Hide the loader
        hideLoader();
      });
  }
  
