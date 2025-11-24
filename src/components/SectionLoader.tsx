// components/SectionLoader.tsx
import React from 'react';

interface SectionLoaderProps {
    label?: string;
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({ label }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        {label && <p className="mt-4 text-slate-600 dark:text-slate-400">{label}</p>}
    </div>
);
