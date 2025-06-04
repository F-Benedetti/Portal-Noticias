// script.js

document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("subscriptionForm");
  var inputs = {
    1: document.getElementById("fullname"),
    2: document.getElementById("email"),
    3: document.getElementById("password"),
    4: document.getElementById("password2"),
    5: document.getElementById("age"),
    6: document.getElementById("phone"),
    7: document.getElementById("address"),
    8: document.getElementById("city"),
    9: document.getElementById("zipcode"),
    10: document.getElementById("dni")
  };

  function validar(numCampo, valor, allValues) {
    if (valor.trim() === "") {
      return "Este campo es obligatorio.";
    }
    switch (numCampo) {
      case 1:
        var soloLetras = valor.replace(/[^A-Za-záéíóúÁÉÍÓÚñÑ]/g, "");
        if (soloLetras.length <= 6) {
          return "Debe tener más de 6 letras.";
        }
        if (valor.indexOf(" ") === -1) {
          return "Debe contener un espacio entre nombre y apellido.";
        }
        return "";
      case 2:
        var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!reEmail.test(valor.trim())) {
          return "Formato de email inválido.";
        }
        return "";
      case 3:
        if (valor.length < 8) {
          return "Debe tener al menos 8 caracteres.";
        }
        var tieneLetra = /[A-Za-z]/.test(valor);
        var tieneNumero = /[0-9]/.test(valor);
        if (!tieneLetra || !tieneNumero) {
          return "Debe contener letras y números.";
        }
        return "";
      case 4:
        if (valor !== allValues[3]) {
          return "Las contraseñas no coinciden.";
        }
        return "";
      case 5:
        var reEntero = /^[0-9]+$/;
        if (!reEntero.test(valor.trim())) {
          return "Edad inválida (solo números enteros).";
        }
        var n = parseInt(valor, 10);
        if (n < 18) {
          return "Debes ser mayor de 18 años.";
        }
        return "";
      case 6:
        var reTel = /^[0-9]{7,}$/;
        if (!reTel.test(valor.trim())) {
          return "Teléfono inválido (mínimo 7 dígitos, solo números).";
        }
        return "";
      case 7:
        var partes = valor.trim().split(" ");
        if (partes.length < 2) {
          return "Debe contener calle y número (separados por un espacio).";
        }
        var calle = partes[0];
        var numero = partes.slice(1).join("").toLowerCase();
        
        var reCalle = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/;
        if (!reCalle.test(calle)) {
          return "La parte de la calle debe contener solo letras.";
        }
        // Validar número: solo dígitos o "s/n"
        var reNumero = /^[0-9]+$/;
        if (!(reNumero.test(numero) || numero === "s/n")) {
          return 'La parte del número debe ser solo dígitos o "s/n".';
        }
        // Validar suma de longitud (calle + número) >= 5
        if (calle.length + numero.length < 5) {
          return "La suma de letras y dígitos debe ser al menos 5 caracteres.";
        }
        return "";;  
      case 8:
        var reCiudad = /^[A-Za-záéíóúÁÉÍÓÚñÑ]{3,}$/;
        if (!reCiudad.test(valor.trim())) {
          return "La ciudad debe tener al menos 3 letras y solo contener letras.";
        }
        return "";
      case 9:
        if (valor.trim().length < 3) {
          return "Debe tener al menos 3 caracteres.";
        }
        return "";
      case 10:
        var reDni = /^[0-9]{7,8}$/;
        if (!reDni.test(valor.trim())) {
          return "DNI debe tener 7 u 8 dígitos.";
        }
        return "";
      default:
        return "";
    }
  }

  function showError(inputElem, mensaje) {
    var errorEl = document.getElementById("error-" + inputElem.id);
    if (mensaje) {
      errorEl.textContent = mensaje;
      errorEl.style.display = "block";
    } else {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
  }

  var allValues = {};

  for (var num in inputs) {
    if (inputs.hasOwnProperty(num)) {
      (function(n) {
        var campoElem = inputs[n];
        campoElem.addEventListener("blur", function() {
          var val = campoElem.value;
          allValues[n] = val;
          var errorMsg = validar(parseInt(n, 10), val, allValues);
          showError(campoElem, errorMsg);
        });
        campoElem.addEventListener("focus", function() {
          showError(campoElem, "");
        });
      })(num);
    }
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var tieneErrores = false;
    for (var num2 in inputs) {
      if (inputs.hasOwnProperty(num2)) {
        var inp = inputs[num2];
        var val2 = inp.value;
        allValues[num2] = val2;
        var err = validar(parseInt(num2, 10), val2, allValues);
        showError(inp, err);
        if (err) {
          tieneErrores = true;
        }
      }
    }
    if (!tieneErrores) {
      form.reset();
    }
  });
});
