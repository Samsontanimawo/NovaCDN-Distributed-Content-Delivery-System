import React, { useState } from "react";
import "./App.css";
import { Button, TextField, CircularProgress, Card, CardContent, Typography } from "@mui/material";

function App() {
  const [contentId, setContentId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentHistory, setContentHistory] = useState([]);

  // Simulating fetching content
  const fetchContent = async () => {
    setLoading(true);

    // Simulating a call to a CDN to fetch content based on Content ID
    const simulatedContent = {
      1: "Content for ID 1: Welcome to the NovaCDN simulation!",
      2: "Content for ID 2: This is sample content from our CDN.",
      3: "Content for ID 3: You are now accessing cached data!",
    };

    setTimeout(() => {
      if (simulatedContent[contentId]) {
        const newContent = simulatedContent[contentId];
        setContent(newContent);

        // Add to content history with timestamp
        setContentHistory((prevHistory) => [
          ...prevHistory,
          { content: newContent, timestamp: new Date().toLocaleString() },
        ]);
      } else {
        setContent("Content not found! Try a different ID.");
      }
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to NovaCDN Simulation</h1>
        <p>This is a simple simulation of a Content Delivery Network (CDN).</p>
        <div className="content-request">
          <TextField
            label="Enter Content ID"
            type="number"
            variant="outlined"
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            placeholder="e.g., 1, 2, 3..."
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchContent}
            disabled={loading}
            sx={{ marginTop: "20px" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Fetch Content"}
          </Button>
        </div>
        <div className="content-result">
          <h2>Content:</h2>
          <pre>{content}</pre>
        </div>
        <div className="content-history">
          <h2>Content History</h2>
          {contentHistory.length > 0 ? (
            contentHistory.map((item, index) => (
              <Card key={index} sx={{ marginBottom: "15px" }}>
                <CardContent>
                  <Typography variant="h6">Content ID: {index + 1}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.content}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: "5px" }}>
                    {item.timestamp}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No content history available.</Typography>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
