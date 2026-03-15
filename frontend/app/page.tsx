'use client';

import { useState } from 'react';
import Results from '@/app/components/Results';

interface SchemeRecommendation {
  id: string;
  name: string;
  category: string;
  ministry: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  application_process: string[];
  official_link: string;
  target_group: string;
  reason: string;
}

interface ApiResponse {
  analysis: string;
  recommendations: SchemeRecommendation[];
  relevant_schemes_raw: any[];
}

export default function Home() {
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const handleSearch = async () => {
    if (!context.trim()) return;
    setLoading(true);
    setData(null); // Reset previous results
    try {
      const res = await fetch('http://localhost:8001/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_context: context }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result: ApiResponse = await res.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching schemes:', error);
      alert('Failed to fetch schemes. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
            Sarkar AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal government scheme advisor. Describe your situation, and we'll find the right schemes for you.
          </p>
        </header>

        {/* Input Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <label htmlFor="context" className="block text-lg font-semibold text-gray-700 mb-3">
            Tell us about yourself
          </label>
          <textarea
            id="context"
            className="w-full h-40 p-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg resize-none"
            placeholder="E.g., I am a small farmer in Telangana with 2 acres of land. I also have a daughter studying in college..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
                }`}
            >
              {loading ? 'Analyzing...' : 'Find Schemes'}
            </button>
          </div>
        </section>

        {/* Results Section */}
        {data && <Results data={data} />}
      </div>
    </main>
  );
}
