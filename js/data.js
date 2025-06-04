// Sample data for the application
const sampleData = {
    users: [
        { id: 1, username: 'john_dev', password: 'password', role: 'developer', name: 'John Developer', email: 'john@example.com' },
        { id: 2, username: 'jane_sponsor', password: 'password', role: 'sponsor', name: 'Jane Sponsor', email: 'jane@company.com' },
        { id: 3, username: 'mike_mod', password: 'password', role: 'moderator', name: 'Mike Moderator', email: 'mike@example.com' }
    ],
    
    challenges: [
        {
            id: 1,
            title: 'AI-Powered Customer Support Chatbot',
            overview: 'Build an intelligent chatbot that can handle customer queries with natural language processing.',
            problemStatement: 'Companies need better automated customer support solutions that can understand context and provide relevant responses.',
            sponsor: 'TechCorp Inc.',
            reward: '$5000',
            startDate: '2025-05-01',
            closeDate: '2025-06-15',
            status: 'open',
            category: 'AI/ML',
            submissions: 12,
            guidelines: 'Use modern NLP libraries, implement context awareness, include demo video',
            scopeExclusion: 'No pre-built chatbot platforms allowed'
        },
        {
            id: 2,
            title: 'Real-time Data Visualization Dashboard',
            overview: 'Create a dynamic dashboard for visualizing streaming data with interactive charts.',
            problemStatement: 'Need a solution to visualize real-time metrics and KPIs for business intelligence.',
            sponsor: 'DataFlow Systems',
            reward: '$3000',
            startDate: '2025-05-10',
            closeDate: '2025-06-30',
            status: 'open',
            category: 'Frontend',
            submissions: 8,
            guidelines: 'Use React/Vue, implement WebSocket connections, responsive design required',
            scopeExclusion: 'No template-based solutions'
        },
        {
            id: 3,
            title: 'Blockchain Supply Chain Tracker',
            overview: 'Develop a blockchain-based system to track products through the supply chain.',
            problemStatement: 'Supply chains lack transparency and traceability for product authenticity.',
            sponsor: 'ChainTech Solutions',
            reward: '$7000',
            startDate: '2025-04-15',
            closeDate: '2025-05-30',
            status: 'closed',
            category: 'Blockchain',
            submissions: 25,
            guidelines: 'Use Ethereum or Polygon, implement smart contracts, include mobile app',
            scopeExclusion: 'No centralized databases for core tracking'
        }
    ],
    
    leaderboard: {
        allTime: [
            { id: 1, name: 'Alex Chen', score: 2850, badges: ['Innovation Master', 'AI Expert'] },
            { id: 2, name: 'Sarah Johnson', score: 2720, badges: ['UX Champion', 'Full Stack Pro'] },
            { id: 3, name: 'David Kim', score: 2650, badges: ['Blockchain Guru', 'Security Expert'] },
            { id: 4, name: 'Maria Garcia', score: 2580, badges: ['Data Scientist', 'ML Specialist'] },
            { id: 5, name: 'James Wilson', score: 2490, badges: ['Frontend Master', 'Design Pro'] }
        ],
        monthly: [
            { id: 1, name: 'Sarah Johnson', score: 890, badges: ['Monthly Top', 'Consistent Performer'] },
            { id: 2, name: 'Alex Chen', score: 750, badges: ['Innovation Award'] },
            { id: 3, name: 'David Kim', score: 680, badges: ['Quality Code'] },
            { id: 4, name: 'Lisa Park', score: 620, badges: ['Rising Star'] },
            { id: 5, name: 'Tom Anderson', score: 580, badges: ['Team Player'] }
        ],
        weekly: [
            { id: 1, name: 'Maria Garcia', score: 320, badges: ['Weekly Champion'] },
            { id: 2, name: 'Alex Chen', score: 280, badges: ['Rapid Developer'] },
            { id: 3, name: 'Sarah Johnson', score: 260, badges: ['Consistent'] },
            { id: 4, name: 'David Kim', score: 240, badges: ['Quality Focus'] },
            { id: 5, name: 'James Wilson', score: 220, badges: ['Creative Solution'] }
        ]
    },
    
    submissions: [
        {
            id: 1,
            challengeId: 1,
            developerId: 1,
            developerName: 'Alex Chen',
            githubLink: 'https://github.com/alexchen/chatbot-ai',
            demoLink: 'https://chatbot-demo.vercel.app',
            videoLink: 'https://youtube.com/watch?v=abc123',
            pitchDeck: 'https://slides.com/alexchen/chatbot-pitch',
            notes: 'Implemented using GPT-3.5 with custom training on customer support data.',
            aiScore: 85,
            moderatorScore: 4.2,
            badges: ['Most Innovative', 'Best UX'],
            submittedAt: '2025-05-20'
        }
    ],

    sponsor: [
        {
            id: 1,            
            name: 'TechCorp Inc.',
            description: 'TechCorp Inc. is a leading technology company that provides innovative solutions for businesses.',
            logo: 'https://via.placeholder.com/150',
            website: 'https://techcorp.com',
            contact: 'contact@techcorp.com',
            email: 'techcorp@example.com',
            phone: '+1234567890',
            address: '123 Main St, Anytown, USA'
        },
        {
            id: 2,
            name: 'DataFlow Systems',
            description: 'DataFlow Systems is a leading data analytics company that provides innovative solutions for businesses.',
            logo: 'https://via.placeholder.com/150',
            website: 'https://dataflowsystems.com',
            contact: 'contact@dataflowsystems.com',
            email: 'dataflowsystems@example.com',
            phone: '+919876543210',
            address: '786 B wing, 3rd floor, 100xEliteBuilders, Mumbai, India'
        },
        {            
            id: 3,
            name: 'ChainTech Solutions',
            description: 'ChainTech Solutions is a leading blockchain technology company that provides innovative solutions for businesses.',
            logo: 'https://via.placeholder.com/150',
            website: 'https://chaintechsolutions.com',
            contact: 'contact@chaintechsolutions.com',
            email: 'chaintechsolutions@example.com',
            phone: '+935224444',
            address: 'Chruch street, Bangaluru, India'           
        }
    ],
    reward_type: [
        { id: 1, type: 'Cash', description: 'specify in dollars'},       
        { id: 2, type: 'Kind', description: 'e.g Opportunity to intership with the sponsor'}
    ],

    urls: [
        { name:'fastAPI', url:'https://praveen-k-s-100xbuilder-apiservice.hf.space'},       
        { name:'supabaseAPI', url:'http://127.0.0.1:8000'}
    ]
};

