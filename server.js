const express = require("express");
const app = express();
const PORT = 5000;

app.get("/api/customers", (req, res) => {
  const customers = [
    {
      id: 1,
      name: "Axel Padilla",
    },
    {
      id: 2,
      name: "John Doe",
    },
    {
      id: 3,
      name: "Steve Swanson",
    },
  ];

  res.json(customers);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
