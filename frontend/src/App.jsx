import { useEffect, useState } from "react";
import axios from "axios";
import Statistics from "./components/Statistics";
import WantedBoard from "./components/WantedBoard";

function App() {
    const API = "http://13.232.211.135:8000";
    const [activePage, setActivePage] = useState("add");

    // Form states
    const [name, setName] = useState("");
    const [alias, setAlias] = useState("");
    const [crimeDescription, setCrimeDescription] = useState("");
    const [threatLevel, setThreatLevel] = useState("low");

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Data states
    const [criminals, setCriminals] = useState([]);
    const [crimeLog, setCrimeLog] = useState([]);

    const load = async () => {
        const res = await axios.get(API + "/criminals");
        setCriminals(res.data);
    };

    const loadLogs = async () => {
        const res = await axios.get(API + "/logs");
        setCrimeLog(res.data);
    };

    useEffect(() => {
        load();
        loadLogs();
        const interval = setInterval(() => {
            load();
            loadLogs();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const addCriminal = async () => {
        if (!name) return;
        await axios.post(API + "/criminals", {
            name,
            alias,
            crimeDescription,
            threatLevel
        });
        setName("");
        setAlias("");
        setCrimeDescription("");
        setThreatLevel("low");
        load();
        loadLogs();
    };

    const sidebarBtn = (page) => ({
        width: "100%",
        padding: "15px 20px",
        marginBottom: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        background: activePage === page ? "#FFD700" : "#222",
        color: activePage === page ? "#000" : "#888",
        textAlign: "left"
    });

    const inputStyle = {
        padding: "12px 15px",
        borderRadius: "8px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        width: "100%"
    };

    const cardStyle = {
        background: "#151515",
        padding: "25px",
        borderRadius: "12px",
        border: "1px solid #333",
        marginBottom: "20px"
    };

    const renderContent = () => {
        if (activePage === "add") {
            return (
                <div>
                    <h2 style={{ color: "#FFD700" }}>Add New Target</h2>
                    <div style={cardStyle}>
                        <input
                            placeholder="Real Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                        />
                        <br /><br />
                        <input
                            placeholder="Alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            style={inputStyle}
                        />
                        <br /><br />
                        <button onClick={addCriminal}>Add</button>
                    </div>
                </div>
            );
        }

        if (activePage === "stats") {
            return <Statistics criminals={criminals} />;
        }

        if (activePage === "wanted") {
            return (
                <WantedBoard
                    criminals={criminals}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    load={load}
                    loadLogs={loadLogs}
                />
            );
        }

        return <div style={{ color: "#FFD700" }}>Coming Soon...</div>;
    };

    return (
        <div style={{ display: "flex", height: "100vh", background: "#000" }}>
            <div style={{ width: "250px", padding: "20px" }}>
                <button style={sidebarBtn("add")} onClick={() => setActivePage("add")}>Add Target</button>
                <button style={sidebarBtn("stats")} onClick={() => setActivePage("stats")}>Statistics</button>
                <button style={sidebarBtn("wanted")} onClick={() => setActivePage("wanted")}>Wanted Board</button>
            </div>

            <div style={{ flex: 1, padding: "30px" }}>
                {renderContent()}
            </div>
        </div>
    );
}

export default App;