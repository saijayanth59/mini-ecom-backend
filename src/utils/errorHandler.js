exports.handleErrorResponse = (res, error) => {
  console.error("Error:", error.message);

  if (error.message.includes("required") || error.message.includes("must be")) {
    return res.status(400).json({ message: error.message });
  }

  res.status(500).json({
    message: "Server error occurred",
    error: process.env.NODE_ENV === "production" ? undefined : error.message,
  });
};
