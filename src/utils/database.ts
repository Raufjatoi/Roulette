interface ProjectIdeaData {
  language: string;
  timeWilling: number;
  participants: number;
  response: string;
  projectType: string;
  difficulty: string;
  memberNames: string;
  memberExpertise: string;
}

interface ProjectIdea extends ProjectIdeaData {
  id: number;
  createdAt: string;
}

// Enhanced database simulation using localStorage
// In a real application, this would connect to SQLite database

const STORAGE_KEY = 'project_roulette_ideas';

export const saveProjectIdea = async (data: ProjectIdeaData): Promise<void> => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const projects: ProjectIdea[] = existingData ? JSON.parse(existingData) : [];
    
    const newProject: ProjectIdea = {
      id: Date.now(), // Simple ID generation
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    projects.unshift(newProject); // Add to beginning
    
    // Keep only last 50 projects to prevent localStorage overflow
    if (projects.length > 50) {
      projects.splice(50);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    
    console.log('Enhanced project idea saved to local storage:', newProject);
  } catch (error) {
    console.error('Error saving project idea:', error);
    throw new Error('Failed to save project idea');
  }
};

export const getProjectIdeas = async (): Promise<ProjectIdea[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects = data ? JSON.parse(data) : [];
    console.log('Retrieved enhanced projects from local storage:', projects);
    return projects;
  } catch (error) {
    console.error('Error retrieving project ideas:', error);
    return [];
  }
};

// Get projects with filtering options
export const getFilteredProjectIdeas = async (filters?: {
  language?: string;
  difficulty?: string;
  projectType?: string;
  participants?: number;
}): Promise<ProjectIdea[]> => {
  try {
    const allProjects = await getProjectIdeas();
    
    if (!filters) return allProjects;
    
    return allProjects.filter(project => {
      if (filters.language && project.language !== filters.language) return false;
      if (filters.difficulty && project.difficulty !== filters.difficulty) return false;
      if (filters.projectType && project.projectType !== filters.projectType) return false;
      if (filters.participants && project.participants !== filters.participants) return false;
      return true;
    });
  } catch (error) {
    console.error('Error filtering project ideas:', error);
    return [];
  }
};

// Clear all project ideas (utility function)
export const clearProjectIdeas = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEY);
};

// Export project ideas to JSON for backup
export const exportProjectIdeas = async (): Promise<string> => {
  const projects = await getProjectIdeas();
  return JSON.stringify(projects, null, 2);
};