// Store data in memory (replacing localStorage functionality)
let appData = { ...sampleData };
let currentUser = null;

// Data management functions
function saveData() {
    // In a real app, this would save to a backend
    console.log('Data saved to memory');
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("currentUser"));
    //return currentUser;
}

function setCurrentUser(user) {
    //currentUser = user;
    sessionStorage.setItem("currentUser", JSON.stringify(user));
}

function getChallenges(filter = 'all') {
    let challenges = appData.challenges;
    
    if (filter !== 'all') {
        challenges = challenges.filter(challenge => {
            switch(filter) {
                case 'new':
                    return new Date(challenge.startDate) > new Date(Date.now() - 7*24*60*60*1000);
                case 'open':
                    return challenge.status === 'open';
                case 'closed':
                    return challenge.status === 'closed';
                default:
                    return challenge.category === filter;
            }
        });
    }
    
    return challenges;
}

function getLeaderboard(type = 'allTime') {
    return appData.leaderboard[type] || [];
}

function addChallenge(challenge) {
    challenge.id = appData.challenges.length + 1;
    challenge.submissions = 0;
    appData.challenges.push(challenge);
    saveData();
}

function addSubmission(submission) {
    submission.id = appData.submissions.length + 1;
    submission.submittedAt = new Date().toISOString().split('T')[0];
    appData.submissions.push(submission);
    
    // Update challenge submission count
    const challenge = appData.challenges.find(c => c.id === submission.challengeId);
    if (challenge) {
        challenge.submissions += 1;
    }
    
    saveData();
}
