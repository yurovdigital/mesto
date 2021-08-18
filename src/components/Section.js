export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  _clear() {
    this._container.innerHTML = '';
  }

  /* Добавление одной карточки */
  setItem(element) {
    this._container.prepend(element);
  }

  /* Отрисовка карточек */
  renderItems() {
    this._clear();

    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

}


