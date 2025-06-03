// Common functionality shared across pages
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Check authentication for protected pages
    if (!window.location.pathname.includes('index.html') && 
        window.location.pathname !== '/' && 
        !window.location.pathname.endsWith('/')) {
        if (!requireAuth()) return;
    }
    
    // Initialize common elements
    setupNavigation();
    setupUserInfo();
    loadPageContent();
}

function setupNavigation() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Set up navigation based on user role
    const navTabs = document.querySelector('.nav-tabs-list');
    if (navTabs) {
        navTabs.innerHTML = getNavigationHTML(user.role);
    }
}

function getNavigationHTML(role) {
    const baseNavigation = {
        developer: [
            { name: 'Dashboard', url: 'dashboard.html' },
            { name: 'Challenges', url: 'challenges.html' },
            { name: 'Leaderboard', url: 'leaderboard.html' },
            { name: 'My Profile', url: 'profile.html' }
        ],
        sponsor: [
            { name: 'Dashboard', url: 'dashboard.html' },
            { name: 'Challenges', url: 'challenges.html' },
            { name: 'Leaderboard', url: 'leaderboard.html' },
            { name: 'My Actions', url: 'my-actions.html' }
        ],
        moderator: [
            { name: 'Dashboard', url: 'dashboard.html' },
            { name: 'Challenges', url: 'challenges.html' },            
            { name: 'Leaderboard', url: 'leaderboard.html'},
            { name: 'Submissions', url: 'submissions.html' }
        ]
    };
    
    const nav = baseNavigation[role] || [];
    const currentPage = getCurrentPageName();
    
    return nav.map(item => 
        `<a href="${item.url}" class="nav-tab ${currentPage === item.url ? 'active' : ''}">${item.name}</a>`
    ).join('');
}

function getCurrentPageName() {
    const path = window.location.pathname;
    return path.split('/').pop();
}

function setupUserInfo() {
    const user = getCurrentUser();
    if (!user) return;
    
    const userInfoElements = document.querySelectorAll('.user-info');
    userInfoElements.forEach(element => {
        element.innerHTML = `
            <span class="role-badge">${user.role}</span>
            <span>${user.username}</span>
            <button class="logout-btn" onclick="logout()">Logout</button>
        `;
    });
}

function loadPageContent() {
    const currentPage = getCurrentPageName();
    const user = getCurrentUser();
    
    if (!user) return;
    
    // Load page-specific content based on current page and user role
    switch(currentPage) {
        case 'dashboard.html':
            loadDashboard(user.role);
            break;
        case 'challenges.html':
            loadChallenges(user.role);
            break;
        case 'leaderboard.html':
            loadLeaderboard();
            break;
        case 'profile.html':
            loadProfile();
            break;
        case 'my-actions.html':
            loadMyActions();
            break;
        case 'submissions.html':
            loadSubmissions();
            break;
        case 'create-challenge.html':
           // setupChallengeForm();
            break;
        case 'challenge-details.html':
            //loadChallengeDetails();
            break;
    }
}

function loadDashboard(role) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    const dashboardContent = {
        developer: generateDeveloperDashboard(),
        sponsor: generateSponsorDashboard(),
        moderator: generateModeratorDashboard()
    };
    
    mainContent.innerHTML = dashboardContent[role] || '';
}

function generateDeveloperDashboard() {
    const user = getCurrentUser();
    const recentChallenges = getChallenges('open').slice(0, 3);
    
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Challenges Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">2,450</div>
                <div class="stat-label">Total Score</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">5</div>
                <div class="stat-label">Badges Earned</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">15</div>
                <div class="stat-label">Global Rank</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Recent Open Challenges</h2>
                <a href="challenges.html" class="btn btn-primary">View All</a>
            </div>
            <div class="challenge-grid">
                ${recentChallenges.map(challenge => generateChallengeCard(challenge)).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">My Recent Activity</h2>
            </div>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-icon">🏆</div>
                    <div class="activity-content">
                        <div class="activity-title">Completed "AI Chatbot Challenge"</div>
                        <div class="activity-time">2 days ago</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon">⭐</div>
                    <div class="activity-content">
                        <div class="activity-title">Earned "Innovation Master" badge</div>
                        <div class="activity-time">1 week ago</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateSponsorDashboard() {
    const myChallenges = getChallenges().filter(c => c.sponsor === 'TechCorp Inc.').slice(0, 3);
    
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">5</div>
                <div class="stat-label">Active Challenges</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">127</div>
                <div class="stat-label">Total Submissions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">23</div>
                <div class="stat-label">Developers Engaged</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">$15K</div>
                <div class="stat-label">Total Rewards</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">My Challenges</h2>
                <a href="create-challenge.html" class="btn btn-success">Create New Challenge</a>
            </div>
            <div class="challenge-grid">
                ${myChallenges.map(challenge => generateChallengeCard(challenge, true)).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Recent Submissions</h2>
            </div>
            <div class="submissions-list">
                <div class="submission-item">
                    <div class="submission-info">
                        <div class="submission-title">AI Chatbot Solution by Alex Chen</div>
                        <div class="submission-score">AI Score: 85/100 | Judge Score: 4.2/5</div>
                    </div>
                    <div class="submission-actions">
                        <button class="btn btn-info">Review</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateModeratorDashboard() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">45</div>
                <div class="stat-label">Submissions Reviewed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Badges Awarded</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">8</div>
                <div class="stat-label">Active Challenges</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">4.7</div>
                <div class="stat-label">Avg. Review Score</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Pending Reviews</h2>
            </div>
            <div class="submissions-list">
                <div class="submission-item">
                    <div class="submission-info">
                        <div class="submission-title">Real-time Dashboard by Sarah Johnson</div>
                        <div class="submission-meta">AI Score: 78/100 | Submitted: 2 hours ago</div>
                    </div>
                    <div class="submission-actions">
                        <button class="btn btn-primary">Review Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadChallenges(role) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    //const challenges = getChallenges();
    const challenges = getChallengesfromDB();
    
    mainContent.innerHTML = `
        <div class="filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="new">New</button>
            <button class="filter-btn" data-filter="open">Open</button>
            <button class="filter-btn" data-filter="closed">Closed</button>
            <button class="filter-btn" data-filter="AI/ML">AI/ML</button>
            <button class="filter-btn" data-filter="Frontend">Frontend</button>
            <button class="filter-btn" data-filter="Blockchain">Blockchain</button>
        </div>
        
        ${role === 'sponsor' ? '<div class="text-right mb-4"><a href="create-challenge.html" class="btn btn-success">Create New Challenge</a></div>' : ''}
        
        <div class="challenge-grid" id="challenge-grid">
            ${challenges.map(challenge => generateChallengeCard(challenge, role === 'sponsor')).join('')}
        </div>
    `;
    
    // Setup filter functionality
    setupChallengeFilters();
}

function generateChallengeCard(challenge, isOwner = false) {
    return `
        <div class="card challenge-card" onclick="viewChallengeDetails(${challenge.id})">
            <div class="challenge-status status-${challenge.status}">${challenge.status}</div>
            <h3>${challenge.title}</h3>
            <p>${challenge.overview}</p>
            <div class="challenge-meta">
                <span class="challenge-sponsor">by ${challenge.sponsor}</span>
                <span class="challenge-reward">${challenge.reward}</span>
            </div>
            <div class="challenge-stats">
                <small>${challenge.submissions} submissions • Closes: ${challenge.closeDate}</small>
            </div>
            ${isOwner ? `<div class="challenge-actions mt-3">
                <button class="btn btn-info" onclick="event.stopPropagation(); viewSubmissions(${challenge.id})">View Submissions</button>
            </div>` : ''}
        </div>
    `;
}

function setupChallengeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter challenges
            const filter = this.dataset.filter;
            const filteredChallenges = getChallenges(filter);
            const challengeGrid = document.getElementById('challenge-grid');
            challengeGrid.innerHTML = filteredChallenges.map(challenge => 
                generateChallengeCard(challenge, getCurrentUser().role === 'sponsor')
            ).join('');
        });
    });
}

