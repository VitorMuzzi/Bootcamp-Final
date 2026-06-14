// ── Modal Helpers ──────────────────────────────────────────────────────────────

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
};

// ── Tech Modal ─────────────────────────────────────────────────────────────────

function openTechModal(title, iconClass, text) {
    document.getElementById('modalTechTitle').innerText = title;
    const icon = document.getElementById('modalTechIcon');
    icon.className = '';
    icon.classList.add(iconClass === 'fa-database' ? 'fa-solid' : 'fa-brands');
    icon.classList.add(iconClass);
    document.getElementById('modalTechText').innerText = text;
    openModal('techModal');
}

// ── Project Modal ──────────────────────────────────────────────────────────────

let currentProjectImages = [];
let currentImageIndex = 0;

function openProjectModal(title, imagesArray, description, repoUrl, demoUrl) {
    document.getElementById('modalProjectTitle').innerText = title;
    document.getElementById('modalProjectDesc').innerText = description;

    const repoBtn = document.getElementById('modalProjectRepoBtn');
    repoBtn.href = repoUrl || '#';
    repoBtn.style.display = repoUrl ? 'inline-flex' : 'none';

    const demoBtn = document.getElementById('modalProjectDemoBtn');
    demoBtn.href = demoUrl || '#';
    demoBtn.style.display = demoUrl ? 'inline-flex' : 'none';

    currentProjectImages = imagesArray || [];
    currentImageIndex = 0;

    const gallerySection = document.getElementById('project-gallery-section');
    const mainImg = document.getElementById('modalProjectMainImg');
    const thumbsContainer = document.getElementById('modalProjectThumbs');
    thumbsContainer.innerHTML = '';

    if (currentProjectImages.length > 0) {
        gallerySection.style.display = 'block';
        mainImg.src = currentProjectImages[0];
        mainImg.style.display = 'block';

        currentProjectImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Miniatura ${index + 1}`;
            thumb.classList.add('thumbnail');
            if (index === 0) thumb.classList.add('active');
            thumb.onclick = () => changeMainImage(index);
            thumbsContainer.appendChild(thumb);
        });

        thumbsContainer.style.display = currentProjectImages.length > 1 ? 'flex' : 'none';
    } else {
        gallerySection.style.display = 'none';
        mainImg.style.display = 'none';
        thumbsContainer.style.display = 'none';
    }

    openModal('projectModal');
}

function changeMainImage(index) {
    currentImageIndex = index;
    const mainImg = document.getElementById('modalProjectMainImg');
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = currentProjectImages[index];
        mainImg.style.opacity = '1';
        document.querySelectorAll('.thumbnail').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }, 200);
}

document.addEventListener('keydown', function (event) {
    const projectModal = document.getElementById('projectModal');
    if (!projectModal.classList.contains('active') || currentProjectImages.length <= 1) return;

    if (event.key === 'ArrowRight') {
        changeMainImage((currentImageIndex + 1) % currentProjectImages.length);
    } else if (event.key === 'ArrowLeft') {
        changeMainImage((currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length);
    }
});

// ── GitHub API Integration ─────────────────────────────────────────────────────

const GITHUB_USERNAME = 'VitorMuzzi';

const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python:     '#3572A5',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    Java:       '#b07219',
    'C#':       '#178600',
    'C++':      '#f34b7d',
    C:          '#555555',
    Go:         '#00ADD8',
    Rust:       '#dea584',
    PHP:        '#4F5D95',
    Ruby:       '#701516',
    Swift:      '#ffac45',
    Kotlin:     '#A97BFF',
    Shell:      '#89e051',
};

async function initGitHub() {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user = await userRes.json();
        const repos = await reposRes.json();

        renderGitHubProfile(user);
        renderGitHubRepos(repos);
    } catch (_) {
        renderGitHubError();
    }
}

function renderGitHubProfile(user) {
    const avatar = document.getElementById('github-avatar');
    const skeleton = document.getElementById('github-avatar-skeleton');

    avatar.onload = () => {
        avatar.style.display = 'block';
        if (skeleton) skeleton.style.display = 'none';
    };
    avatar.src = user.avatar_url;

    document.getElementById('github-name').textContent = user.name || user.login;

    const bioEl = document.getElementById('github-bio');
    if (user.bio) {
        bioEl.textContent = user.bio;
        bioEl.style.display = 'block';
    } else {
        bioEl.style.display = 'none';
    }

    document.getElementById('github-repos-count').textContent = user.public_repos;
    document.getElementById('github-followers-count').textContent = user.followers;
    document.getElementById('github-following-count').textContent = user.following;
}

function renderGitHubRepos(repos) {
    const grid = document.getElementById('repos-grid');

    if (!repos || repos.length === 0) {
        grid.innerHTML = '<p class="repos-empty">Nenhum repositório público encontrado.</p>';
        return;
    }

    grid.innerHTML = repos.map(repo => {
        const color = LANGUAGE_COLORS[repo.language] || '#8b949e';
        const rawDesc = repo.description || 'Sem descrição disponível.';
        const desc = rawDesc.length > 110 ? rawDesc.slice(0, 107) + '...' : rawDesc;

        return `
            <a href="${repo.html_url}" target="_blank" class="repo-card">
                <div class="repo-card-header">
                    <i class="fa-solid fa-book-open repo-icon"></i>
                    <span class="repo-name-text">${repo.name}</span>
                    ${repo.fork ? '<span class="repo-fork-badge">Fork</span>' : ''}
                </div>
                <p class="repo-desc-text">${desc}</p>
                <div class="repo-card-footer">
                    ${repo.language ? `
                        <span class="repo-language-tag">
                            <span class="lang-dot" style="background:${color}"></span>
                            ${repo.language}
                        </span>` : ''}
                    <span class="repo-stat-tag"><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                    <span class="repo-stat-tag"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                    <span class="repo-updated-tag">${timeAgo(repo.updated_at)}</span>
                </div>
            </a>
        `;
    }).join('');
}

function renderGitHubError() {
    document.getElementById('github-name').textContent = 'Vitor Gomes Muzzi';
    document.getElementById('repos-grid').innerHTML = `
        <div class="repos-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>Não foi possível carregar os repositórios.</p>
            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn btn-outline" style="margin-top: 14px; font-size: 0.9rem;">
                <i class="fa-brands fa-github"></i> Ver no GitHub
            </a>
        </div>
    `;
}

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)       return 'agora';
    if (diff < 3600)     return `${Math.floor(diff / 60)}min atrás`;
    if (diff < 86400)    return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 2592000)  return `${Math.floor(diff / 86400)}d atrás`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} meses atrás`;
    return new Date(dateStr).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', initGitHub);
