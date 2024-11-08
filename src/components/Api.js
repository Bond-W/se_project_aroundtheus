export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job,
            }),
        })
        .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.url,
            }),
        })
        .then(this._handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._handleResponse)
        .catch((err) => {
            console.error("Delete Card Error:", err);
        });
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    updateUserAvatar(avatarUrl) {
        console.log("Sending request to update avatar:", avatarUrl);
      
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({ avatar: avatarUrl }),
        })
          .then(this._handleResponse)
          .catch((err) => {
            console.error("Failed to update avatar:", err);
          });
      }
}

