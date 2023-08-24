export class Api {
  //crea tres metodos loadCards/addCard/deleteCard/getUserData
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  makeApiCall(payload) {
    if (payload.body) {
      return fetch(`${this.url}${payload.url}${payload.id ? payload.id : ""}`, {
        method: payload.method,
        headers: {
          authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
          "content-type": "application/json",
        },
        body: JSON.stringify(payload.body),
      });
    } else {
      return fetch(`${this.url}${payload.url}${payload.id ? payload.id : ""}`, {
        method: payload.method,
        headers: {
          authorization: "fccf719e-8a78-41bc-841c-fef7866c1b1f",
          "content-type": "application/json",
        },
      });
    }
  }

  getUserData() {
    const payload = {
      method: "GET",
      url: "/users/me",
    };
    return this.makeApiCall(payload);
  }

  loadCards() {
    const payload = {
      method: "GET",
      url: "/cards",
    };
    return this.makeApiCall(payload);
  }

  cardLike(id) {
    const payload = {
      method: "PUT",
      id,
      url: "/cards/likes/",
    };
    return this.makeApiCall(payload);
  }

  cardDislike(id) {
    const payload = {
      method: "DELETE",
      id,
      url: "/cards/likes/",
    };
    return this.makeApiCall(payload);
  }

  addCard(name, link) {
    const payload = {
      method: "POST",
      url: "/cards",
      body: { name, link },
    };
    return this.makeApiCall(payload);
  }

  editProfile(name, about) {
    const payload = {
      method: "PATCH",
      url: "/users/me",
      body: { name, about },
    };
    return this.makeApiCall(payload);
  }

  deleteCard(id) {
    const payload = {
      method: "DELETE",
      url: "/cards/",
      id,
    };
    return this.makeApiCall(payload);
  }

  updateProfilePic(url) {
    const payload = {
      method: "PATCH",
      url: "/users/me/avatar",
      body: { avatar: url },
    };
    return this.makeApiCall(payload);
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
