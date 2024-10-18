export async function fetchPrice() {
  try {
    const response = await fetch("/api/fetchPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(/* your request data */),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch price");
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching price:", error);
    throw error;
  }
}
