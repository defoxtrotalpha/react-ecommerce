export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TO DO: On server it will only relevant information about the user (not password)
    resolve({ data });
  });
}

export function logout() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}

export function checkUser(logInInfo) {
  return new Promise(async (resolve, reject) => {
    const email = logInInfo.email;
    const password = logInInfo.password;
    const response = await fetch(`http://localhost:8080/users?email=` + email);
    const data = await response.json();

    if (data.length) {
      if (password === data[0].password) {
        resolve({
          data: {
            email: data[0].email,
            password: data[0].password,
            id: data[0].id,
          },
        });
      } else {
        reject({ message: "Wrong credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
    //TO DO: On server it will reveal only relevant information about the user (not password)
  });
}
