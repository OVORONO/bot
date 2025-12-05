// Обработка слайдеров рейтинга
document.addEventListener('DOMContentLoaded', function() {
    const sliders = ['design', 'quality', 'durability', 'comfort'];
    
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = document.getElementById(sliderId + 'Value');
        
        if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
            });
        }
    });

    // Обработка отправки формы
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            evaluateGlass();
        });
    }
});

function evaluateGlass() {
    // Получение значений из формы
    const name = document.getElementById('glassName').value.trim();
    const material = document.getElementById('material').value;
    const design = parseInt(document.getElementById('design').value);
    const quality = parseInt(document.getElementById('quality').value);
    const durability = parseInt(document.getElementById('durability').value);
    const comfort = parseInt(document.getElementById('comfort').value);
    const price = parseFloat(document.getElementById('price').value);
    const comments = document.getElementById('comments').value.trim();

    // Валидация
    if (!name || !material || !price) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }

    // Расчет общей оценки
    const averageScore = (design + quality + durability + comfort) / 4;
    const totalScore = Math.round(averageScore * 10) / 10;

    // Расчет соотношения цена/качество
    const ratio = price > 0 ? (totalScore / price * 1000).toFixed(2) : 0;

    // Отображение результата
    displayResult(name, material, totalScore, price, ratio);

    // Сохранение в localStorage
    saveEvaluation({
        name,
        material,
        design,
        quality,
        durability,
        comfort,
        price,
        comments,
        totalScore,
        ratio,
        date: new Date().toISOString()
    });
}

function displayResult(name, material, score, price, ratio) {
    const resultContainer = document.getElementById('result');
    const materialNames = {
        'glass': 'Стекло',
        'crystal': 'Хрусталь',
        'plastic': 'Пластик',
        'ceramic': 'Керамика',
        'metal': 'Металл'
    };

    document.getElementById('resultName').textContent = name;
    document.getElementById('resultMaterial').textContent = materialNames[material] || material;
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultPrice').textContent = price.toFixed(2);
    document.getElementById('resultRatio').textContent = ratio;

    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function saveEvaluation(evaluation) {
    let evaluations = JSON.parse(localStorage.getItem('glassEvaluations') || '[]');
    evaluations.push(evaluation);
    localStorage.setItem('glassEvaluations', JSON.stringify(evaluations));
}


