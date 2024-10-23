import axios from "axios";

export async function fetchPrice(token: string) {
  try {
    const response = await axios.post("/api/fetchPrice", { token });

    if (response.status !== 201) {
      throw new Error("Failed to fetch price");
    }

    const data = await response.data;
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching price:", error);
    throw error;
  }
}
