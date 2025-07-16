'use client';

import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import ActivityCalendar from 'react-activity-calendar';

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubAPIResponse {
  total: {
    [year: number]: number;
    [year: string]: number;
  };
  contributions: Contribution[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [githubData, setGithubData] = useState<GitHubAPIResponse | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/JagadeeswarJ?y=last');
        const data: GitHubAPIResponse = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <a
              href="https://github.com/JagadeeswarJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
              <span className="text-lg font-medium">GitHub Activity</span>
            </a>
          </div>
          
          {githubData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <ActivityCalendar
                data={githubData.contributions}
                colorScheme="light"
                blockSize={12}
                blockMargin={2}
                fontSize={12}
                showWeekdayLabels
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
