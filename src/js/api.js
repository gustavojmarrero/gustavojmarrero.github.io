const fetchFromApi =(endpoint)=> {
    return fetch(endpoint)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  }