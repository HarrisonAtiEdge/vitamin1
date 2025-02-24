const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  './styles/modstyle.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  [
    [
      './images/Board.png',
      './images/Button.png',
      './images/Evion-Logo.png',
      './images/MartinDowLogo.png',
      './images/newBuzzerBoard.png',
      './images/Round1.png',
      './images/Round2.png',
      './images/Round3.png',
      './images/Round_1_Logo.png',
      './images/Round_2_Logo.png',
      './images/Round_2_Nutrition_Information.webp',
      './images/Round_3_Logo.png',
      './images/Round_3_Puzzle.webp',
      './images/Rounds-Box.png',
      './images/RulesBG.webp',
      './images/RulesBoxRound3.png',
      './images/TheVitaminSocietyLogo.png',
      './images/timer_container.png'
    ]
    
]

[
    //sound files
  './sound/NewTimer15-Sec.mp3',
  './sound/Winning.mp3',
  './sound/wrong-answer-Buzzer.mp3',
  './sound/click.mp3',
  './sound/Background-Music.mp3',

  'https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm',
  'https://cdn.glitch.global/288dd902-7c05-4722-a0c8-ddacf343acf2/qr.webp?v=1717409277484'
]
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return Promise.all(urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Request for ${url} failed with status ${response.status}`);
            }
            return cache.put(url, response);
          }).catch(error => {
            console.error(`Failed to cache ${url}:`, error);
          });
        }));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});