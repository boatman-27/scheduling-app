import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import pgSession from "connect-pg-simple";

dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Comment this out if you are using pgAdmin to connect to your database
  // Uncomment these if you are using pgAdmin to connect to your database
  // user: process.env.PG_USER,
  // password: process.env.PG_PASSWORD,
  // host: process.env.PG_HOST,
  // port: process.env.PG_PORT,
  // database: process.env.PG_DATABASE,
});

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const pgSessionStore = pgSession(session);

const corsOptions = {
  origin: ["http://localhost:5173", "https://meetingswithme.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    store: new pgSessionStore({
      pool: pool,
      tablename: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? "" : "none",
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

const calculateEndingTime = (time, duration) => {
  const [hours, minutes] = time.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = new Date(startDate);

  const [durationMinutes, , additionalText] = duration.split(" ");
  const durationHours = Number(durationMinutes) / 60;
  const durationMilliseconds = durationHours * 60 * 60 * 1000;
  endDate.setTime(endDate.getTime() + durationMilliseconds);

  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  const formattedEndHours = String(endHours).padStart(2, "0");
  const formattedEndMinutes = String(endMinutes).padStart(2, "0");

  return `${formattedEndHours}:${formattedEndMinutes}`;
};

const changeDateFormat = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

const checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Please log in" });
  }
};

app.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "User is authenticated", user: req.user });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
});

app.post("/account/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", info: info });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Login successful", user: user });
    });
  })(req, res, next);
});

app.post("/account/register", async (req, res) => {
  const { fName, lName, username, password, studentId } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR studentId = $2",
      [username, studentId]
    );
    if (result.rows.length > 0) {
      res.status(400).json({ message: "Email or ID already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const insertedResult = await pool.query(
        "INSERT INTO users (fName, lName, email, password, created_at, studentId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          fName,
          lName,
          username,
          hashedPassword,
          new Date().toISOString(),
          studentId,
        ]
      );
      const user = insertedResult.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "User Creation Failed" });
        } else {
          res.status(200).json({ message: "Account registered successful!" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Creation Failed" });
  }
});

app.put("/account/reset-password", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = ($1)", [
      username,
    ]);
    if (result.rows.length > 0) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await pool.query("UPDATE users SET password = ($1) WHERE email = ($2)", [
        hashedPassword,
        username,
      ]);
      res.status(200).json({ message: "Password reset successful!" });
    } else {
      res.status(400).json({ message: "Email does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Reset Password Failed" });
  }
});

app.post("/meetings/book", checkAuth, async (req, res) => {
  const { studentId, title, date, time, duration } = req.body;
  const dateFormatted = changeDateFormat(date);
  const endingTime = calculateEndingTime(time, duration);
  const durationMinutes = Number(duration.split(" ")[0]);
  try {
    const result = await pool.query(
      "INSERT INTO meetings (meeting_date, start_time, duration, end_time, studentid, title) VALUES ($1, $2, $3, $4, $5, $6)",
      [dateFormatted, time, durationMinutes, endingTime, studentId, title]
    );
    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking Failed" });
  }
});

app.get("/meetings/booked/:studentId", checkAuth, async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM meetings WHERE studentid = $1",
      [studentId]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ meetings: result.rows });
    } else {
      res.status(400).json({ message: "No meetings booked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking Failed" });
  }
});

passport.use(
  new Strategy(async function verify(username, password, done) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [username]
      );
      if (rows.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      } else {
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          done(null, user);
        } else {
          done(null, false, { message: "Incorrect password." });
        }
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
