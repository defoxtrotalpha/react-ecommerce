// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  return new Promise(async (resolve) => {
    //filter = {"category":"smartphone"}
    //TODO: on server we will support multi values
    let queryString = "";
    for (let key in filter) {
      queryString += `${key}=${filter[key]}&`;
    }

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
