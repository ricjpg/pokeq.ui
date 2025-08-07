import settings from "@/lib/settings";

export async function getReports() {
  try {
    const response = await fetch(`${settings.URL}/api/request`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response (GET):", data); // Para depurar la estructura de datos

    return Array.isArray(data) ? data : data.results || data.data || [];
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}

export async function createReport(pokemonType, sample_size) {
  try {
    const response = await fetch(`${settings.URL}/api/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemon_type: pokemonType,
        sample_size: sample_size,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response (POST):", data); // Para depurar la respuesta

    return data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
}

export async function deleteReport(id) {
  console.log(id);
  try {
    const response = await fetch(`${settings.URL}/api/request/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el reporte: ${response.status}`);
    }

    return await response.json(); // O response.text(), si la API no devuelve JSON
  } catch (error) {
    console.error("Error en deleteReport:", error);
    throw error;
  }
}
