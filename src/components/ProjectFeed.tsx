import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Users, Code, Calendar, Filter } from 'lucide-react';
import { getProjectIdeas, getFilteredProjectIdeas } from '@/utils/database';
import { formatDistanceToNow } from 'date-fns';

interface ProjectIdea {
  id: number;
  language: string;
  timeWilling: number;
  participants: number;
  response: string;
  createdAt: string;
  projectType: string;
  difficulty: string;
  memberNames: string;
  memberExpertise: string;
}

export const ProjectFeed = () => {
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    fetchProjects();
  }, [filterLanguage, filterDifficulty]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const filters = {
        ...(filterLanguage !== 'all' && { language: filterLanguage }),
        ...(filterDifficulty !== 'all' && { difficulty: filterDifficulty }),
      };
      
      const data = Object.keys(filters).length > 0 
        ? await getFilteredProjectIdeas(filters)
        : await getProjectIdeas();
      
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  const formatMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-800 mb-3 mt-6 flex items-center gap-2">$1</h2>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      
      // Code blocks
      .replace(/```bash\n([\s\S]*?)\n```/g, '<div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm my-4"><pre>$1</pre></div>')
      .replace(/```([\s\S]*?)```/g, '<div class="bg-gray-100 p-4 rounded-lg font-mono text-sm my-4"><pre>$1</pre></div>')
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Bullet points
      .replace(/^• (.*$)/gm, '<li class="flex items-start gap-2 mb-2"><span class="text-blue-500 mt-1">•</span><span class="text-gray-700">$1</span></li>')
      
      // Numbered lists
      .replace(/^(\d+)\. \*\*(.*?)\*\*.*?: (.*$)/gm, '<div class="flex items-start gap-3 mb-3"><span class="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">$1</span><div><strong class="text-gray-900">$2</strong>: <span class="text-gray-700">$3</span></div></div>')
      
      // Horizontal rule
      .replace(/^---$/gm, '<hr class="border-gray-200 my-4">')
      
      // Italic text at the end
      .replace(/\*(.*?)\*/g, '<em class="text-gray-500 text-sm">$1</em>')
      
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const uniqueLanguages = [...new Set(projects.map(p => p.language))];
  const uniqueDifficulties = [...new Set(projects.map(p => p.difficulty))];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Feed</h2>
        <p className="text-gray-600">All projects of urs </p>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Language:</label>
                <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {uniqueLanguages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Difficulty:</label>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {uniqueDifficulties.map(diff => (
                      <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
        {projects.length === 0 ? (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 text-center">
              <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No projects found matching your filters. Try adjusting the criteria!</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Project Idea #{project.id}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                    <Code className="w-3 h-3 mr-1" />
                    {project.language}
                  </Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(project.timeWilling)}
                  </Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                    <Users className="w-3 h-3 mr-1" />
                    {project.participants} {project.participants === 1 ? 'person' : 'people'}
                  </Badge>
                  <Badge variant="secondary" className={getDifficultyColor(project.difficulty)}>
                    {project.difficulty || 'Unknown'}
                  </Badge>
                  {project.projectType && (
                    <Badge variant="outline" className="border-gray-300">
                      {project.projectType}
                    </Badge>
                  )}
                </div>

                {project.memberNames && project.participants > 1 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Team Members:</p>
                    <div className="text-sm text-gray-600">
                      {project.memberNames.split(', ').map((name, idx) => {
                        const expertise = project.memberExpertise?.split(', ')[idx];
                        return (
                          <span key={idx} className="inline-block mr-3 mb-1">
                            <strong>{name}</strong> {expertise && `(${expertise})`}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(project.response) }}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
