import React, { useState } from 'react';
import { ExternalLink, CheckCircle, FileText, ClipboardList, ChevronDown, ChevronUp } from "lucide-react";

interface SchemeCardProps {
    scheme: {
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
    };
}

const categoryInfo: Record<string, { label: string; color: string }> = {
    students: { label: "Students", color: "bg-blue-100 text-blue-800" },
    farmers: { label: "Farmers", color: "bg-green-100 text-green-800" },
    women: { label: "Women", color: "bg-pink-100 text-pink-800" },
    housing: { label: "Housing", color: "bg-orange-100 text-orange-800" },
    health: { label: "Health", color: "bg-red-100 text-red-800" },
    employment: { label: "Employment", color: "bg-purple-100 text-purple-800" },
    senior_citizens: { label: "Senior Citizens", color: "bg-gray-100 text-gray-800" },
    entrepreneurs: { label: "Entrepreneurs", color: "bg-yellow-100 text-yellow-800" },
};

export default function SchemeCard({ scheme }: SchemeCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const category = categoryInfo[scheme.category] || { label: scheme.category, color: "bg-gray-100 text-gray-800" };

    return (
        <div className="bg-white rounded-xl shadow-md border-l-4 border-l-blue-600 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {scheme.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {scheme.ministry}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                        {category.label}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                    {scheme.description}
                </p>

                {/* AI Reason */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800 italic">
                        <span className="font-semibold">Why for you:</span> {scheme.reason}
                    </p>
                </div>

                {/* Benefits & Eligibility Grid */}
                <div className="grid gap-6 md:grid-cols-2 pt-2">
                    {/* Benefits */}
                    <div>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Benefits
                        </h4>
                        <ul className="space-y-2">
                            {scheme.benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                                    {benefit}
                                </li>
                            ))}
                            {scheme.benefits.length > 3 && (
                                <li className="text-xs text-gray-500 pl-3.5">+{scheme.benefits.length - 3} more...</li>
                            )}
                        </ul>
                    </div>

                    {/* Eligibility */}
                    <div>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <ClipboardList className="h-4 w-4 text-blue-600" />
                            Eligibility
                        </h4>
                        <ul className="space-y-2">
                            {scheme.eligibility.slice(0, 3).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                    {item}
                                </li>
                            ))}
                            {scheme.eligibility.length > 3 && (
                                <li className="text-xs text-gray-500 pl-3.5">+{scheme.eligibility.length - 3} more...</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Collapsible Details */}
                <div className="border-t border-gray-100 pt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        <span>View Documents & Application Process</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isExpanded && (
                        <div className="mt-4 grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            {/* Documents */}
                            <div>
                                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                    <FileText className="h-4 w-4 text-orange-500" />
                                    Required Documents
                                </h4>
                                <ul className="space-y-2">
                                    {scheme.documents.map((doc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Application Process */}
                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-900">
                                    How to Apply
                                </h4>
                                <ol className="space-y-3">
                                    {scheme.application_process.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                {idx + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end pt-2">
                    <a
                        href={scheme.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
                    >
                        Visit Official Website
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
