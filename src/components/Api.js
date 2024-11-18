export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }


    _request(endpoint, options = {}) {
        const finalOptions = {
            headers:this._headers,
            ...options,
        };
        const url = `${this._baseUrl}${endpoint}`;
        return fetch(url, finalOptions).then(this._handleResponse);
      }

    getInitialCards() {
        return this._request("/cards");
    }

    getUserInfo() {
        return this._request("/users/me");
    }

    updateUserInfo({ name, job }) {
        return this._request("/users/me", {
          method: "PATCH",
          body: JSON.stringify({ name, about: job }),
        });
      }

      addCard({ title, url }) {
        return this._request("/cards", {
          method: "POST",
          body: JSON.stringify({ name: title, link: url }),
        });
      }
    

      deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
          method: "DELETE",
        });
      }

      likeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
          method: "PUT",
        });
      }
      
      
      unlikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
          method: "DELETE",
        });
      }
      
      updateUserAvatar(avatarUrl) {
        return this._request("/users/me/avatar", {
          method: "PATCH",
          body: JSON.stringify({ avatar: avatarUrl }),
        });
      }
    }

