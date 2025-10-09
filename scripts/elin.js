document.addEventListener('DOMContentLoaded', () => {
  // Modal functionality
  const modal = document.getElementById('technical-modal');
  const openBtn = document.getElementById('technical-elin');

  if (modal && openBtn) {
    const closeModal = () => {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
    };

    openBtn.addEventListener('click', () => {
      modal.removeAttribute('hidden');
      document.body.classList.add('modal-open');
      loadGitHubCommits();
    });

    modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
    modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
  }

  // GitHub Commits 
  async function loadGitHubCommits() {
    const container = document.getElementById('commits-container');
    if (!container) return;

    const GITHUB_USERNAME = 'elinfelicia';
    const REPO_NAME = 'spektra'; 
    const MAX_COMMITS = 10;

    try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/commits?author=${GITHUB_USERNAME}&per_page=${MAX_COMMITS}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits = await response.json();
    
    if (commits.length === 0) {
      container.innerHTML = '<p class="loading">Inga commits hittades.</p>';
      return;
    }

    const commitList = document.createElement('ul');
    commitList.className = 'commit-list';

    commits.forEach(commit => {
      const commitItem = document.createElement('li');
      commitItem.className = 'commit-item';

      const date = new Date(commit.commit.author.date);
      const formattedDate = date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const shortSha = commit.sha.substring(0, 7);
      const message = commit.commit.message.split('\n')[0]; 

      commitItem.innerHTML = `
        <div class="commit-header">
          ${commit.author ? `<img src="${commit.author.avatar_url}" alt="${commit.commit.author.name}" class="commit-avatar">` : ''}
          <span class="commit-author">${commit.commit.author.name}</span>
        </div>
        <div class="commit-message">${message}</div>
        <div class="commit-meta">
          <span class="commit-date">${formattedDate}</span>
          <span class="commit-hash">${shortSha}</span>
          <a href="${commit.html_url}" target="_blank" rel="noopener noreferrer" class="commit-link">Se på GitHub →</a>
        </div>
      `;

      commitList.appendChild(commitItem);
    });

    container.innerHTML = '';
    container.appendChild(commitList);

  } catch (error) {
    console.error('Error fetching commits:', error);
    container.innerHTML = `
      <div class="error-message">
        <strong>Kunde inte ladda commits</strong>
        <p>Kontrollera att användarnamn och repository-namn är korrekta i elin.js</p>
        <p><small>Fel: ${error.message}</small></p>
      </div>
    `;
  }
  }
});