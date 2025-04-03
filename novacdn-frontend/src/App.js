import React, { useState } from "react";
import "./App.css";
import {
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography
} from "@mui/material";

function App() {
  const [contentId, setContentId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentHistory, setContentHistory] = useState([]);
  const [cache, setCache] = useState({}); // Track cached files

  const getFileType = (id) => {
    const lower = id.toLowerCase();
    if (/\.(png|jpg|jpeg|gif)$/i.test(lower)) return "image";
    if (/\.(mp4|webm|ogg)$/i.test(lower)) return "video";
    if (/\.(mp3|wav)$/i.test(lower)) return "audio";
    if (/\.(pdf|doc|docx|txt|csv)$/i.test(lower)) return "document";
    return "text";
  };

  const getFolderPath = (fileType) => {
    switch (fileType) {
      case "image":
        return "/images/";
      case "video":
        return "/video/";
      case "audio":
        return "/audio/";
      case "document":
        return "/documents/";
      default:
        return "/";
    }
  };

  const fetchContent = async () => {
    setLoading(true);

    setTimeout(() => {
      const fileType = getFileType(contentId);
      const folderPath = getFolderPath(fileType);
      const basePath = folderPath + contentId;

      const isCached = cache[contentId];
      const statusMessage = isCached
        ? "You are now accessing cached data!"
        : "This is sample content from our CDN.";

      let renderComponent;

      switch (fileType) {
        case "image":
          renderComponent = (
            <>
              <p>{statusMessage}</p>
              <img src={basePath} alt={contentId} />
            </>
          );
          break;
        case "video":
          renderComponent = (
            <>
              <p>{statusMessage}</p>
              <video controls>
                <source src={basePath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          );
          break;
        case "audio":
          renderComponent = (
            <>
              <p>{statusMessage}</p>
              <audio controls>
                <source src={basePath} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </>
          );
          break;
        case "document":
          renderComponent = (
            <>
              <p>{statusMessage}</p>
              <a href={basePath} download style={{ color: "#61dafb" }}>
                Click to download {contentId}
              </a>
            </>
          );
          break;
        default:
          const textContent = {
            "1": "Content for ID 1: Welcome to the NovaCDN simulation!",
            "2": "Content for ID 2: This is sample content from our CDN.",
            "3": "Content for ID 3: You are now accessing cached data!"
          };
          renderComponent = textContent[contentId] || "Content not found!";
      }

      setContent(renderComponent);

      // Update cache
      setCache((prev) => ({ ...prev, [contentId]: true }));

      setContentHistory((prev) => [
        ...prev,
        {
          id: contentId,
          content: renderComponent,
          timestamp: new Date().toLocaleString()
        }
      ]);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to NovaCDN Simulation</h1>
        <p>Enter file name (e.g., audio.mp3, river.mp4, cnd.png, doc1.pdf...)</p>

        <div className="content-request">
          <TextField
            label="Enter File Name"
            variant="outlined"
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={fetchContent}
            disabled={loading}
            sx={{ marginTop: "20px" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Fetch Content"}
          </Button>
        </div>

        <div className="content-result">
          <h2>Content:</h2>
          {content}
        </div>

        <div className="content-history">
          <h2>Content History</h2>
          {contentHistory.length > 0 ? (
            contentHistory.map((item, index) => (
              <Card key={index} sx={{ marginBottom: "15px" }}>
                <CardContent>
                  <Typography variant="h6">File: {item.id}</Typography>
                  <div>{item.content}</div>
                  <Typography variant="caption" sx={{ display: "block", marginTop: "10px" }}>
                    {item.timestamp}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No content history available.</Typography>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
