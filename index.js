// Caractères disponibles
const characters = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Éléments du DOM
const copyMessage = document.getElementById("copyMessage");
const lengthSelect = document.getElementById("lengthSelect");
const lengthDisplay = document.getElementById("lengthDisplay");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");

// Remplacement du slider par un select pour la longueur
for (let i = 4; i <= 8; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  lengthSelect.appendChild(option);
}
// Ajout de l'option personnalisée
const customOption = document.createElement("option");
customOption.value = "custom";
customOption.textContent = "Personnalisée...";
lengthSelect.appendChild(customOption);

// Création de l'input personnalisé (caché par défaut)
const customLengthInput = document.createElement("input");
customLengthInput.type = "number";
customLengthInput.id = "customLengthInput";
customLengthInput.className = "length-custom-input";
customLengthInput.min = 4;
customLengthInput.max = 1000;
customLengthInput.placeholder = "Longueur (max 1000)";
customLengthInput.style.display = "none";
customLengthInput.style.width = "150px";
customLengthInput.style.height = "30px";
customLengthInput.style.borderRadius = "5px";

lengthSelect.parentNode.insertBefore(customLengthInput, lengthDisplay);

lengthSelect.value = "";
lengthDisplay.textContent = "";

lengthSelect.addEventListener("change", function () {
  if (this.value === "custom") {
    customLengthInput.style.display = "inline-block";
    lengthDisplay.textContent = customLengthInput.value || '';
  } else {
    customLengthInput.style.display = "none";
    lengthDisplay.textContent = this.value;
  }
});

customLengthInput.addEventListener("input", function () {
  let val = parseInt(this.value);
  if (isNaN(val) || val < 4) val = 4;
  if (val > 1000) val = 1000;
  this.value = val;
  lengthDisplay.textContent = val;
});

// Fonction pour générer un mot de passe
function generatePassword() {
  let length;
    // Vérification si aucune longueur n'est sélectionnée
    if ((lengthSelect.value === "") || (lengthSelect.value === "custom" && customLengthInput.value === "")) {
        copyMessage.textContent = "Veuillez sélectionner ou saisir une longueur de mot de passe !";
        copyMessage.style.color = "#d60d0d";
        setTimeout(() => {
        copyMessage.textContent = "";
        }, 3000);
        return;
  } else {
    length = parseInt(lengthSelect.value);
  }
  let charset = "";

  // Construction du jeu de caractères
  if (uppercaseCheck.checked) charset += characters.uppercase;
  if (lowercaseCheck.checked) charset += characters.lowercase;
  if (numbersCheck.checked) charset += characters.numbers;
  if (symbolsCheck.checked) charset += characters.symbols;

  // Vérification qu'au moins une option est sélectionnée
  if (charset === "") {
    copyMessage.textContent = "Vous devez cocher au moins un type de caractère !";
    copyMessage.style.color = "#d60d0d";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 3000);
    return;
  }
  copyMessage.textContent = "";

  // Génération du mot de passe
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Affichage du mot de passe
  passwordOutput.value = password;

  // Évaluation de la force
  evaluateStrength(password);
}

// Fonction pour évaluer la force du mot de passe
function evaluateStrength(password) {
  let score = 0;
  const length = password.length;

  // Points pour la longueur
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;

  // Points pour la diversité des caractères
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Mise à jour de l'affichage
  strengthFill.className = "strength-fill";

  if (score <= 2) {
    strengthFill.classList.add("strength-weak");
    strengthLabel.textContent = "Etat : Faible";
  } else if (score <= 4) {
    strengthFill.classList.add("strength-medium");
    strengthLabel.textContent = "Etat : Moyenne";
  } else if (score <= 6) {
    strengthFill.classList.add("strength-strong");
    strengthLabel.textContent = "Etat : Fort";
  } else {
    strengthFill.classList.add("strength-very-strong");
    strengthLabel.textContent = "Etat : Très fort";
  }
}

// Fonction pour copier le mot de passe
function copyPassword() {
  if (passwordOutput.value === "") {
    copyMessage.textContent = "Veuillez d'abord générer un mot de passe !";
    copyMessage.style.color = "#d60d0d";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 3000);
    return;
  }
  passwordOutput.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copié !";
  copyBtn.classList.add("copied");
  copyMessage.textContent = "";
  setTimeout(() => {
    copyBtn.textContent = "Copier";
    copyBtn.classList.remove("copied");
  }, 2000);
}

// Événements
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
passwordOutput.addEventListener("click", copyPassword);

