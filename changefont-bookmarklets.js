// @ts-check
javascript: void (() => {
  'use strict';
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.left = '0';
  div.style.bottom = '0';
  div.style.zIndex = '9999';
  document.body.appendChild(div);

  const inputFile = document.createElement('input');
  div.appendChild(inputFile);


  inputFile.type = 'file';
  inputFile.accept = '.TTF, .OTF, .WOFF, .WOFF2';

  inputFile.onchange = async () => {
    const file = inputFile.files?.[0];
    if (!file) {
      return;
    }

    const blobURL = URL.createObjectURL(file);
    /*
    const blobURL = await new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.readAsDataURL(file);
    });
    */

    let styleTag =
      /** @type {HTMLStyleElement|null} */
      (document.querySelector('style#dollorfontface'));

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dollorfontface';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
    @font-face {
      font-family: dollor-all;
      /* document.styleSheets[0].rules[0].style.src */
      src: url("${blobURL}"),local('Courier New');
    }

    html body *:not(i):not(.icon){
      font-family: dollor-all,sans-serif,serif!important;
      font-synthesis: style weight!important;
        word-spacing: .25em;
    }
    `;

    await new Promise(resolve => setTimeout(resolve, 3_000));
    URL.revokeObjectURL(blobURL);
    document.body.removeChild(div);
  };

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'remove';
  div.appendChild(removeButton);
  removeButton.onclick = () => {
    const styleTag =
      /** @type {HTMLStyleElement|null} */
      (document.querySelector('style#dollorfontface'));

    if (styleTag) {
      document.head.removeChild(styleTag);
    }

    document.body.removeChild(div);
  };
})();
