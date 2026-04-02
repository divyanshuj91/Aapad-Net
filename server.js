import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./db.js";

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// --------------------
// View Engine
// --------------------
app.set("view engine", "ejs");
app.set("views", "./views");

// --------------------
// Auth Middleware
// --------------------
function requireAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.redirect("/login");
  }
  next();
}

// --------------------
// Routes
// --------------------

// Home
app.get("/", (req, res) => {
  const status = "Online";
  const statusClass = status === "Online" ? "text-green-500" : "text-red-500";

  res.render("index", { status, statusClass });
});

// Safe page
app.get("/safe", (req, res) => {
  res.render("safe");
});
app.post("/safe", (req, res) => {
  const { name, location } = req.body;

  if (!name) {
    return res.status(400).send("Name required");
  }

  db.run(
    "INSERT INTO safe_people (name, location) VALUES (?, ?)",
    [name, location],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }

      res.json({ success: true, id: this.lastID });
    },
  );
});

// Report Page
app.get("/report", (req, res) => {
  res.render("report");
});

// Request form page
app.get("/request", (req, res) => {
  res.render("request");
});

// Handle request submission
app.post("/request", (req, res) => {
  const { name, phone, type, location, urgency } = req.body;

  if (!name) {
    return res.status(400).send("Name required");
  }

  const query =
    "INSERT INTO requests (name, phone, type, location, urgency) VALUES (?, ?, ?, ?, ?)";

  db.run(query, [name, phone, type, location, urgency], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.json({
      success: true,
      message: "Request submitted successfully",
      id: this.lastID,
    });
  });
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAdmin = true;
    return res.redirect("/admin");
  }

  res.status(401).send("Invalid credentials");
});

// Admin panel
app.get("/admin", requireAdmin, (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/login");
  }

  db.all(
    "SELECT * FROM requests ORDER BY created_at DESC",
    [],
    (err, requests) => {
      if (err) return res.status(500).send("Database error");

      db.get(
        "SELECT COUNT(*) as count FROM safe_people",
        [],
        (err2, safeCount) => {
          if (err2) return res.status(500).send("Database error");

          db.get(
            "SELECT COUNT(*) as criticalCount FROM requests WHERE urgency = 'critical'",
            [],
            (err3, criticalData) => {
              if (err3) return res.status(500).send("Database error");

              db.get(
                "SELECT COUNT(*) as highCount FROM requests WHERE urgency = 'high'",
                [],
                (err4, highData) => {
                  if (err4) return res.status(500).send("Database error");

                  res.render("admin", {
                    requests,
                    safeCount: safeCount.count,
                    criticalCount: criticalData.criticalCount,
                    highCount: highData.highCount,
                  });
                },
              );
            },
          );
        },
      );
    },
  );
});
// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.post("/admin/request/:id/status", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "in_progress", "resolved"].includes(status)) {
    return res.status(400).send("Invalid status");
  }

  db.run("UPDATE requests SET status = ? WHERE id = ?", [status, id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    res.json({ success: true });
  });
});

// --------------------
// Start Server
// --------------------
const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
