
-- Project Roulette Database Schema

-- Create the enhanced project_ideas table
CREATE TABLE IF NOT EXISTS project_ideas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    language VARCHAR(100) NOT NULL,
    time_willing INTEGER NOT NULL,  -- Time in minutes
    participants INTEGER NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    member_names TEXT,  -- Comma-separated list of team member names
    member_expertise TEXT,  -- Comma-separated list of expertise areas
    response TEXT NOT NULL,  -- Generated project idea content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- indexes for better performance
CREATE INDEX IF NOT EXISTS idx_language ON project_ideas(language);
CREATE INDEX IF NOT EXISTS idx_created_at ON project_ideas(created_at);
CREATE INDEX IF NOT EXISTS idx_participants ON project_ideas(participants);
CREATE INDEX IF NOT EXISTS idx_difficulty ON project_ideas(difficulty);
CREATE INDEX IF NOT EXISTS idx_project_type ON project_ideas(project_type);

-- Insert enhanced example data
INSERT OR IGNORE INTO project_ideas (
    language, time_willing, participants, project_type, difficulty, 
    member_names, member_expertise, response
) VALUES 
(
    'JavaScript',
    240,
    3,
    'Web Application',
    'Intermediate',
    'Sarah Johnson, Mike Chen, Alex Rodriguez',
    'Frontend Development, Backend Development, UI/UX Design',
    '# 🎯 Smart Recipe Sharing Platform

## 📋 Project Overview
Build a collaborative recipe platform where users can share, discover, and modify recipes based on dietary preferences and available ingredients. This project combines modern web development with practical functionality that solves real-world cooking challenges.

## ✨ Core Features
• **Recipe Discovery Engine**: Advanced filtering by cuisine, dietary restrictions, cooking time, and available ingredients
• **Interactive Recipe Editor**: Rich text editor with ingredient scaling, nutritional information, and step-by-step photo uploads
• **Social Features**: User profiles, recipe ratings, comments, and the ability to "fork" and modify existing recipes
• **Smart Shopping Lists**: Auto-generate shopping lists from selected recipes with quantity optimization

## 🚀 Implementation Roadmap
1. **Phase 1 - Foundation** (72 minutes): Set up React project, design database schema, implement basic routing and authentication
2. **Phase 2 - Core Development** (120 minutes): Build recipe CRUD operations, implement search functionality, create user interface components
3. **Phase 3 - Polish & Deploy** (48 minutes): Add responsive design, implement social features, optimize performance, and deploy to Vercel

## 👥 Team Responsibilities
• **Sarah Johnson** (Frontend Development): React components, responsive design, user interface implementation, and client-side state management
• **Mike Chen** (Backend Development): API development, database operations, authentication system, and server-side logic implementation
• **Alex Rodriguez** (UI/UX Design): User experience design, visual interface creation, prototyping, and usability testing coordination

## 📚 Learning Resources
• **Documentation**: React docs, Node.js documentation, MongoDB guides
• **Tutorials**: "Full Stack React" course, "Building REST APIs with Express"
• **Tools**: VS Code with ES7+ extensions, MongoDB Compass, Postman for API testing
• **Libraries**: Material-UI for components, Axios for HTTP requests, Cloudinary for image uploads

## 🛠️ Tech Stack & Setup
**Required Tools:**
• Node.js development environment
• MongoDB database (local or MongoDB Atlas)
• Cloudinary account for image storage
• Vercel account for deployment

**Dependencies:**
```bash
npm create react-app recipe-platform
npm install express mongoose bcryptjs jsonwebtoken
npm install @mui/material @emotion/react @emotion/styled
npm install axios cloudinary multer
```

## 💡 Advanced Challenges
• **Level 1**: Add recipe recommendation algorithm based on user preferences
• **Level 2**: Implement real-time cooking mode with step-by-step guidance and timers
• **Level 3**: Create mobile app version using React Native with offline recipe storage

## 🎯 Success Metrics
• Functional recipe CRUD operations with user authentication
• Responsive design working across desktop, tablet, and mobile devices
• Social features enabling user interaction and recipe sharing
• Deployed application accessible via public URL

---
*Project Complexity: Intermediate | Estimated Time: 4 hours | Team Size: 3 developers*'
),
(
    'Python',
    480,
    1,
    'Data Analysis',
    'Advanced',
    '',
    '',
    '# 🎯 Personal Finance Analytics Dashboard

## 📋 Project Overview
Create a comprehensive personal finance analytics tool that processes bank statements, categorizes transactions, and provides intelligent insights about spending patterns, budget recommendations, and financial health scoring.

## ✨ Core Features
• **Automated Transaction Processing**: CSV/PDF import with intelligent categorization using machine learning
• **Interactive Visualization Dashboard**: Dynamic charts showing spending trends, category breakdowns, and monthly comparisons
• **Budget Optimization Engine**: AI-powered suggestions for budget allocation and savings opportunities
• **Financial Health Scoring**: Comprehensive scoring system based on spending patterns, savings rate, and financial goals

## 🚀 Implementation Roadmap
1. **Phase 1 - Foundation** (144 minutes): Set up Python environment, design data models, implement CSV parsing and data cleaning
2. **Phase 2 - Core Development** (240 minutes): Build machine learning categorization, create visualization dashboard, implement analysis algorithms
3. **Phase 3 - Polish & Deploy** (96 minutes): Add advanced analytics, optimize performance, create user documentation, package for distribution

## 📚 Learning Resources
• **Documentation**: Pandas documentation, Plotly/Dash guides, Scikit-learn tutorials
• **Tutorials**: "Python for Finance" course, "Machine Learning with Python"
• **Tools**: Jupyter Notebook, PyCharm IDE, Git for version control
• **Libraries**: Pandas, NumPy, Scikit-learn, Plotly Dash, NLTK for text processing

## 🛠️ Tech Stack & Setup
**Required Tools:**
• Python 3.8+ development environment
• Jupyter Notebook for data exploration
• Sample bank statement data (CSV format)

**Dependencies:**
```bash
pip install pandas numpy scikit-learn plotly dash
pip install nltk textblob openpyxl
pip install jupyter matplotlib seaborn
```

## 💡 Advanced Challenges
• **Level 1**: Add support for multiple bank formats and automatic format detection
• **Level 2**: Implement predictive modeling for future spending and savings projections
• **Level 3**: Create web interface with user authentication and multi-user support

## 🎯 Success Metrics
• Accurate transaction categorization with 85%+ precision
• Interactive dashboard with at least 5 different visualization types
• Automated budget recommendations based on historical data analysis
• Comprehensive documentation and example usage scenarios

---
*Project Complexity: Advanced | Estimated Time: 8 hours | Team Size: 1 developer*'
),
(
    'React',
    120,
    2,
    'Web Application',
    'Beginner',
    'Emma Wilson, James Park',
    'Frontend Development, Beginner/Learning',
    '# 🎯 Interactive Task Manager with Real-time Collaboration

## 📋 Project Overview
Build a modern task management application where team members can create, assign, and track tasks in real-time. Perfect for learning React fundamentals while creating a practical productivity tool.

## ✨ Core Features
• **Task Management System**: Create, edit, delete, and organize tasks with priorities, due dates, and categories
• **Real-time Updates**: Live synchronization of task changes across multiple browser sessions
• **User Assignment**: Assign tasks to team members with status tracking and notifications
• **Progress Visualization**: Kanban board view with drag-and-drop functionality and progress statistics

## 🚀 Implementation Roadmap
1. **Phase 1 - Foundation** (36 minutes): Set up React project, create basic components, implement local state management
2. **Phase 2 - Core Development** (60 minutes): Build task CRUD operations, implement drag-and-drop, add real-time features
3. **Phase 3 - Polish & Deploy** (24 minutes): Style with Tailwind CSS, add animations, deploy to Netlify

## 👥 Team Responsibilities
• **Emma Wilson** (Frontend Development): React component architecture, state management, API integration, and advanced functionality implementation
• **James Park** (Beginner/Learning): Basic component creation, styling with Tailwind CSS, testing features, and documentation writing

## 📚 Learning Resources
• **Documentation**: React official docs, Tailwind CSS documentation, Firebase guides
• **Tutorials**: "React Beginner Bootcamp", "Building Real-time Apps with Firebase"
• **Tools**: VS Code with React extensions, Chrome DevTools, Firebase console
• **Libraries**: React DnD for drag-and-drop, date-fns for date handling, React Router for navigation

## 🛠️ Tech Stack & Setup
**Required Tools:**
• Node.js development environment
• Firebase project for real-time database
• Netlify account for deployment

**Dependencies:**
```bash
npx create-react-app task-manager
npm install firebase react-beautiful-dnd
npm install react-router-dom date-fns
npm install tailwindcss @headlessui/react
```

## 💡 Advanced Challenges
• **Level 1**: Add email notifications for task assignments and due dates
• **Level 2**: Implement time tracking functionality with productivity analytics
• **Level 3**: Create mobile-responsive progressive web app (PWA) with offline support

## 🎯 Success Metrics
• Functional task creation, editing, and deletion system
• Working drag-and-drop interface for task organization
• Real-time synchronization between multiple browser sessions
• Responsive design working on mobile and desktop devices

---
*Project Complexity: Beginner | Estimated Time: 2 hours | Team Size: 2 developers*'
);

