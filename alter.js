import db from "./db.js";

// Add status column
db.run(
  "ALTER TABLE requests ADD COLUMN status TEXT DEFAULT 'pending'",
  (err) => {
    if (err) {
      if (err.message.includes("duplicate column name")) {
        console.log("Column 'status' already exists.");
      } else {
        console.error("Error adding status column:", err.message);
      }
    } else {
      console.log("Successfully added column 'status'.");
    }

    // Add image column
    db.run("ALTER TABLE requests ADD COLUMN image TEXT", (err2) => {
      if (err2) {
        if (err2.message.includes("duplicate column name")) {
          console.log("Column 'image' already exists.");
        } else {
          console.error("Error adding image column:", err2.message);
        }
      } else {
        console.log("Successfully added column 'image'.");
      }
    });

    process.exit();
  },
);
