const texts = {
    de: {
        title: "Lostwolf-Prozentsatz",
        placeholder: "Gib deinen Namen ein",
        calculateButton: "Berechnen",
        result: (name, percentage) => `${name}, du bist zu <span>${percentage}%</span> ein Lostwolf!`,
        error: "Bitte gib einen Namen ein!"
    },
    en: {
        title: "Lostwolf Percentage",
        placeholder: "Enter your name",
        calculateButton: "Calculate",
        result: (name, percentage) => `${name}, you are <span>${percentage}%</span> a lostwolf!`,
        error: "Please enter a name!"
    }
};

document.getElementById('aurachecker-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('popupModal').style.display = 'flex';
});

var closeBtn = document.getElementsByClassName('close-btn')[0];
    
closeBtn.onclick = function() {
    document.getElementById('popupModal').classList.add('close-animation');
    setTimeout(function() {
        document.getElementById('popupModal').style.display = 'none';
        document.getElementById('popupModal').classList.remove('close-animation');
    }, 1000);
}

window.onclick = function(event) {
    if (event.target == document.getElementById('popupModal')) {
        document.getElementById('popupModal').classList.add('close-animation');
        setTimeout(function() {
            document.getElementById('popupModal').style.display = 'none';
            document.getElementById('popupModal').classList.remove('close-animation');
        }, 1000); 
    }
}

let currentLanguage = 'en';

const alwaysHundredPercentNames = ["juri", "simon", "ruian", "gewessler", "benni"]; 
const alwaysZeroPercentNames = ["vincze", "musk", "elon musk", "kickl", "putin", "trump", "höcke", "emin", "afd", "fpö", "övp", "walter rosenkranz", "hitler", "adolf hitler", "adolf", "nazis", "nzs"]; 

function loadPercentages() {
    const percentages = localStorage.getItem('percentages');
    return percentages ? JSON.parse(percentages) : {};
}

function savePercentages(percentages) {
    localStorage.setItem('percentages', JSON.stringify(percentages));
}

function changeLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    document.getElementById('title').textContent = texts[currentLanguage].title;
    document.getElementById('nameInput').placeholder = texts[currentLanguage].placeholder;
    document.getElementById('calculateButton').textContent = texts[currentLanguage].calculateButton;
}

function calculateLostwolf() {
    const name = document.getElementById('nameInput').value.toLowerCase();
    const resultElement = document.getElementById('result');
    
    if (name.trim() === "") {
        resultElement.innerHTML = texts[currentLanguage].error;
        resultElement.style.color = "#ff0000"; 
        return;
    }

    const percentages = loadPercentages();
    let percentage;

    if (alwaysHundredPercentNames.includes(name)) {
        percentage = 100; 
    } else if (alwaysZeroPercentNames.includes(name)) {
        percentage = 0; 
    } else if (percentages.hasOwnProperty(name)) {
        percentage = percentages[name];
    } else {
        percentage = Math.floor(Math.random() * 101);
        percentages[name] = percentage;
        savePercentages(percentages);
    }

    if (percentage === 0) {
        resultElement.innerHTML = texts[currentLanguage].result(name, percentage);
        resultElement.style.color = "#ffffff";
        return;
    }

    let currentPercentage = 0;
    const interval = setInterval(() => {
        if (currentPercentage < percentage) {
            currentPercentage++;
            resultElement.innerHTML = texts[currentLanguage].result(name, currentPercentage);
        } else {
            clearInterval(interval);
        }
    }, 40);

    resultElement.style.color = "#ffffff";
}