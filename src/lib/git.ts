import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const PROJECTS_ROOT = path.join(process.cwd(), 'projects');

if (!fs.existsSync(PROJECTS_ROOT)) {
  fs.mkdirSync(PROJECTS_ROOT, { recursive: true });
}

export const gitService = {
  cloneRepo: (url: string, token: string, projectName: string) => {
    const authenticatedUrl = url.replace('https://', `https://x-access-token:${token}@`);
    const projectPath = path.join(PROJECTS_ROOT, projectName);
    
    if (fs.existsSync(projectPath)) {
      return { success: true, message: 'Repo already exists' };
    }

    try {
      execSync(`git clone ${authenticatedUrl} ${projectPath}`);
      return { success: true, message: 'Repo cloned' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  commitAndPush: (projectName: string, message: string) => {
    const projectPath = path.join(PROJECTS_ROOT, projectName);
    try {
      execSync(`git -C ${projectPath} add .`);
      execSync(`git -C ${projectPath} commit -m "${message}"`);
      execSync(`git -C ${projectPath} push`);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  listFiles: (projectName: string) => {
    const projectPath = path.join(PROJECTS_ROOT, projectName);
    // Recursively list files (simplified for POC)
    const getFiles = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files = entries.map((entry) => {
        const res = path.resolve(dir, entry.name);
        return entry.isDirectory() ? getFiles(res) : res;
      });
      return Array.prototype.concat(...files);
    };
    return getFiles(projectPath).map(f => path.relative(projectPath, f));
  }
};
