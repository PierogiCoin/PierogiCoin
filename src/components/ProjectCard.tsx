'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Project } from '@/data/projects';

interface ProjectCardProps extends Project {
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({ index, title, subtitle, image, description, tags, liveUrl, codeUrl }) => {
    const enterFocusMode = useAppStore((state) => state.enterFocusMode);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('a')) return;
      enterFocusMode(index, e.currentTarget);
    };

    return (
      <div
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        role="button"
        tabIndex={0}
        data-flip-id={`project-card-${index}`}
        className="w-full h-auto bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1023px) 90vw, 35vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-800/50 to-transparent" />
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-blue-500 dark:text-cyan-400 font-semibold mb-3">
              {subtitle}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                  Live Demo <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </a>
              )}
              {codeUrl && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                >
                  <Github className="w-4 h-4 mr-1.5" /> Kod
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';