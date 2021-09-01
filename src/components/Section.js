export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  /* Добавление одной карточки */
  addItem(element) {
    this._container.prepend(element);
  }

  /* Отрисовка карточек */
  renderItems(data) {
    this._clear();

    data.forEach((item) => {
      this._renderer(item);
    })
  }

}


