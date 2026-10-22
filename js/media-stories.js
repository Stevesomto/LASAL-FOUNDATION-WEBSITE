import { mediaStoriesData } from './data/media-stories.js';
import { scholarVideos, youtubeEmbedSrc, youtubeThumbnail } from './data/scholar-videos.js';

export function renderMediaStories() {
  const videoGrid = document.getElementById('student-video-grid');
  const photoGrid = document.getElementById('student-photo-text-grid');
  if (!videoGrid && !photoGrid) return;

  if (videoGrid) {
    if (scholarVideos.length === 0) {
      videoGrid.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem 0;">
          Video stories from scholars will appear here.
        </p>`;
    } else {
      videoGrid.innerHTML = scholarVideos
        .map(
          (v) => `
        <article class="card media-story-card no-reveal">
          <div class="media-video-wrap${v.format === 'short' ? ' media-video-wrap--short' : ' media-video-wrap--standard'}">
            <button type="button" class="video-facade" data-video-id="${v.videoId}" aria-label="Play ${v.title}">
              <img src="${youtubeThumbnail(v.videoId)}" alt="" class="video-facade-thumb" loading="lazy">
              <span class="video-facade-play" aria-hidden="true"></span>
              <span class="video-facade-label">${v.title}</span>
            </button>
          </div>
          <div class="card-body media-video-card-caption">
            <span class="badge badge-teal">Video</span>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-top: var(--spacing-sm);">Presented by LASAL Foundation. Tap play to watch.</p>
          </div>
        </article>`
        )
        .join('');
      bindVideoFacades(videoGrid);
    }
  }

  if (photoGrid) {
    photoGrid.innerHTML = mediaStoriesData
      .map(
        (s) => `
      <article class="card media-story-card no-reveal">
        <img src="${s.image}" alt="${s.studentName}" style="height: 220px; width: 100%; object-fit: cover; object-position: ${s.imagePosition || 'center top'};">
        <div class="card-body">
          <span class="badge">${s.category}</span>
          <h3 style="font-size: 1.2rem; color: var(--primary-color); margin: var(--spacing-sm) 0;">${s.title}</h3>
          <p style="color: var(--secondary-color); font-weight: 600; font-size: 0.9rem;">${s.studentName}</p>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: var(--spacing-sm); line-height: 1.6;">${s.text}</p>
          ${s.storyId ? `<p style="margin-top: var(--spacing-md);"><a href="story-details.html?id=${s.storyId}" class="btn btn-outline1" style="padding: 0.4rem 1rem; font-size: 0.85rem;">Read story</a></p>` : ''}
        </div>
      </article>`
      )
      .join('');
  }
}

function bindVideoFacades(container) {
  container.querySelectorAll('.video-facade').forEach((btn) => {
    btn.addEventListener('click', () => {
      const videoId = btn.getAttribute('data-video-id');
      if (!videoId) return;
      const wrap = btn.closest('.media-video-wrap');
      if (!wrap) return;

      const iframe = document.createElement('iframe');
      iframe.src = `${youtubeEmbedSrc(videoId)}&autoplay=1`;
      iframe.title = btn.getAttribute('aria-label') || 'LASAL Foundation video';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';

      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    });
  });
}
