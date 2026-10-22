import { renderMediaStories } from './media-stories.js';
import { refreshScrollReveal } from './motion.js';

/** Stories list is static HTML on stories.html (always visible). This module only loads photo/video grids. */
document.addEventListener('DOMContentLoaded', () => {
  renderMediaStories();
  refreshScrollReveal();
});
