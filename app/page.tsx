'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLink } from "react-icons/fa";

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
  const [githubCommitHistory, setGithubCommitHistory] = useState<GitHubAPIResponse | null>(null);
  const [ghLoading, setGhLoading] = useState<Boolean>(false);
  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setGhLoading(true)
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/JagadeeswarJ?y=last');
        const data: GitHubAPIResponse = await response.json();
        setGithubCommitHistory(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setGhLoading(false)
      }
    };

    fetchGithubData();
  }, []);

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
              <FaGithub className="w-6 h-6" />
              <span className="text-lg font-medium">building cool stuff</span>
              <FaLink className="w-4 h-4 ml-1" />
            </a>
          </div>


          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">

            {!ghLoading && githubCommitHistory ?

              <ActivityCalendar
                data={githubCommitHistory.contributions}
                colorScheme="light"
                blockSize={12}
                blockMargin={2}
                fontSize={12}
                showWeekdayLabels
                theme={{
                  light: ['#ebedf0', '#40c463', '#30a14e', '#216e39', '#0d4818'],
                  dark: ['#161b22', '#006d32', '#26a641', '#39d353', '#4ade80']
                }}
              />
              :
              <div className='w-3xl h-36'>
              </div>}
          </div>

        </div>
      </main>
    </div>
  );
}
