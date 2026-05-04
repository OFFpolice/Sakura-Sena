const feed = document.getElementById('feed');
const loader = document.getElementById('loader');

let page = 1;
let loading = false;

// Демо видео (можно заменить на API)
const videos = [
    {
        title: "Big Buck Bunny",
        url: "https://videotourl.com/videos/1776258938636-84af6068-252d-4857-bf60-c7841625d5b1.mp4"
    },
    {
        title: "Sample Video",
        url: "https://videotourl.com/videos/1774408888308-289df404-1679-4bd5-b8ca-c802e53cab99.mp4"
    }
];

// Создание карточки
function createVideo(videoData) {
    const card = document.createElement('div');
    card.className = 'video-card';

    card.innerHTML = `
        <video controls preload="metadata">
            <source src="${videoData.url}" type="video/mp4">
        </video>
        <div class="video-info">
            <h3>${videoData.title}</h3>
        </div>
    `;

    return card;
}

// Загрузка видео
async function loadVideos() {
    if (loading) return;

    loading = true;
    loader.style.display = 'block';

    await new Promise(r => setTimeout(r, 1000));

    videos.forEach(video => {
        feed.appendChild(createVideo(video));
    });

    loader.style.display = 'none';
    loading = false;
    page++;
}

// Infinite scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadVideos();
    }
});

// Первая загрузка
loadVideos();
