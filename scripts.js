//------------------------------------------------------//
//                 Vefforritun Verkefni 8               //
//------------------------------------------------------//
const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    
    for(let item of items.querySelectorAll('.item')){
      let checkbox = item.querySelector('.item__checkbox')
      checkbox.addEventListener('click', finish);
      let text = item.querySelector('.item__text')
      text.addEventListener('click', edit);
      let button = item.querySelector('.item__button')
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    const textField = document.querySelector('body > main > form > input');
    let empty = new RegExp('^\\s*$');
    if(!empty.test(textField.value)) {
      add(textField.value);
    }
    e.target.querySelector('.form__input').value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    let input = e.target;
    let item = input.parentElement;
    if(input.checked) {
      item.classList.add("item--done");
    } else {
      item.classList.remove("item--done");
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let span = e.target;
    let item = span.parentElement;
    let textThen = span.childNodes[0].nodeValue;
    let input = el('input', 'item__edit', commit);
    input.value = textThen;
    item.removeChild(item.childNodes[3]);
    item.insertBefore(input, item.childNodes[3]);
    input.focus();
    input.addEventListener('keypress', commit)
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let keyCode = e.keyCode;
    if(keyCode == ENTER_KEYCODE){
      let input = e.target;
      let textNow = input.value;
      let item = input.parentElement;
      item.removeChild(item.childNodes[3]);
      let span = el('span', 'item__text', edit);
      span.appendChild(document.createTextNode(textNow))
      item.insertBefore(span, item.childNodes[3])
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const li = el('li', 'item', null);
    
    const input = el('input', 'item__checkbox', finish);
    input.setAttribute('type', 'checkbox');

    const span = el('span', 'item__text', edit);
    span.appendChild(document.createTextNode(value))

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode("Eyða"));

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    const items = document.querySelector('body > main > ul');
    items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    let item = e.target.parentElement;
    let items = item.parentElement;
    items.removeChild(item);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.setAttribute('class', className);
    element.addEventListener('click', clickHandler);
    return element;
  }

  return {
    init: init
  }
})();