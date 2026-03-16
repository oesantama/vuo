async function diagnose() {
  const apiKey = "AIzaSyCpyPUFdQbl6ImIIMHm5yAhXitO4qCKKoE";
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("MODELOS_DISPONIBLES:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("ERROR:", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.log("ERROR_FETCH:", e.message);
  }
}

diagnose();
