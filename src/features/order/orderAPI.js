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
