import db from "./db.js";

// Add status column to requests table
db.run("ALTER TABLE requests ADD COLUMN status TEXT DEFAULT 'pending'", (err) => {
  if (err) {
    if (err.message.includes("duplicate column name")) {
      console.log("Column 'status' already exists.");
    } else {
      console.error("Error adding column:", err.message);
    }
  } else {
    console.log("Successfully added column 'status'.");
  }
  process.exit();
});
