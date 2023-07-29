const fetchFromApi =(endpoint)=> {
    return fetch(endpoint)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  }


const showLoader = () => loader.style.display = "block";
const hideLoader = () => loader.style.display = "none";
