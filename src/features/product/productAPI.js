// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filterArr, sortArr, pageArr) {
  return new Promise(async (resolve) => {
    //filterArr = {"category":"smartphone"}
    //endpoint= "http://localhost:8080/products?category=smartphone&price=10&.."
    //TODO: on server we will support multi values
    let queryString = "";
    if (filterArr) {
      filterArr.forEach((filterType) => {
        queryString += `${Object.keys(filterType)}=${Object.values(
          filterType
        )}&`;
      });
    }
    if (sortArr) {
      sortArr.forEach((sortObj) => {
        queryString += `${Object.keys(sortObj)}=${Object.values(sortObj)}&`;
      });
    }
    if (pageArr) {
      pageArr.forEach((pageObj) => {
        queryString += `${Object.keys(pageObj)}=${Object.values(pageObj)}&`;
      });
    }

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({
      data: {
        products: data,
        totalItems: +totalItems,
      },
    });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