-- Views for common queries
CREATE VIEW IF NOT EXISTS recent_projects AS
SELECT 
    id,
    language,
    project_type,
    difficulty,
    participants,
    time_willing,
    SUBSTR(response, 1, 200) || '...' as response_preview,
    created_at
FROM project_ideas 
ORDER BY created_at DESC 
LIMIT 20;

CREATE VIEW IF NOT EXISTS project_stats AS
SELECT 
    language,
    COUNT(*) as project_count,
    AVG(time_willing) as avg_time,
    AVG(participants) as avg_team_size
FROM project_ideas 
GROUP BY language
ORDER BY project_count DESC;

-- Useful query examples:

-- Get all team projects with member details
-- SELECT * FROM project_ideas WHERE participants > 1 AND member_names IS NOT NULL;

-- Get projects by difficulty level
-- SELECT * FROM project_ideas WHERE difficulty = 'Advanced';

-- Get projects suitable for specific time constraints
-- SELECT * FROM project_ideas WHERE time_willing <= 120; -- 2 hours or less

-- Get recent projects from the last week
-- SELECT * FROM project_ideas WHERE created_at >= datetime('now', '-7 days');

-- Get most popular languages
-- SELECT language, COUNT(*) as count FROM project_ideas GROUP BY language ORDER BY count DESC;

-- Get projects with team collaboration
-- SELECT id, language, participants, member_names, member_expertise 
-- FROM project_ideas WHERE participants > 1 ORDER BY participants DESC;
