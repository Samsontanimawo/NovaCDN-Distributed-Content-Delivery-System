import React, { useState, useEffect } from "react";
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
  const [stars, setStars] = useState([]);

  const s3BaseUrl = "https://novacdn-files.s3.amazonaws.com";

  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      color: ["red", "blue", "purple", "white"][Math.floor(Math.random() * 4)],
    }));
    setStars(generatedStars);
  }, []);

  const getFileType = (id) => {
    const lower = id.toLowerCase();
    if (/\.(mp4|webm|ogg)$/i.test(lower)) return "video";
    if (/\.(png|jpg|jpeg|gif|webp)$/i.test(lower)) return "image";
    if (/\.(mp3|wav|aac)$/i.test(lower)) return "audio";
    if (/\.(pdf|docx?|txt|csv)$/i.test(lower)) return "document";
    return "text";
  };

  const getS3Path = (type) => {
    switch (type) {
      case "video":
        return "videos";
      case "image":
        return "images";
      case "audio":
        return "audios";
      case "document":
        return "documents";
      default:
        return "";
    }
  };

  const renderAndStore = (url, fileType, isCached, latency) => {
    const statusMessage = isCached
      ? "You are now accessing cached data!"
      : "This content was retrieved from the origin server.";

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

      case "audio":
        renderComponent = (
          <>
            <p>{statusMessage}</p>
            <audio controls>
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>Latency: {latency}ms</p>
          </>
        );
        break;

      case "image":
        renderComponent = (
          <>
            <p>{statusMessage}</p>
            <img src={url} alt={contentId} style={{ maxWidth: "100%" }} />
            <p>Latency: {latency}ms</p>
          </>
        );
        break;

      case "document":
        renderComponent = (
          <>
            <p>{statusMessage}</p>
            <a href={url} download style={{ color: "#61dafb" }}>
              Click to download {contentId}
            </a>
            <p>Latency: {latency}ms</p>
          </>
        );
        break;

      default:
        renderComponent = "Unsupported file type.";
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
    const folder = getS3Path(fileType);
    const encodedId = encodeURIComponent(contentId);
    const fileUrl = `${s3BaseUrl}/${folder}/${encodedId}`;
    const isCached = cache[contentId];
    const start = performance.now();

    if (isCached) {
      requestAnimationFrame(() => {
        const latency = Math.round(performance.now() - start);
        renderAndStore(fileUrl, fileType, true, latency);
      });
    } else {
      setTimeout(() => {
        const latency = Math.round(performance.now() - start);
        renderAndStore(fileUrl, fileType, false, latency);
      }, 500);
    }
  };

  return (
    <div className="App">
      {/* Starfield background */}
      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}vw`,
              top: `-${Math.random() * 100}vh`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              backgroundColor: star.color,
            }}
          />
        ))}
      </div>

      <header className="App-header">
        <h1> Welcome to Nova🚀CDN </h1>
        <p>Enter a file name (e.g., flow.mp3, CDN Explained.mp4, Resume.pdf, cdn.png...)</p>

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
    color: "#fff",
    background: "linear-gradient(135deg, #0d47a1, #1976d2)", // Same as App-header
  }}
>
  <p style={{ fontSize: "0.95rem", marginTop: "10px" }}>
    <strong>Project by Samson Tanimawo</strong>
  </p>
  <p style={{ fontSize: "0.95rem", marginTop: "10px" }}>
    <strong>💻 Built with</strong> <strong>React</strong>, <strong>Node.js</strong>, <strong>Docker</strong>,{" "}
    <strong>Kubernetes</strong>, <strong>AWS</strong>, <strong>Nginx</strong>,{" "}
    <strong>Redis</strong>, <strong>Git</strong>, <strong>Prometheus</strong>,{" "}
    <strong>Grafana</strong>, <strong>Splunk</strong>, <strong>and</strong> ❤️
  </p>
</footer>

    </div>
  );
}

export default App;
