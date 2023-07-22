class Api {
  //crea un constructor que reciba
  //crea tres metodos loadCards/addCard/deleteCard/getUserData
  constructor() {
    //this.url/this.token
  }

  getUserData() {
    fetch("https://around.nomoreparties.co/v1/web_es_05/users/me", {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
      },
    })
      .then((res) => {
        console.log(res); //agarra el html y remplaza el texto textcontent/innerHTML NAME/ABOUT/AVATAR
      })
      .catch((res) => {
        console.log(res);
      });
  }

  loadCards() {
    fetch("https://around.nomoreparties.co/v1/web_es_05/cards", {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res.data._id);
      });
  }

  editProfile() {
    fetch("https://around.nomoreparties.co/v1/web_es_05/users/me", {
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
