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

    const buffer = await file.arrayBuffer();
    const fontFace = new FontFace('dollor-all', buffer)
    const font = await fontFace.load();
    document.fonts.add(font);

    let styleTag =
      /** @type {HTMLStyleElement|null} */
      (document.querySelector('style#dollorfontface'));

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dollorfontface';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
    html body *:not(i):not(.icon){
      font-family: dollor-all,sans-serif,serif!important;
      font-synthesis: style weight!important;
        word-spacing: .25em;
    }
    `;

    await new Promise(resolve => setTimeout(resolve, 3_000));
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
