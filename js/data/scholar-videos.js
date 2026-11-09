/**
 * YouTube (unlisted) videos on Stories > Video Stories.
 * group: 'alumni' (scholars and alumni) or 'parent' (shown under Testimonies of Parents).
 * For no personal channel name on site: re-upload to a LASAL YouTube channel, self-host MP4, or use Vimeo.
 */
export const scholarVideos = [
  {
    id: 'lasal-video-1',
    videoId: 'ZAguu_YJ4wY',
    group: 'parent',
    title: 'Appreciation video 1',
    watchUrl: 'https://youtube.com/shorts/ZAguu_YJ4wY',
    format: 'short',
  },
  {
    id: 'lasal-video-2',
    videoId: '_vojy4dqgAI',
    group: 'alumni',
    title: 'Appreciation video 2',
    watchUrl: 'https://youtu.be/_vojy4dqgAI',
    format: 'short',
  },
  {
    id: 'lasal-video-3',
    videoId: 'VVb7iTdI--o',
    group: 'parent',
    title: 'Appreciation video 3',
    watchUrl: 'https://youtube.com/shorts/VVb7iTdI--o',
    format: 'short',
  },
  {
    id: 'lasal-video-4',
    videoId: 'DqmeHowtLhg',
    group: 'alumni',
    title: 'Appreciation video 4',
    watchUrl: 'https://youtu.be/DqmeHowtLhg',
    format: 'short',
  },
  {
    id: 'lasal-video-5',
    videoId: 'y2VXDxXHDCs',
    group: 'alumni',
    title: 'Appreciation video 5',
    watchUrl: 'https://youtu.be/y2VXDxXHDCs',
    format: 'short',
  },
  {
    id: 'lasal-video-6',
    videoId: '9uU3CojG2Aw',
    group: 'alumni',
    title: 'Appreciation video 6',
    watchUrl: 'https://youtu.be/9uU3CojG2Aw',
    format: 'short',
  },

  {
    id: 'lasal-video-7',
    videoId: 'N4TTDZ-BapQ',
    group: 'alumni',
    title: 'Appreciation video 7',
    watchUrl: 'https://youtu.be/N4TTDZ-BapQ',
    format: 'short',
  },
];

/** Privacy-enhanced embed with minimal YouTube chrome (channel name still appears after play). */
export function youtubeEmbedSrc(videoId) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function youtubeThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
