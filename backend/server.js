// server.js
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import cors from "cors"
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(cors()); 
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "folajimi2008",
  database: "management"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting into admins:", err); // 👈 print error
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json({ message: "User registered successfully" });
  });
});


// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare password (⚠️ currently plaintext — we should use bcrypt later)
    if (password === user.password) {
      // ✅ Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email }, // payload
        "secretkey", // change this to process.env.JWT_SECRET in real apps
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Read all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});


//  update the POST /students endpoint
app.post("/students", (req, res) => {
  const {
    student_id,
    name,
    dob,
    photo,
    gender,
    nationality,
    languages,
    enrolment_year,
    class: studentClass,
    status,
  } = req.body;


  const sql =
    "INSERT INTO students (student_id, name, dob, photo, gender, nationality, languages, enrolment_year, `class`, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(
    sql,
    [student_id, name, dob, photo, gender, nationality, languages, enrolment_year, studentClass, status],
    (err, result) => {
      if (err) {
        console.error("Error inserting student:", err);
        
        // Check for duplicate entry error
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
          return res.status(400).json({ 
            error: "Duplicate student ID", 
            details: `Student ID "${student_id}" already exists. Please use a different ID.` 
          });
        }
        
        res.status(500).json({ error: "Error inserting student", details: err.message });
        return;
      }
      res.json({ message: "Student added successfully", id: result.insertId });
    }
  );
});

// Update student - FIXED
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { 
    student_id, 
    name, 
    dob, 
    photo, 
    gender, 
    nationality, 
    languages, 
    enrolment_year, 
    class: studentClass, 
    status 
  } = req.body;
  

  const sql = `
    UPDATE students 
    SET student_id = ?, name = ?, dob = ?, photo = ?, gender = ?, nationality = ?, languages = ?, enrolment_year = ?, \`class\` = ?, status = ?
    WHERE id = ?`;

  db.query(sql, [
    student_id, 
    name, 
    dob, 
    photo, 
    gender, 
    nationality, 
    languages, 
    enrolment_year, 
    studentClass, 
    status, 
    id
  ], (err, result) => {
    if ( err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Student updated successfully!" });
  });
});

// ✅ DELETE a student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM students WHERE id=?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete student" });
      return;
    }
    res.json({ message: "Student deleted successfully" });
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Student Management Backend is running');
});


// Search 
app.get("/students/search", (req, res) => {
  const q = req.query.q;
  db.query(
    "SELECT * FROM students WHERE name LIKE ?",
    [`%${q}%`],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "secretkey"); // use process.env.JWT_SECRET in production
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Student Login
app.post("/student-login", (req, res) => {
  const { student_id, password } = req.body;

  if (!student_id || !password) {
    return res.status(400).json({ message: "Student ID and password are required" });
  }

  db.query("SELECT * FROM students WHERE student_id = ?", [student_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid Student ID" });
    }

    const student = results[0];

    // For now compare plain text, later we’ll use bcrypt
    if (student.password === password) {
      const token = jwt.sign(
        { student_id: student.student_id, role: "student" },
        "secretkey",
        { expiresIn: "2h" }
      );

      return res.json({
        message: "Login successful",
        token,
        student: {
          id: student.student_id,
          name: student.name,
          class: student.class,
          status: student.status,
        }
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  });
});


// Get student profile by token
app.get("/student/me", verifyToken, (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ error: "Forbidden" });
  }

  db.query(
    "SELECT * FROM students WHERE student_id = ?",
    [req.user.student_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(404).json({ error: "Student not found" });

      res.json(results[0]);
    }
  );
});


// Express backend
// app.get("/student/me", authenticateToken, async (req, res) => {
//   try {
//     const studentId = req.user.student_id; // from decoded token
//     const [student] = await db.query("SELECT * FROM students WHERE student_id = ?", [studentId]);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json(student);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



app.listen(5000, () => console.log("Server running on http://localhost:5000"));
