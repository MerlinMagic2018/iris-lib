/*eslint no-useless-escape: "off", camelcase: "off" */
import {SEA} from 'gun';

let isNode = false;
try {
  isNode = Object.prototype.toString.call(global.process) === `[object process]`;
} catch (e) { null; }

export default {
  getHash(str, format = `base64`) {
    if (!str) {
      return undefined;
    }
    return SEA.work(str, undefined, undefined, {name: `SHA-256`});
  },

  timeoutPromise(promise, timeout) {
    return Promise.race([
      promise,
      new Promise((resolve => {
        setTimeout(() => {
          resolve();
        }, timeout);
      })),
    ]);
  },

  injectCss() {
    const elementId = `irisStyle`;
    if (document.getElementById(elementId)) {
      return;
    }
    const sheet = document.createElement(`style`);
    sheet.id = elementId;
    sheet.innerHTML = `
      .iris-identicon * {
        box-sizing: border-box;
      }

      .iris-identicon {
        vertical-align: middle;
        margin: auto;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        position: relative;
        margin: auto;
        max-width: 100%;
      }

      .iris-distance {
        z-index: 2;
        position: absolute;
        left:0%;
        top:2px;
        width: 100%;
        text-align: right;
        color: #fff;
        text-shadow: 0 0 1px #000;
        font-size: 75%;
        line-height: 75%;
        font-weight: bold;
      }

      .iris-pie {
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0px 0px 0px 0px #82FF84;
        padding-bottom: 100%;
        max-width: 100%;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
      }

      .iris-card {
        padding: 10px;
        background-color: #f7f7f7;
        color: #777;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: row;
        overflow: hidden;
      }

      .iris-card a {
        -webkit-transition: color 150ms;
        transition: color 150ms;
        text-decoration: none;
        color: #337ab7;
      }

      .iris-card a:hover, .iris-card a:active {
        text-decoration: underline;
        color: #23527c;
      }

      .iris-pos {
        color: #3c763d;
      }

      .iris-neg {
        color: #a94442;
      }

      .iris-identicon img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        border-radius: 50%;
        border-color: transparent;
        border-style: solid;
      }`;
    document.body.appendChild(sheet);
  },

  isNode,
};
