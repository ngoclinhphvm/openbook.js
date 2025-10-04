// Example usage of openbook.js
import { OpenLibraryClient } from "./src/client";

async function example() {
  const client = new OpenLibraryClient("MyAppName/1.0 (myemail@example.com)");

  try {
    const searchResults = await client.search({
      q: "noi+buon+chien+tranh",
      lang: "vie",
    });

    console.log("Found", searchResults.num_found, "results");
    if (searchResults.docs.length > 0) {
      console.log("First result author key:", searchResults.docs[0].author_key);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

example();
