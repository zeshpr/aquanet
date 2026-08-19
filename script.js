// ========== Переключение разделов ==========
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

function switchSection(sectionId) {
    // Скрываем все секции
    sections.forEach(section => {
        section.classList.remove('active');
    });
    // Показываем нужную
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Обновляем активный пункт в обеих навигациях
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        switchSection(section);
    });
});

// ========== Создание постов ==========
const publishBtn = document.getElementById('publishBtn');
const postTextarea = document.querySelector('.post-composer textarea');
const feed = document.getElementById('feed');

function createPost(text) {
    if (!text.trim()) return;

    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">🧑</div>
            <div>
                <div class="post-author">Ты</div>
                <div class="post-time">Только что</div>
            </div>
        </div>
        <div class="post-text">${text}</div>
        <div class="post-actions">
            <button class="like-btn">💙 <span class="like-count">0</span></button>
            <button>💬 0</button>
            <button>↪️ 0</button>
        </div>
    `;

    // Добавляем обработчик лайка
    const likeBtn = postCard.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
        const countSpan = likeBtn.querySelector('.like-count');
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
        likeBtn.style.color = '#F06292';
    });

    feed.prepend(postCard); // Добавляем в начало ленты
    postTextarea.value = ''; // Очищаем поле
}

publishBtn.addEventListener('click', () => {
    createPost(postTextarea.value);
});

// Добавляем несколько примеров постов при загрузке
window.addEventListener('DOMContentLoaded', () => {
    const samplePosts = [
        'Сегодня прекрасный день! ☀️ Пусть у всех будет хорошее настроение.',
        'Послушал новый альбом в стиле chillout — рекомендую! 🎵',
        'Прогулка по парку вдохновляет на новые идеи. 🌿',
        'Кто хочет вместе поиграть в онлайн-игру? 🎮'
    ];
    samplePosts.forEach(text => {
        // Немного задерживаем, чтобы создать эффект реальной ленты
        setTimeout(() => createPost(text), 300);
    });
});

// ========== Смена темы (простая демонстрация) ==========
const themeSelect = document.getElementById('themeSelect');
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        const body = document.body;
        if (theme === 'aqua') {
            body.style.background = 'linear-gradient(135deg, #E0F7FA, #B2EBF2, #C8E6C9)';
        } else if (theme === 'grass') {
            body.style.background = 'linear-gradient(135deg, #DCEDC1, #A5D6A7, #C8E6C9)';
        } else if (theme === 'sunset') {
            body.style.background = 'linear-gradient(135deg, #FFE0B2, #FFCC80, #FFAB91)';
        }
    });
}
