import React, { useState } from "react";
import "./App.css";

function App() {
  const [contentId, setContentId] = useState("");
  const [content, setContent] = useState("");

  // Fetch content from the simulated CDN
  const fetchContent = async () => {
    // Simulating a call to a CDN to fetch content based on Content ID
    // Here, we're just using a simple static mapping for the simulation
    const simulatedContent = {
      1: "Content for ID 1: Welcome to the NovaCDN simulation!",
      2: "Content for ID 2: This is sample content from our CDN.",
      3: "Content for ID 3: You are now accessing cached data!",
    };

    if (simulatedContent[contentId]) {
      setContent(simulatedContent[contentId]);
    } else {
      setContent("Content not found! Try a different ID.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to NovaCDN Simulation</h1>
        <p>
          This is a simple simulation of a Content Delivery Network (CDN). Enter
          a content ID to fetch simulated content from the CDN.
        </p>
        <div className="content-request">
          <label htmlFor="contentId">Enter Content ID:</label>
          <input
            type="number"
            id="contentId"
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            placeholder="e.g., 1, 2, 3..."
          />
          <button onClick={fetchContent}>Fetch Content</button>
        </div>
        <div className="content-result">
          <h2>Content:</h2>
          <pre>{content}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
