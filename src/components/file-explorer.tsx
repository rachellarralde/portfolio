"use client";
import * as React from "react";
import { useState } from "react";
import { ChevronRight, ChevronDown, File } from "lucide-react";

// Add type for mockData
type MockData = {
  about: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      name: string;
      type: string;
      description: string;
      link: string;
    }>;
  };
};

const mockData: MockData = {
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

// First, define the type for valid sections
type SectionKey = "about" | "experience" | "projects";

// Type for the state object
interface OpenSections {
  about: boolean;
  experience: boolean;
  projects: boolean;
}

// Add these type guards
const isAboutSection = (
  section: MockData[keyof MockData]
): section is MockData["about"] => {
  return "content" in section;
};

const isExperienceSection = (
  section: MockData[keyof MockData]
): section is MockData["experience"] => {
  return "items" in section && "company" in (section.items[0] || {});
};

const isProjectsSection = (
  section: MockData[keyof MockData]
): section is MockData["projects"] => {
  return "items" in section && "name" in (section.items[0] || {});
};

export default function FileExplorer() {
  const [openSections, setOpenSections] = useState<OpenSections>({
    about: false,
    experience: false,
    projects: false,
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="font-mono">
      {Object.entries(mockData).map(([key, section]) => (
        <div key={key} className="mb-4">
          <button
            onClick={() => toggleSection(key as SectionKey)}
            className="flex items-center space-x-2 hover:bg-accent p-2 rounded-lg w-full text-left"
          >
            {openSections[key as SectionKey] ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>{section.title}</span>
          </button>

          {openSections[key as SectionKey] && (
            <div className="ml-6 mt-2 space-y-2">
              {isAboutSection(section) && (
                <p className="p-2">{section.content}</p>
              )}

              {isExperienceSection(section) &&
                section.items.map((item, index) => (
                  <div key={index} className="p-2 hover:bg-accent rounded-lg">
                    <h3 className="font-bold">{item.company}</h3>
                    <p>
                      {item.role} | {item.period}
                    </p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ))}

              {isProjectsSection(section) &&
                section.items.map((item, index) => (
                  <div key={index} className="p-2 hover:bg-accent rounded-lg">
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
      ))}
    </div>
  );
}
