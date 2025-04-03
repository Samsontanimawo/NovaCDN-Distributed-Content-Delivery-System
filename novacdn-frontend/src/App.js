import React, { useState } from "react";
import "./App.css";
import {
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function App() {
  const [contentId, setContentId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentHistory, setContentHistory] = useState([]);
  const [cache, setCache] = useState({});

  const getFileType = (id) => {
    const lower = id.toLowerCase();
    if (/\.(mp4|webm|ogg)$/i.test(lower)) return "video";
    return "text";
  };

  const getVideoS3Url = (filename) => {
    return `https://novacdn-videos.s3.amazonaws.com/videos/${encodeURIComponent(filename)}`;
  };

  const renderAndStore = (url, fileType, isCached, latency) => {
    const statusMessage = isCached
      ? "You are now accessing cached data!"
      : "This content was retrieved from our primary database.";

    let renderComponent;

    switch (fileType) {
      case "video":
        renderComponent = (
          <>
            <p>{statusMessage}</p>
            <video controls style={{ maxWidth: "100%" }}>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Latency: {latency}ms</p>
          </>
        );
        break;
      default:
        renderComponent = "Content not found or unsupported type.";
    }

    setContent(renderComponent);
    setCache((prev) => ({ ...prev, [contentId]: true }));
    setContentHistory((prev) => [
      ...prev,
      {
        id: contentId,
        content: renderComponent,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    setLoading(false);
  };

  const fetchContent = async () => {
    setLoading(true);
    const fileType = getFileType(contentId);
    const basePath =
      fileType === "video" ? getVideoS3Url(contentId) : "/" + contentId;
    const isCached = cache[contentId];
    const start = performance.now();

    if (isCached) {
      requestAnimationFrame(() => {
        const latency = Math.round(performance.now() - start);
        renderAndStore(basePath, fileType, true, latency);
      });
    } else {
      setTimeout(() => {
        const latency = Math.round(performance.now() - start);
        renderAndStore(basePath, fileType, false, latency);
      }, 500);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💡Welcome to NovaCDN 🌍</h1>
        <p>Enter video file name (e.g., CDN Explained.mp4, river.mp4...)</p>

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
                  <Typography
                    variant="caption"
                    sx={{ display: "block", marginTop: "10px" }}
                  >
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

      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          textAlign: "center",
          color: "#000",
        }}
      >
        <p>
          Project by <strong>Samson Tanimawo</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
