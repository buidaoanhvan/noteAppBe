const express = require("express");
const appRouter = require("./router/router");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(appRouter);

app.use((err, req, res, next) => {
  console.error("Lỗi toàn cục:", err);
  res.status(500).json({ error: "Lỗi không xác định" });
});

app.listen(3000, () => console.log("noteApp http://localhost:3000"));
