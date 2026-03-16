import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) return new NextResponse("Falta projectId", { status: 400 });

  const projectsRoot = path.join(process.cwd(), "projects");
  const projectPath = projectId === 'vuo-dev' ? process.cwd() : path.join(projectsRoot, projectId);
  
  try {
    // Intentar leer un archivo de entrada (page.tsx o index.html)
    // Para el POC, vamos a buscar el archivo principal y devolver una versión "previsualizable"
    const possibleFiles = [
      path.join(projectPath, "src/app/page.tsx"),
      path.join(projectPath, "index.html"),
      path.join(projectPath, "src/index.js")
    ];

    let content = "";
    let foundFile = "";

    for (const file of possibleFiles) {
      try {
        content = await fs.readFile(file, "utf-8");
        foundFile = file;
        break;
      } catch (e) {}
    }

    if (!content) {
      return new NextResponse(`
        <html>
          <body style="background: #000; color: #00FF41; font-family: monospace; padding: 50px; text-align: center;">
            <div style="border: 1px solid #00FF41; padding: 20px; display: inline-block;">
              <h2>SISTEMA_VUO: VISTA_PREVIA_NO_DISPONIBLE</h2>
              <p>No se encontró un punto de entrada válido en este repositorio.</p>
              <p>Ruta: ${projectPath}</p>
            </div>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    // Si es un archivo de React/TSX, hacemos una transformación ultra-simple para mostrar ALGO
    if (foundFile.endsWith(".tsx") || foundFile.endsWith(".js")) {
      return new NextResponse(`
        <html>
          <body style="background: #f8fafc; font-family: sans-serif; padding: 40px;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <h1 style="color: #0f172a; margin-bottom: 24px;">Previsualización Dinámica (VUO_SYNERGY_HUD)</h1>
              <div style="padding: 20px; background: #f1f5f9; border-radius: 4px; font-family: monospace; white-space: pre-wrap; font-size: 13px; color: #334155;">
                ${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </div>
              <p style="margin-top: 24px; color: #64748b; font-size: 14px;">
                Nota: Esta es una vista de código renderizada. En producción, aquí verías la aplicación ejecutándose.
              </p>
            </div>
          </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    return new NextResponse(content, { headers: { 'Content-Type': 'text/html' } });

  } catch (error: any) {
    return new NextResponse("Error cargando previsualización: " + error.message, { status: 500 });
  }
}
