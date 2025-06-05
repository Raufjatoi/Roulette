
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProjectForm } from '@/components/ProjectForm';
import { ProjectFeed } from '@/components/ProjectFeed';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [refreshFeed, setRefreshFeed] = useState(0);

  const handleProjectGenerated = () => {
    setRefreshFeed(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent mb-4">
            Project Roulette
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">A unified platform to discover ideas, create projects, and collaborate seamlessly. 
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <ProjectForm onProjectGenerated={handleProjectGenerated} />
          </div>
          
          <div className="space-y-8">
            <ProjectFeed key={refreshFeed} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
