
export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-4">
          <div className="text-lg font-medium">
            By{' '}
            <a 
              href="https://raufjatoi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 underline decoration-2 underline-offset-4"
            >
              Abdul Rauf Jatoi
            </a>
          </div>
          
          <p className="text-gray-400 max-w-md mx-auto">
            Empowering developers to discover their next coding adventure through AI-powered project generation.
          </p>
          
          <div className="flex justify-center space-x-6 pt-4">
            <a 
              href="https://github.com/Raufjatoi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a 
              href="https://raufjatoi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
