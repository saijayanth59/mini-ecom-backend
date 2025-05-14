require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Add explicit body-parser
const morgan = require("morgan");
const initDatabase = require("./utils/dbInit");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// Initialize the express app
const app = express();

// Add CORS to allow cross-origin requests
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Use morgan for logging
app.use(morgan("dev"));

// Body parsing middleware - Try using body-parser explicitly
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Initialize the database
initDatabase();

// Routes
app.use("/api/products", productRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
