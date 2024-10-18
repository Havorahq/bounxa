import axios from "axios";

export async function fetchPrice() {
  try {
    // const response = await fetch("/api/fetchPrice", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // body: JSON.stringify(/* your request data */),
    // });

    const response = await axios.post('/api/fetchPrice', {})
    console.log(response)

    if (response.status !== 201) {
      throw new Error("Failed to fetch price");
    }

    const data = await response.data
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching price:", error);
    throw error;
  }
}
