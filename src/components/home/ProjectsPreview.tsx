'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { getImageURLFromKey } from '@/lib/cdn';
import { Project } from '@/types/project';

interface Props {
  projects: Project[];
  limit?: number;
  onViewAll: () => void;
}

const HomeProjectsPreview = ({ projects, limit = 3, onViewAll }: Props) => {
  const visible = projects.slice(0, limit);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">projects</h3>

      <div className="ml-3 flex flex-col gap-2">
        {projects.length === 0 ? (
          <p className="opacity-50">everything will appear in due course</p>
        ) : (
          <>
            {visible.map((project, i) => (
              <motion.div
                key={project.name}
                className="group -ml-1.5 rounded-md p-1.5 transition-colors hover:bg-gray-500/5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: [0.26, 1, 0.6, 1],
                }}
                whileHover={{ x: 2 }}
              >
                <div className="flex gap-3">
                  <Link href={`/p/${project.name}`} className="flex flex-1 gap-3">
                    <div className="relative mt-0.5 size-11 shrink-0 overflow-hidden rounded-lg bg-gray-500/5 ring-1 ring-gray-500/10 transition-all duration-150 group-hover:ring-gray-500/20">
                      <Image
                        src={getImageURLFromKey(`projects/${project.name}.webp`)}
                        alt={project.name}
                        width={44}
                        height={44}
                        className="size-full object-cover"
                        draggable={false}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = getImageURLFromKey(
                            'projects/_default.webp'
                          );
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium transition-colors group-hover:text-blue-500">
                        {project.name}
                      </p>
                      <p className="opacity-50 transition-opacity group-hover:opacity-70">
                        {project.description ?? 'all with a side of dark humor'}
                      </p>
                    </div>
                  </Link>

                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-tertiary hover:text-secondary mt-1 shrink-0"
                  >
                    ↗
                  </a>
                </div>
              </motion.div>
            ))}

            {projects.length > limit && (
              <motion.button
                onClick={onViewAll}
                className="text-tertiary hover:text-primary mt-2 -ml-1.5 flex items-center gap-1.5 rounded-md p-1.5 text-xs hover:bg-gray-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span>View all {projects.length} projects</span>
              </motion.button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeProjectsPreview;
