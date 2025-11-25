import { projectsData } from '@/data/projects';
import type { Project } from '@/data/projects';

describe('Projects Data', () => {
  it('exports an array of projects', () => {
    expect(Array.isArray(projectsData)).toBe(true);
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    projectsData.forEach((project: Project) => {
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('subtitle');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('image');
      expect(project).toHaveProperty('tags');
      expect(project).toHaveProperty('screenshotUrl');
    });
  });

  it('project titles are non-empty strings', () => {
    projectsData.forEach((project: Project) => {
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(0);
    });
  });

  it('project descriptions are non-empty', () => {
    projectsData.forEach((project: Project) => {
      expect(typeof project.description).toBe('string');
      expect(project.description.length).toBeGreaterThan(0);
    });
  });

  it('tags are arrays of strings', () => {
    projectsData.forEach((project: Project) => {
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
      project.tags.forEach(tag => {
        expect(typeof tag).toBe('string');
      });
    });
  });

  it('image paths are valid strings', () => {
    projectsData.forEach((project: Project) => {
      expect(typeof project.image).toBe('string');
      expect(project.image.length).toBeGreaterThan(0);
    });
  });

  it('screenshot URLs are valid strings', () => {
    projectsData.forEach((project: Project) => {
      expect(typeof project.screenshotUrl).toBe('string');
      expect(project.screenshotUrl.length).toBeGreaterThan(0);
    });
  });

  it('live URLs are valid when provided', () => {
    const projectsWithLiveUrl = projectsData.filter(p => p.liveUrl);
    projectsWithLiveUrl.forEach((project: Project) => {
      expect(project.liveUrl).toMatch(/^https?:\/\//);
    });
  });

  it('code URLs are valid when provided', () => {
    const projectsWithCodeUrl = projectsData.filter(p => p.codeUrl);
    projectsWithCodeUrl.forEach((project: Project) => {
      expect(project.codeUrl).toMatch(/^https?:\/\//);
    });
  });

  it('contains expected projects', () => {
    const titles = projectsData.map(p => p.title);
    expect(titles).toContain('PierogiMeme.io');
    expect(titles).toContain('BHP Stronie Śląskie');
  });

  it('PierogiMeme project has correct tags', () => {
    const pierogi = projectsData.find(p => p.title === 'PierogiMeme.io');
    expect(pierogi).toBeDefined();
    expect(pierogi!.tags).toContain('Next.js');
    expect(pierogi!.tags).toContain('Solana');
  });

  it('all projects have at least one tag', () => {
    projectsData.forEach((project: Project) => {
      expect(project.tags.length).toBeGreaterThanOrEqual(1);
    });
  });
});
