/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-plusplus: 0 */

// ----------- Create iframe ----------- \\

const plusBtn = document.querySelector('.main-body__plus');

class Frame {
  constructor(settings) {
    let {iframeNumber} = settings;
    const {targetOrg} = settings;

    const createFrame = () => {
      const wrapper = document.querySelector('.wrapper');

      const block = document.createElement('div');
      block.className = 'main-body__iframe-block iframe-block';

      const iframe = document.createElement('iframe');
      iframe.className = 'iframe-block__iframe iframe';

      const count = document.createElement('span');
      count.className = 'iframe-block__title';
      count.innerHTML = `Window - ${iframeNumber}`;

      block.appendChild(iframe);
      block.appendChild(count);
      wrapper.appendChild(block);

      document.querySelectorAll('.iframe')[document.querySelectorAll('.iframe').length - 1].srcdoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="style/normalize.css">
          <link rel="stylesheet" href="style/chat-Style.css">
          <title>Iframe Window</title>
        </head>

        <body id='iframe-body'>

          <ul class='iframe-body__message' id='message-list'></ul>
          <form id='main-form' class='iframe-body__form form'>
            <label for='input-msg' id='label-msg' class='form__label'>[Speaker${iframeNumber}]:</label>
            <input type='text' id='input-msg' class='form__message' placeholder='Your message'>
            <input type='submit' class='form__button' value='Send'>
          </form>
          
          <script src="js/iframe-Work.js"></script>
        </body>
        </html>`;

      iframeNumber++;
    };

    const postMessageToAll = (message, targetOrigin) => {
      const iFrames = document.querySelectorAll('.iframe');
      // console.log(iFrames);

      for (let i = 0; i < iFrames.length; i++) {
        iFrames[i].contentWindow.postMessage(message, targetOrigin);
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('message', (e) => {
        postMessageToAll(e.data, targetOrg);
      });

      plusBtn.addEventListener('click', () => {
        createFrame();
      });
    });
  }
}

const iFrame1 = new Frame({
  iframeNumber: 1,
  targetOrg: '*',
});

// ------------------------------------- \\
