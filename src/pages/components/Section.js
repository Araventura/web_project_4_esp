//contains items and renderer
//items - funciona como un array de datos
//renderer funcion  responsable de crear y renderizar los datos

class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  //public method that renders all elements on page
  renderOnPage() {
    this.items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
