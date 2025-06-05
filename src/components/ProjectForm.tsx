
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Users, Plus, Trash2 } from 'lucide-react';
import { generateProjectIdea } from '@/utils/groq';
import { saveProjectIdea } from '@/utils/database';
import { toast } from 'sonner';

interface ProjectFormProps {
  onProjectGenerated: () => void;
}

interface TeamMember {
  name: string;
  expertise: string;
}

const languages = [
  'JavaScript', 'Python', 'TypeScript', 'React', 'Vue.js', 'Angular',
  'Node.js', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
  'PHP', 'Ruby', 'Dart', 'Flutter', 'React Native', 'Any Language'
];

const timeOptions = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },
  { value: '240', label: '4 hours' },
  { value: '480', label: '8 hours' },
  { value: '1440', label: '1 day' },
  { value: '2880', label: '2 days' },
  { value: '10080', label: '1 week' },
];

const projectTypes = [
  'Web Application', 'Mobile App', 'Desktop Application', 'Game', 
  'API/Backend', 'Data Analysis', 'Machine Learning', 'DevOps Tool',
  'Chrome Extension', 'CLI Tool', 'Library/Package', 'Any Type'
];

const difficultyLevels = [
  'Beginner', 'Intermediate', 'Advanced', 'Expert'
];

const expertiseAreas = [
  'Frontend Development', 'Backend Development', 'Full Stack', 'UI/UX Design',
  'Database Management', 'DevOps', 'Mobile Development', 'Game Development',
  'Data Science', 'Machine Learning', 'Cybersecurity', 'Quality Assurance',
  'Project Management', 'Beginner/Learning'
];

export const ProjectForm = ({ onProjectGenerated }: ProjectFormProps) => {
  const [language, setLanguage] = useState('');
  const [timeWilling, setTimeWilling] = useState('');
  const [participants, setParticipants] = useState([1]);
  const [projectType, setProjectType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', expertise: '' }]);
  const [isLoading, setIsLoading] = useState(false);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', expertise: '' }]);
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index: number, field: 'name' | 'expertise', value: string) => {
    const updated = teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    setTeamMembers(updated);
  };

  const handleParticipantsChange = (value: number[]) => {
    setParticipants(value);
    const newCount = value[0];
    
    if (newCount > teamMembers.length) {
      const additionalMembers = Array(newCount - teamMembers.length).fill(null).map(() => ({ name: '', expertise: '' }));
      setTeamMembers([...teamMembers, ...additionalMembers]);
    } else if (newCount < teamMembers.length) {
      setTeamMembers(teamMembers.slice(0, newCount));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!language || !timeWilling || !projectType || !difficulty) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (participants[0] > 1) {
      const incompleteMembers = teamMembers.some(member => !member.name.trim() || !member.expertise);
      if (incompleteMembers) {
        toast.error('Please fill in all team member names and expertise areas');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const memberNames = participants[0] > 1 ? teamMembers.map(m => m.name) : undefined;
      const memberExpertise = participants[0] > 1 ? teamMembers.map(m => m.expertise) : undefined;

      const projectIdea = await generateProjectIdea({
        language,
        timeWilling: parseInt(timeWilling),
        participants: participants[0],
        memberNames,
        memberExpertise,
        projectType,
        difficulty
      });

      await saveProjectIdea({
        language,
        timeWilling: parseInt(timeWilling),
        participants: participants[0],
        response: projectIdea,
        projectType,
        difficulty,
        memberNames: memberNames?.join(', ') || '',
        memberExpertise: memberExpertise?.join(', ') || ''
      });

      toast.success('Detailed project idea generated successfully!');
      onProjectGenerated();
      
      // Reset form
      setLanguage('');
      setTimeWilling('');
      setParticipants([1]);
      setProjectType('');
      setDifficulty('');
      setTeamMembers([{ name: '', expertise: '' }]);
      
    } catch (error) {
      console.error('Error generating project:', error);
      toast.error('Failed to generate project idea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-2xl border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Generate Detailed Project
        </CardTitle>
        <p className="text-gray-300 mt-2">
          Create comprehensive coding projects with team assignments and resources
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="language" className="text-sm font-medium text-gray-200">
                Programming Language *
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Choose your language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="projectType" className="text-sm font-medium text-gray-200">
                Project Type *
              </Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="What type of project?" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="time" className="text-sm font-medium text-gray-200">
                Time Available *
              </Label>
              <Select value={timeWilling} onValueChange={setTimeWilling}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="How much time do you have?" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="difficulty" className="text-sm font-medium text-gray-200">
                Difficulty Level *
              </Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Choose difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-200">
              Number of Participants: {participants[0]}
            </Label>
            <Slider
              value={participants}
              onValueChange={handleParticipantsChange}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Solo</span>
              <span>Team of 10</span>
            </div>
          </div>

          {participants[0] > 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-200">
                  Team Members *
                </Label>
                <Button
                  type="button"
                  onClick={addTeamMember}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  disabled={teamMembers.length >= participants[0]}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Member
                </Button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {teamMembers.slice(0, participants[0]).map((member, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        placeholder={`Member ${index + 1} name`}
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="flex-1">
                      <Select
                        value={member.expertise}
                        onValueChange={(value) => updateTeamMember(index, 'expertise', value)}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Expertise area" />
                        </SelectTrigger>
                        <SelectContent>
                          {expertiseAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {teamMembers.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        variant="outline"
                        size="sm"
                        className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading || !language || !timeWilling || !projectType || !difficulty}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-6 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Comprehensive Project...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Detailed Project
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
