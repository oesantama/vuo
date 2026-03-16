import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs/promises";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const { repo, projectId, token } = await req.json();
    
    if (!repo) return NextResponse.json({ error: "Repositorio no especificado" }, { status: 400 });

    const projectsRoot = path.join(process.cwd(), "projects");
    const targetPath = path.join(projectsRoot, projectId);

    // Limpiar si existe
    await fs.rm(targetPath, { recursive: true, force: true });
    await fs.mkdir(projectsRoot, { recursive: true });

    // Preparar URL (inyectar token si es privado)
    let cloneUrl = repo;
    if (token) {
      // Formato: https://<token>@github.com/usuario/repo.git
      cloneUrl = repo.replace("https://", `https://${token}@`);
    }

    console.log(`>>> Iniciando clonación de ${repo} en ${targetPath}`);
    
    const { stdout, stderr } = await execPromise(`git clone ${cloneUrl} ${targetPath}`);
    
    return NextResponse.json({ success: true, message: "Clonación completada", stdout });

  } catch (error: any) {
    console.error("Error en Clonación Git:", error);
    return NextResponse.json({ 
      error: "Error al clonar el repositorio. Verifica que sea público o que el token sea válido.", 
      details: error.message 
    }, { status: 500 });
  }
}
