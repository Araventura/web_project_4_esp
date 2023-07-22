export class Api {
  //crea un constructor que reciba
  //crea tres metodos loadCards/addCard/deleteCard/getUserData
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  getUserData() {
    return fetch(this.url + "/users/me", {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
      },
    })
      .then((res) => {
        console.log(res.json()); //agarra el html y remplaza el texto textcontent/innerHTML NAME/ABOUT/AVATAR
      })
      .catch((res) => {
        console.log(res);
      });
  }

  loadCards() {
    return fetch(this.url + "/cards", {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        mode: "no-cors",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Hola");
      });
  }

  editProfile() {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Daniel Villaverde",
        about: "Web Dev & dog walker",
      }),
    });
  }
}
