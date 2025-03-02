"use client";

import { Moon, Sun, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ProjectModal } from "@/components/project-modal";
import { ParticlesBackground } from "@/components/particles-background";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  technologies?: string[];
  longDescription?: string;
  images?: string[];
}

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Output Arcade",
      description: "Sample Playground",
      longDescription:
        "A sample plugin from Output Inc. that allows you to create and perform instruments.",
      technologies: [
        "Playwright",
        "TypeScript",
        "Manual Testing",
        "Rest API Testing",
      ],
      link: "https://output.com/products/arcade",
      images: [
        "https://a.storyblok.com/f/296868/2160x1320/b7ca7105e2/arcade-pdp-hero-10-18.png",
        "https://a.storyblok.com/f/296868/1792x1092/8ec5831d62/arcade-features-image-v2.png",
      ],
    },
    {
      id: 2,
      title: "Output FX",
      description: "FX plugin",
      link: "https://output.com/products",
      images: [
        "https://shop.output.com/app/uploads/2020/07/Portal.png?auto=format,compress&w=768",
        "https://shop.output.com/app/uploads/2020/07/Thermal-new.png?auto=format,compress&w=768",
      ],
    },
    {
      id: 3,
      title: "Flicked",
      description: "Full-stack Developer",
      longDescription:
        "I built Flicked, a movie recommendations app, using Swift and UIKit. The app allows users to discover and save movies, and provides personalized recommendations based on their viewing history. I also implemented a secure login system using Firebase for authentication.",
      technologies: ["Swift", "UIKit", "Firebase"],
      link: "https://output.com/thermal",
    },
    {
      id: 4,
      title: "Pack Generator",
      description: "AI sample pack generator",
      link: "https://output.com/products/pack-generator",
    },
    {
      id: 5,
      title: "Cool README",
      description: "Readme generator",
      longDescription:
        "A simple readme generator built with Next.js and Shadcn/UI.",
      technologies: ["Next.js", "TailwindCSS", "Shadcn/UI"],
      link: "https://coolreadme.vercel.app",
    },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-mono dark:bg-[hsl(215,25%,12%)]">
      <ParticlesBackground />

      <header className="relative z-10 sticky top-0 w-full border-b bg-background/80 backdrop-blur-sm dark:border-slate-800 dark:bg-[hsl(215,25%,12%)]/80">
        <nav className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Terminal className="h-5 w-5" />
          <div className="hidden sm:flex items-center space-x-6 text-sm">
            <Link
              className="hover:text-primary transition-colors"
              href="https://github.com/rachellarralde"
            >
              Github
            </Link>
          </div>
          <div className="flex sm:hidden items-center space-x-4 text-xs">
            <Link className="hover:text-primary" href="#about">
              about
            </Link>
            <Link className="hover:text-primary" href="#projects">
              projects
            </Link>
            <Link className="hover:text-primary" href="#experience">
              experience
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="h-9 w-9"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </nav>
      </header>

      <main className="relative z-10 flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <section className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Rachel Larralde
          </h1>
          <p className="text-muted-foreground">Quality Assurance Engineer</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 border rounded-lg p-6 shadow-md dark:shadow-white/10 dark:border-slate-800 bg-background">
            <h2 className="text-sm mb-4 flex items-center gap-2">
              <span className="text-primary">&gt;</span> about.txt
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I build exceptional digital experiences with a focus on
              performance and user experience. Currently working on open-source
              projects and exploring new technologies.
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow-md dark:shadow-white/10 dark:border-slate-800 bg-background">
            <h2 className="text-sm mb-4 flex items-center gap-2">
              <span className="text-primary">&gt;</span> quick-stats.json
            </h2>
            <div className="space-y-2">
              <p>🚀 5+ Years Experience</p>
              <p>💻 10+ Projects</p>
              <p>🌟 Open Source Contributor</p>
            </div>
          </div>

          <div className="lg:col-span-2 border rounded-lg p-6 shadow-md dark:shadow-white/10 dark:border-slate-800 bg-background">
            <h2 className="text-sm mb-4 flex items-center gap-2">
              <span className="text-primary">&gt;</span> projects/
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-left flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-slate-800 group"
                  >
                    <span className="text-primary group-hover:translate-x-0.5 transition-transform">
                      {String(project.id).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg p-6 shadow-md dark:shadow-white/10 dark:border-slate-800 bg-background">
            <h2 className="text-sm mb-4 flex items-center gap-2">
              <span className="text-primary">&gt;</span> experience.log
            </h2>
            <ul className="space-y-4">
              <li>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">QA Engineer</h3>
                  <span className="text-xs text-muted-foreground">
                    2024-Present
                  </span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Full Stack Developer</h3>
                  <span className="text-xs text-muted-foreground">
                    2021-Present
                  </span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">QA Analyst</h3>
                  <span className="text-xs text-muted-foreground">
                    2018-2023
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-auto border-t py-4 dark:border-slate-800 dark:bg-[hsl(215,25%,12%)]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Rachel Larralde
            </p>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
