// Module de calcul
const Calculator = {
    // Calcul du CJM à partir du SAB
    calculateCJMFromSAB: function(sab) {
        sab = parseFloat(sab);
        if (isNaN(sab) || sab < 0) {
            throw new Error('Le SAB doit être un nombre positif');
        }
        return sab / 140;
    },

    // Calcul du SAB à partir du CJM
    calculateSABFromCJM: function(cjm) {
        cjm = parseFloat(cjm);
        if (isNaN(cjm) || cjm < 0) {
            throw new Error('Le CJM doit être un nombre positif');
        }
        return cjm * 140;
    },

    // Calcul de la marge à partir du CJM et TJM
    calculateMargin: function(cjm, tjm) {
        cjm = parseFloat(cjm);
        tjm = parseFloat(tjm);
        if (isNaN(cjm) || isNaN(tjm)) {
            throw new Error('Le CJM et le TJM doivent être des nombres valides');
        }
        if (cjm <= 0 || tjm <= 0) {
            throw new Error('Le CJM et le TJM doivent être positifs');
        }
        return ((tjm - cjm) / tjm) * 100;
    },

    // Calcul de l'augmentation du SAB
    calculateSABIncrease: function(sab, percentage) {
        sab = parseFloat(sab);
        percentage = parseFloat(percentage);
        if (isNaN(sab) || isNaN(percentage)) {
            throw new Error('Le SAB et le pourcentage doivent être des nombres valides');
        }
        if (sab < 0) {
            throw new Error('Le SAB doit être positif');
        }
        return sab * (1 + percentage / 100);
    },

    // Calcul du pourcentage d'augmentation entre deux SAB
    calculateIncreasePercentage: function(initialSAB, finalSAB) {
        initialSAB = parseFloat(initialSAB);
        finalSAB = parseFloat(finalSAB);
        if (isNaN(initialSAB) || isNaN(finalSAB)) {
            throw new Error('Les deux SAB doivent être des nombres valides');
        }
        if (initialSAB <= 0 || finalSAB <= 0) {
            throw new Error('Les SAB doivent être positifs');
        }
        return ((finalSAB - initialSAB) / initialSAB) * 100;
    },

    // Arrondi à 2 décimales
    round: function(value) {
        return Math.round(value * 100) / 100;
    }
};

// Fonction pour effacer tous les champs de la calculatrice
function clearCalculator() {
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('result').textContent = '-';
}

// Fonction pour mettre à jour les champs en fonction du calcul sélectionné
function updateFields() {
    const operation = document.getElementById('operation').value;
    const input1Label = document.getElementById('input1Label');
    const input2Label = document.getElementById('input2Label');
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const resultLabel = document.getElementById('resultLabel');

    // Réinitialiser les champs
    input1.value = '';
    input2.value = '';
    document.getElementById('result').textContent = '-';

    // Supprimer les anciens écouteurs d'événements
    input1.removeEventListener('input', calculate);
    input2.removeEventListener('input', calculate);

    switch (operation) {
        case 'cjmFromSab':
            input1Label.textContent = 'SAB (€)';
            input2.style.display = 'none';
            input2Label.style.display = 'none';
            resultLabel.textContent = 'CJM (€)';
            input1.addEventListener('input', calculate);
            break;
        case 'sabFromCjm':
            input1Label.textContent = 'CJM (€)';
            input2.style.display = 'none';
            input2Label.style.display = 'none';
            resultLabel.textContent = 'SAB (€)';
            input1.addEventListener('input', calculate);
            break;
        case 'margin':
            input1Label.textContent = 'CJM (€)';
            input2Label.textContent = 'TJM (€)';
            input2.style.display = 'block';
            input2Label.style.display = 'block';
            resultLabel.textContent = 'Marge (%)';
            input1.addEventListener('input', calculate);
            input2.addEventListener('input', calculate);
            break;
        case 'increase':
            input1Label.textContent = 'SAB actuel (€)';
            input2Label.textContent = 'Augmentation (%)';
            input2.style.display = 'block';
            input2Label.style.display = 'block';
            resultLabel.textContent = 'SAB cible (€)';
            input1.addEventListener('input', calculate);
            input2.addEventListener('input', calculate);
            break;
        case 'increasePercentage':
            input1Label.textContent = 'SAB initial (€)';
            input2Label.textContent = 'SAB final (€)';
            input2.style.display = 'block';
            input2Label.style.display = 'block';
            resultLabel.textContent = 'Augmentation (%)';
            input1.addEventListener('input', calculate);
            input2.addEventListener('input', calculate);
            break;
    }
}

// Fonction pour effectuer le calcul
function calculate() {
    const operation = document.getElementById('operation').value;
    const input1 = parseFloat(document.getElementById('input1').value);
    const input2 = parseFloat(document.getElementById('input2').value);
    const resultElement = document.getElementById('result');

    try {
        let result;
        switch (operation) {
            case 'cjmFromSab':
                result = Calculator.calculateCJMFromSAB(input1);
                break;
            case 'sabFromCjm':
                result = Calculator.calculateSABFromCJM(input1);
                break;
            case 'margin':
                if (isNaN(input2)) {
                    throw new Error('Veuillez entrer un TJM valide');
                }
                result = Calculator.calculateMargin(input1, input2);
                break;
            case 'increase':
                if (isNaN(input2)) {
                    throw new Error('Veuillez entrer un pourcentage valide');
                }
                result = Calculator.calculateSABIncrease(input1, input2);
                break;
            case 'increasePercentage':
                if (isNaN(input2)) {
                    throw new Error('Veuillez entrer un SAB final valide');
                }
                result = Calculator.calculateIncreasePercentage(input1, input2);
                break;
            default:
                throw new Error('Opération non valide');
        }

        // Arrondir le résultat à 2 décimales
        result = Calculator.round(result);
        resultElement.textContent = result.toLocaleString('fr-FR') + (operation === 'margin' ? ' %' : ' €');
    } catch (error) {
        resultElement.textContent = 'Erreur: ' + error.message;
    }
}

// Exporter le module pour une utilisation globale
window.Calculator = Calculator;

