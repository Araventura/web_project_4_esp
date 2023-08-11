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
    });
  }

  loadCards() {
    return fetch(this.url + "/cards", {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        mode: "no-cors",
      },
    });
  }

  addCard(name, link) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  editProfile(name, about) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  deleteCard(id) {
    return fetch(this.url + "/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
    });
  }

  cardLike(id) {
    return fetch(this.url + "/cards/likes/" + id, {
      method: "PUT",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
    });
  }

  cardDislike(id) {
    return fetch(this.url + "/cards/likes/" + id, {
      method: "DELETE",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
    });
  }

  updateProfilePic(url) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }
}
