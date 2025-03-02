"use client";
import * as React from "react";
import { useState } from "react";
import { ChevronRight, ChevronDown, File } from "lucide-react";

interface AboutSection {
  title: string;
  content: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface ProjectItem {
  name: string;
  type: string;
  description: string;
  link: string;
}

interface ExperienceSection {
  title: string;
  items: ExperienceItem[];
}

interface ProjectsSection {
  title: string;
  items: ProjectItem[];
}

type SectionData = AboutSection | ExperienceSection | ProjectsSection;

const sections: Record<Section, SectionData> = {
  about: {
    title: "About",
    content: "QA Engineer with full-stack development experience...",
  },
  experience: {
    title: "Experience",
    items: [
      {
        company: "Company A",
        role: "Senior QA Engineer",
        period: "2020-Present",
        description: "Led test automation initiatives...",
      },
      {
        company: "Company B",
        role: "QA Engineer",
        period: "2018-2020",
        description: "Developed test frameworks...",
      },
    ],
  },
  projects: {
    title: "Projects",
    items: [
      {
        name: "E-commerce Test Framework",
        type: "QA",
        description: "Selenium-based test framework...",
        link: "#",
      },
      {
        name: "Task Management App",
        type: "Development",
        description: "Full-stack application built with Next.js...",
        link: "#",
      },
    ],
  },
};

type Section = "about" | "experience" | "projects";

export default function FileExplorer() {
  const [openSections, setOpenSections] = useState({
    about: true,
    experience: false,
    projects: false,
  });

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="font-mono">
      {Object.entries(sections).map(([key, section]) => (
        <div key={key} className="mb-4">
          <button
            onClick={() => toggleSection(key as Section)}
            className="flex items-center space-x-2 hover:bg-accent p-2 rounded-lg w-full text-left"
          >
            {openSections[key as Section] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>{section.title}</span>
          </button>

          {openSections[key as Section] && (
            <div className="ml-6 mt-2 space-y-2">
              {key === "about" && (
                <p className="text-sm text-muted-foreground">
                  {(section as AboutSection).content}
                </p>
              )}

              {key === "experience" && (
                <div className="space-y-2">
                  {(section as ExperienceSection).items.map((item, i) => (
                    <div key={i} className="p-2 hover:bg-accent rounded-lg">
                      <h3 className="font-bold">{item.company}</h3>
                      <p>
                        {item.role} | {item.period}
                      </p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {key === "projects" && (
                <div className="space-y-2">
                  {(section as ProjectsSection).items.map((item, i) => (
                    <div key={i} className="p-2 hover:bg-accent rounded-lg">
                      <div className="flex items-center space-x-2">
                        <File size={16} />
                        <a href={item.link} className="hover:underline">
                          {item.name}
                        </a>
                      </div>
                      <span className="text-sm text-muted-foreground ml-6">
                        Type: {item.type}
                      </span>
                      <p className="text-sm ml-6">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
