import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    if (!this._popupElement) {
        throw new Error(`Popup element with selector '${popupSelector}' not found`);
    }
        this._imageElement = this._popupElement.querySelector(
            ".modal__preview-image"
        );
        this._captionElement = this._popupElement.querySelector(
            ".modal__preview-caption"
        );
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;

    super.open();
  }
}
