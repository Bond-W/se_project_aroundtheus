export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
          return res.json().catch((err) => {
            console.error("Error parsing JSON:", err);
            return Promise.reject("Failed to parse JSON response");
          });
        }
        return Promise.reject(`Error: ${res.status}`);
      }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: "GET",
          headers: this._headers,
        })
        .then(this._handleResponse)
        .then((cards) => {
          console.log("Fetched initial cards:", cards);
          return cards;
        })
        .catch((err) => {
          console.error("Error fetching initial cards:", err);
        });
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
        console.log("Saving card to server:", data);
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: data.title,
            link: data.url
          })
        })
        .then(this._handleResponse)
        .then((savedCardData) => {
          console.log("Card saved successfully:", savedCardData);
          return savedCardData;
        })
        .catch((err) => {
          console.error("Failed to save card:", err);
        });
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
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
        })
          .then(this._handleResponse)
          .catch((err) => {
            console.error("Error liking card:", err);
            return Promise.reject(err);
          });
      }
      
      
      unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then(this._handleResponse)
          .catch((err) => {
            console.error("Error unliking card:", err);
            return Promise.reject(err);
          });
      }

    updateUserAvatar(avatarUrl) {
        console.log("Sending request to update avatar:", avatarUrl);
      
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({ avatar: avatarUrl }),
        })
          .then(this._handleResponse)
          .then((userData) => {
            if (userData && userData.avatar) {
              console.log("Avatar updated successfully:", userData.avatar);
              return userData;
            } else {
              console.error("Avatar URL missing in response");
              return Promise.reject("Avatar URL missing in response");
            }
          })
          .catch((err) => {
            console.error("Failed to update avatar:", err);
            return Promise.reject(err);
          });
      }
}

