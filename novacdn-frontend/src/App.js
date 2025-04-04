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
import { Line } from "react-chartjs-2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

function App() {
  const [contentId, setContentId] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentHistory, setContentHistory] = useState([]);
  const [cache, setCache] = useState({});
  const [stars, setStars] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [latencyData, setLatencyData] = useState([]);

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
      case "video": return "videos";
      case "image": return "images";
      case "audio": return "audios";
      case "document": return "documents";
      default: return "";
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

    setLatencyData((prev) => [
      ...prev,
      {
        label: contentId,
        latency,
        source: isCached ? "Cache" : "Origin",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setContent(renderComponent);
    setCache((prev) => ({ ...prev, [contentId]: true }));
    setContentHistory((prev) => [
      ...prev,
      { id: contentId, content: renderComponent, timestamp: new Date().toLocaleString() },
    ]);
    setLoading(false);
  };

  const fetchContent = async () => {
    setHasFetched(true);
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

  // Chart config
  const chartData = {
    labels: latencyData.map((d) => d.timestamp),
    datasets: [
      {
        label: "Origin Fetch",
        data: latencyData.filter((d) => d.source === "Origin").map((d) => d.latency),
        borderColor: "#ff6f00",
        backgroundColor: "#ffb74d",
        tension: 0.4,
      },
      {
        label: "Cache Fetch",
        data: latencyData.filter((d) => d.source === "Cache").map((d) => d.latency),
        borderColor: "#00c853",
        backgroundColor: "#69f0ae",
        tension: 0.4,
      },
    ],
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvRows = [
      ["File", "Latency (ms)", "Source", "Timestamp"],
      ...latencyData.map((row) => [row.label, row.latency, row.source, row.timestamp]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "latency_chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("NovaCDN - Latency Data", 14, 20);
    autoTable(doc, {
      head: [["File", "Latency (ms)", "Source", "Timestamp"]],
      body: latencyData.map((d) => [d.label, d.latency, d.source, d.timestamp]),
      startY: 30,
    });
    doc.save("latency_chart_data.pdf");
  };

  return (
    <div className="App">
      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`star ${star.color}`}
            style={{
              left: `${star.left}vw`,
              top: `-${Math.random() * 100}vh`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <header className="App-header">
        <h1>
          Welcome to Nova<span className="bounce-rocket">🚀</span>CDN
        </h1>
        <p>Enter a file name (e.g., CDN Explained.mp4, Resume.pdf, cdn.png...)</p>

        <div className="content-request" style={{ marginTop: "40px" }}>
          <TextField
            label={!hasFetched ? "Enter File Name" : ""}
            placeholder={!hasFetched ? "Enter file name" : ""}
            variant="outlined"
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            fullWidth
            style={{ maxWidth: "400px" }}
            InputProps={{ style: { textAlign: "center" } }}
            InputLabelProps={{
              style: { left: "50%", transform: "translateX(-50%)" },
              shrink: false,
            }}
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

        {/* 📊 Chart + Export */}
        <div className="chart-container" style={{ marginTop: "50px", background: "#fff", padding: "20px", borderRadius: "10px", maxWidth: "800px", width: "100%" }}>
          <h2 style={{ color: "#000", fontWeight: "bold" }}>📊 Latency Comparison 📶</h2>
          <Line data={chartData} />
          <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleExportCSV}>Export CSV</Button>
            <Button variant="outlined" onClick={handleExportPDF}>Export PDF</Button>
          </div>
        </div>

        {/* Keep rest of your original code intact, including footer */}
      </header>

      <div className="content-history">
          <h2 style={{ color: "#000000", fontWeight: "bold" }}>Content History</h2>

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
            <Typography style={{ color: "#fff" }}>
              No content history available.
            </Typography>
          )}
        </div>

   <footer className="App-footer">
  <div className="footer-container">
    
    {/* Social Media Icons */}
    <div className="social-links">
      <a
        href="https://www.linkedin.com/in/tanimawo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <svg className="social-icon linkedin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0h4.5v2.2h.1c.63-1.2 2.17-2.45 4.47-2.45 4.78 0 5.67 3.14 5.67 7.22V23h-5v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.5V23h-5V8z" />
        </svg>
      </a>
      <a
        href="https://github.com/Samsontanimawo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <svg className="social-icon github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.96.13 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.62 1.57.23 2.73.11 3.02.73.81 1.18 1.84 1.18 3.1 0 4.45-2.7 5.43-5.27 5.72.41.35.78 1.03.78 2.08v3.09c0 .31.21.67.79.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
      </a>
    </div>

    {/* Author Name */}
    <p className="footer-author">Project by Samson Tanimawo, PhD</p>

    {/* Scrolling Tech Stack */}
    <div className="scroll-container">
    <div className="scrolling-tech-wrapper">
        <span className="tech-item skills">💻SKILLS:</span>
        <span className="tech-item python">PYTHON</span>
        <span className="tech-item javascript">JAVASCRIPT</span>
        <span className="tech-item react">REACT</span>
        <span className="tech-item node">NODE.JS</span>
        <span className="tech-item docker">DOCKER</span>
        <span className="tech-item kubernetes">KUBERNETES</span>
        <span className="tech-item aws">AWS</span>
        <span className="tech-item nginx">NGINX</span>
        <span className="tech-item redis">REDIS</span>
        <span className="tech-item sql">SQL</span>
        <span className="tech-item mongodb">MONGODB</span>        
        <span className="tech-item prometheus">PROMETHEUS</span>
        <span className="tech-item grafana">GRAFANA</span>
        <span className="tech-item splunk">SPLUNK</span>
        <span className="tech-item newrelic">NEW RELIC</span>
        <span className="tech-item linux">LINUX</span>
        <span className="tech-item unix">UNIX</span>
        <span className="tech-item dynatrace">DYNATRACE</span>
        <span className="tech-item cicd">CI/CD</span>
        <span className="tech-item git">GIT</span>
        <span className="tech-item terraform">TERRAFORM</span>
        <span className="tech-item ansible">ANSIBLE</span>
        <span className="tech-item agile">AGILE</span>        
        <span className="tech-item dns">DNS</span>
        <span className="tech-item cdn">CDN</span>
        <span className="tech-item http">HTTP/HTTPS</span>
        <span className="tech-item tcpips">TCP/IPS</span>
        <span className="tech-item bgp">BGP</span>
        <span className="tech-item tls">TLS</span>
        <span className="tech-item confluence">CONFLUENCE</span>
        <span className="tech-item jira">JIRA</span>
        <span className="tech-item geneos">GENEOS</span>
        <span className="tech-item wolverine">WOLVERINE</span>
        <span className="tech-item odin">ODIN</span>
        <span className="tech-item autosys">AUTOSYS</span>
        <span className="tech-item jwt">JWT</span>
        <span className="tech-item oauth">OAuth 2.0</span>
        <span className="tech-item heart">❤️</span>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;