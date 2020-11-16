//import * as lc4 from "https://cdn.jsdelivr.net/gh/umcconnell/lc4@3/dist/main.js";
import * as lc4 from "https://cdn.statically.io/gh/AGPLCZ/lc4/de0a3a4a/dist/main.js";

import { debounce, showSnackbar, createSnackbar } from "./helpers.js";

let method = "encrypt",
    mode = "lc4";

let switcher = document.getElementById("encryptorFlip"),
    errorSnackbar = createSnackbar(),
    textareas = document.getElementsByTagName("textarea"),
    methodLabels = [...document.querySelectorAll(".encryptor__label")];

let modeSwitch = document.getElementById("mode"),
    key = document.getElementById("key"),
    keyBtn = document.getElementById("generateKey"),
    nonce = document.getElementById("nonce"),
    nonceBtn = document.getElementById("generateNonce"),
    signature = document.getElementById("signature"),
    headerData = document.getElementById("headerData");

let update = debounce(function () {
  try {
    if (textareas[0].value == "") return textareas[1].value = "";
    else if (!textareas[0].value) return;
    
    textareas[1].value = lc4[method]({
      mode,
      message: textareas[0].value.split("\n"),
      key: key.value,
      nonce: !!nonce.value && nonce.value,
      signature: !!signature.value && signature.value.length > 9 && signature.value,
      headerData: !!headerData.value && headerData.value
    }).join("\n");
    
  } catch(err) {
    console.log(err);
    showSnackbar(errorSnackbar, err.message, err.message.length > 100 ? 5000 : undefined);
  }
}, 250);

function switchUI() {
  // Flip textareas
  textareas[1].parentNode.insertBefore(textareas[1], textareas[0]);
  
  // Flip labels
  methodLabels[0].parentNode.insertBefore(methodLabels[0], methodLabels[1]);
  methodLabels[1].parentNode.insertBefore(methodLabels[1], switcher);
  methodLabels.reverse();
}

function populateValues() {
  key.value = lc4.generateKey(mode);
  nonce.value = lc4.generateNonce(mode);
}

function setup() {
  document.body.insertAdjacentElement("beforeend", errorSnackbar);
  document.body.addEventListener("input", update);
  modeSwitch.addEventListener("input", () => {
    mode = modeSwitch.checked ? "ls47" : "lc4";
    populateValues()
  })
  
  populateValues();
  
  keyBtn.addEventListener("click", () => {
    key.value = lc4.generateKey(mode);
    update();
  });
  
  nonceBtn.addEventListener("click", () => {
    nonce.value = lc4.generateNonce(mode);
    update();
  });
  
  switcher.addEventListener("click", () => {
    switchUI();
    method = method === "encrypt" ? "decrypt" : "encrypt";
    update();
  });
}

setup();
