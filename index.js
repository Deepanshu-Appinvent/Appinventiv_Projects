const express = require("express");
const app = express();
const calculatorRoutes = require("./src/routes/calculator");

app.use(express.json());

app.use("/calculator", calculatorRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
