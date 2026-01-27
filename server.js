const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// public 配下を静的配信
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Food MBTI app running at http://localhost:${PORT}`);
});
