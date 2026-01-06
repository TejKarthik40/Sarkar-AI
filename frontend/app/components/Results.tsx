import React from 'react';
import SchemeCard from './SchemeCard';

interface ResultsProps {
    data: {
        analysis: string;
        recommendations: {
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
        }[];
        relevant_schemes_raw: any[];
    };
}

const Results: React.FC<ResultsProps> = ({ data }) => {
    return (
        <div className="space-y-12 animate-fade-in-up">
            {/* AI Analysis */}
            <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">AI Analysis</h2>
                <p className="text-lg text-blue-900 leading-relaxed whitespace-pre-line">
                    {data.analysis}
                </p>
            </section>

            {/* Recommendations */}
            <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Schemes</h2>

                {data.recommendations.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-xl text-gray-600 font-medium">
                            No matching schemes found based on your profile.
                        </p>
                        <p className="text-gray-500 mt-2">
                            Try providing more details or checking general welfare schemes.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {data.recommendations.map((scheme: any, index: number) => (
                            <SchemeCard key={index} scheme={scheme} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Results;
