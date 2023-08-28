export function addOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TO DO: On server it will only relevant information about the user (not password)
    resolve({ data });
  });
}

export function updateOrder(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TO DO: On server it will only relevant information about the user (not password)
    resolve({ data });
  });
}

export function fetchAllOrders(pageArr) {
  return new Promise(async (resolve) => {
    //filterArr = {"category":"smartphone"}
    //endpoint= "http://localhost:8080/products?category=smartphone&price=10&.."
    //TODO: on server we will support multi values
    let queryString = "";

    // if (sortArr) {
    //   sortArr.forEach((sortObj) => {
    //     queryString += `${Object.keys(sortObj)}=${Object.values(sortObj)}&`;
    //   });
    // }
    if (pageArr) {
      pageArr.forEach((pageObj) => {
        queryString += `${Object.keys(pageObj)}=${Object.values(pageObj)}&`;
      });
    }

    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({
      data: {
        orders: data,
        totalOrders: +totalOrders,
      },
    });
  });
}
