import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();
    const projectsRoot = "/app/projects";
    const projectPath = path.join(projectsRoot, projectId);

    // Comandos para sincronizar con GitHub
    const commands = [
      `git config --global user.email "vuo@vibe-coding.ai"`,
      `git config --global user.name "VUO AI"`,
      `git add .`,
      `git commit -m "feat: updates via Vibe Coding AI"`,
      `git push origin master`
    ];

    const { stdout, stderr } = await execAsync(commands.join(" && "), { cwd: projectPath });

    return NextResponse.json({ success: true, output: stdout });

  } catch (error: any) {
    console.error("Error en Git Push:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
