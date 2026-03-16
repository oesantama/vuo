import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Usamos Gemini 2.0 Flash (Habilitado para esta API Key)
const MODEL_NAME = "gemini-2.0-flash";
console.log(`[VUO_IA_SYNC] CARGANDO_MODELO: ${MODEL_NAME}`);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export async function POST(req: Request) {
  try {
    const { instruction, projectId, currentFile } = await req.json();
    console.log(`[VUO_IA_EXE] PROCESANDO_INSTRUCCIÓN: ${instruction.substring(0, 20)}...`);

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Falta GEMINI_API_KEY" }, { status: 500 });
    }

    // Ruta base de proyectos
    const projectsRoot = process.env.NODE_ENV === 'production' ? "/app/projects" : path.join(process.cwd(), "projects");
    const projectPath = projectId === 'vuo-dev' ? process.cwd() : path.join(projectsRoot, projectId);

    // En un entorno de producción real, aquí leeríamos los archivos del proyecto
    // Para el POC, vamos a simular la edición de un archivo específico
    const filePath = path.join(projectPath, currentFile || "src/app/page.tsx");
    
    let fileContent = "";
    try {
      fileContent = await fs.readFile(filePath, "utf-8");
    } catch (e) {
      fileContent = "// Nuevo archivo";
    }

    const prompt = `
      Eres un experto desarrollador Full-stack.
      Instrucción del usuario: "${instruction}"
      
      Archivo actual (${currentFile}):
      \`\`\`
      ${fileContent}
      \`\`\`
      
      Devuelve ÚNICAMENTE el código completo actualizado del archivo, sin explicaciones ni bloques de markdown.
    `;

    const result = await model.generateContent(prompt);
    const updatedCode = result.response.text().trim().replace(/^```[a-z]*\n/i, "").replace(/\n```$/i, "");

    // Guardar el código en disco para que el servidor de desarrollo (puerto 3001) lo detecte
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, updatedCode, "utf-8");

    return NextResponse.json({ success: true, code: updatedCode });

  } catch (error: any) {
    console.error("Error en Vibe Edit:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
