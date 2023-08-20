export class Api {
  //crea tres metodos loadCards/addCard/deleteCard/getUserData
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  getData(url) {
    return fetch(this.url + url, {
      method: "GET",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
      },
    });
  }

  getUserData() {
    return this.getData("/users/me");
  }

  loadCards() {
    return this.getData("/cards");
  }

  toggleCardLike(id, method) {
    return fetch(this.url + "/cards/likes/" + id, {
      method: method,
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
    });
  }

  cardLike(id) {
    return this.toggleCardLike(id, "PUT");
  }

  cardDislike(id) {
    return this.toggleCardLike(id, "DELETE");
  }

  //////// Metodos que hacen cosas conceptualmente distintas, tienes alguna sugerencia de como hacerlo menos repetitivo? - SM

  addCard(name, link) {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    });
  }

  editProfile(name, about) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, about }),
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

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
