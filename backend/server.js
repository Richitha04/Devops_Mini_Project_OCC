const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("🦇 BATCOM Backend Online — Gotham Protected");
});

/* ================= HEALTH CHECK ================= */

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ================= START SERVER ================= */

app.listen(8000, "0.0.0.0", () => {
  console.log("🦇 Gotham Server Running on port 8000");
});

/* ================= ADD LOG ================= */

async function addLog(action, details) {
  await pool.query(
    `INSERT INTO crime_logs (timestamp, action, details)
     VALUES (NOW(), $1, $2)`,
    [action, details]
  );
}

/* ================= GET CRIMINALS ================= */
/* Includes sightings + frontend-friendly names */

app.get("/criminals", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.name,
        c.alias,
        c.crime_description AS "crimeDescription",
        c.threat_level AS "threatLevel",
        c.case_status AS "caseStatus",
        c.captured,
        c.terminated,
        COALESCE(
          json_agg(
            json_build_object(
              'location', s.location,
              'date', s.date
            )
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS sightings
      FROM criminals c
      LEFT JOIN sightings s
      ON c.id = s.criminal_id
      GROUP BY c.id
      ORDER BY
        CASE c.threat_level
          WHEN 'high' THEN 3
          WHEN 'medium' THEN 2
          ELSE 1
        END DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});