function loadLeaderboard() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    mainContent.innerHTML = `
        <div class="leaderboard-sections">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🏆 All Time Top Scorers</h3>
                </div>
                <div class="leaderboard-list">
                    ${generateLeaderboardList(getLeaderboard('allTime'))}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📅 Monthly Top Scorers</h3>
                </div>
                <div class="leaderboard-list">
                    ${generateLeaderboardList(getLeaderboard('monthly'))}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">⚡ This Week Top Scorers</h3>
                </div>
                <div class="leaderboard-list">
                    ${generateLeaderboardList(getLeaderboard('weekly'))}
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🎯 Top Scorer Per Challenge</h3>
                </div>
                <div class="challenge-leaders">
                    ${generateChallengeLeaders()}
                </div>
            </div>
        </div>
    `;
}

function generateLeaderboardList(users) {
    return users.map((user, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        return `
            <div class="leaderboard-item">
                <div class="rank ${rankClass}">${index + 1}</div>
                <div class="user-info-item">
                    <div class="user-name">${user.name}</div>
                    <div class="user-score">${user.score} points</div>
                    <div class="badges">
                        ${user.badges.map(badge => `<span class="badge badge-primary">${badge}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateChallengeLeaders() {
    const challenges = getChallenges();
    return challenges.slice(0, 3).map(challenge => `
        <div class="challenge-leader">
            <h4>${challenge.title}</h4>
            <div class="leader-info">
                <span class="leader-name">Alex Chen</span>
                <span class="leader-score">Score: 95/100</span>
            </div>
        </div>
    `).join('');
}

function viewChallengeDetails(challengeId) {
    window.location.href = `challenge-details.html?id=${challengeId}`;
}

function viewSubmissions(challengeId) {
    window.location.href = `submissions.html?challengeId=${challengeId}`;
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 5000);
}

async function sendtoSupabase(action, sendData) {
    const apiPath = sampleData.urls.find(url => url.name === 'fastAPI').url.concat(action);
    const stringifiedJSON = JSON.stringify(sendData);
    
    try {
        const response = await fetch(`${apiPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },        
            body: stringifiedJSON
        });
        const data = await response.json();
        console.log('Success:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error creating challenge', 'error');
        throw error;
    }
}

function submitChallenge(){       
    const challengeData = {
        sponsor_id: 1,
        status_id: 1,
        title: document.getElementById('title').value,
        overview: document.getElementById('overview').value,
        problem_statement: document.getElementById('problemStatement').value,
        start_date: document.getElementById('startDate').value,
        close_date: document.getElementById('closeDate').value,
        scope_exclusions: document.getElementById('scopeExclusions').value,
        guidlines: "",
        //uploads: document.getElementById('files').files,
        uploads: "FILE PATH",
        appType_id: 5,
        win_declare_date: document.getElementById('closeDate').value,
        reward_type_id: document.getElementById('rewardType').value,
        sponsor_id:1,
        description:document.getElementById('rewardDescription').value,
        value:document.getElementById('rewardValue').value
    };      
    
    responseData = sendtoSupabase('/create_challengeAll',challengeData);
   
    //console.log('responseData',responseData);
    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = 'Reward created successfully!';
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.padding = '20px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
    //document.getElementById('challengeForm').reset();   
   
}

function getChallengesfromDB(){
    alert('this works');
}