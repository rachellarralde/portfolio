"use client";

import { X } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";
import Image from "next/image";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    link: string;
    technologies?: string[];
    longDescription?: string;
    images?: string[];
  };
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-6xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background border-b px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {project.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 bg-background border-t px-8 py-6">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-medium"
          >
            View Project <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
