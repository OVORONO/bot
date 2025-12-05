document.addEventListener('DOMContentLoaded', function() {
    loadEvaluations();
    
    const clearBtn = document.getElementById('clearBtn');
    const sortBtn = document.getElementById('sortBtn');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите очистить всю историю оценок?')) {
                localStorage.removeItem('glassEvaluations');
                loadEvaluations();
            }
        });
    }
    
    if (sortBtn) {
        let sortAscending = true;
        sortBtn.addEventListener('click', function() {
            sortEvaluations(sortAscending);
            sortAscending = !sortAscending;
            this.textContent = sortAscending ? 'Сортировать по оценке ↑' : 'Сортировать по оценке ↓';
        });
    }
});

function loadEvaluations() {
    const evaluations = JSON.parse(localStorage.getItem('glassEvaluations') || '[]');
    const resultsList = document.getElementById('resultsList');
    
    if (evaluations.length === 0) {
        resultsList.innerHTML = '<p class="empty-message">Нет сохраненных оценок. Перейдите на главную страницу, чтобы добавить оценку.</p>';
        document.getElementById('statistics').style.display = 'none';
        return;
    }
    
    // Отображение оценок
    resultsList.innerHTML = evaluations.map((eval, index) => createEvaluationCard(eval, index)).join('');
    
    // Отображение статистики
    displayStatistics(evaluations);
}

function createEvaluationCard(evaluation, index) {
    const materialNames = {
        'glass': 'Стекло',
        'crystal': 'Хрусталь',
        'plastic': 'Пластик',
        'ceramic': 'Керамика',
        'metal': 'Металл'
    };
    
    const date = new Date(evaluation.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `
        <div class="evaluation-card">
            <h3>${evaluation.name}</h3>
            <div class="card-info">
                <div class="info-item">
                    <span class="info-label">Материал</span>
                    <span class="info-value">${materialNames[evaluation.material] || evaluation.material}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Общая оценка</span>
                    <span class="info-value">${evaluation.totalScore}/10</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Цена</span>
                    <span class="info-value">${evaluation.price.toFixed(2)} руб.</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Дата оценки</span>
                    <span class="info-value">${formattedDate}</span>
                </div>
            </div>
            <div class="ratings">
                <div class="rating-item">
                    <span class="rating-label">Дизайн:</span>
                    <span class="rating-number">${evaluation.design}/10</span>
                </div>
                <div class="rating-item">
                    <span class="rating-label">Качество:</span>
                    <span class="rating-number">${evaluation.quality}/10</span>
                </div>
                <div class="rating-item">
                    <span class="rating-label">Прочность:</span>
                    <span class="rating-number">${evaluation.durability}/10</span>
                </div>
                <div class="rating-item">
                    <span class="rating-label">Удобство:</span>
                    <span class="rating-number">${evaluation.comfort}/10</span>
                </div>
            </div>
            ${evaluation.comments ? `<div class="comments">"${evaluation.comments}"</div>` : ''}
        </div>
    `;
}

function displayStatistics(evaluations) {
    const totalEvaluations = evaluations.length;
    const averageScore = evaluations.reduce((sum, e) => sum + e.totalScore, 0) / totalEvaluations;
    const bestScore = Math.max(...evaluations.map(e => e.totalScore));
    const averagePrice = evaluations.reduce((sum, e) => sum + e.price, 0) / totalEvaluations;
    
    document.getElementById('totalEvaluations').textContent = totalEvaluations;
    document.getElementById('averageScore').textContent = averageScore.toFixed(1);
    document.getElementById('bestScore').textContent = bestScore.toFixed(1);
    document.getElementById('averagePrice').textContent = averagePrice.toFixed(2);
    
    document.getElementById('statistics').style.display = 'block';
}

function sortEvaluations(ascending) {
    const evaluations = JSON.parse(localStorage.getItem('glassEvaluations') || '[]');
    evaluations.sort((a, b) => {
        return ascending ? b.totalScore - a.totalScore : a.totalScore - b.totalScore;
    });
    localStorage.setItem('glassEvaluations', JSON.stringify(evaluations));
    loadEvaluations();
}


