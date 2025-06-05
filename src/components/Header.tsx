
import { Github } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-full"></div>
          <span className="text-xl font-semibold text-gray-900">Project Roulette</span>
        </div>
        
        <a 
          href="https://github.com/Raufjatoi/Roulette" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 rounded-lg"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
};
