/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

document.addEventListener('DOMContentLoaded', () => {
  const targetOrg = '*';
  const form = document.querySelector('#main-form');

  let iframeCount = document.querySelector('#label-msg').textContent;

  iframeCount = iframeCount.slice(1, iframeCount.length - 2);
  parent.postMessage(`[system]: ${iframeCount} joined the conversation`, targetOrg);

  form.addEventListener('submit', (e) => {
    const name = document.querySelector('#label-msg').innerHTML;
    const message = document.querySelector('#input-msg').value;
    let stop = true;
    const attation = `${name} Please, write the message !`;

    if (message === '') {
      alert(attation);
      stop = false;
    }

    if (stop === true) {
      parent.postMessage(`${name} ${message}`, targetOrg);
    }

    document.getElementById('main-form').reset();

    e.preventDefault();
  });

  window.addEventListener('message', (e) => {
    const list = document.querySelector('#message-list');

    const index = e.data.indexOf(':');
    const frameName = e.data.slice(0, index);
    const message = e.data.slice(index + 1);

    const newComment = document.createElement('li');
    newComment.className = 'iframe-body__item';
    newComment.innerHTML = `<strong>${frameName} - </strong> ${message} `;

    list.appendChild(newComment);
  });

  window.addEventListener('click', () => {
    document.querySelector('#input-msg').focus();
  });
});

