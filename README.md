# Get Started

First clone this repo and enter the folder by doing

```bash
$ git clone https://github.com/FadedController/study-cards.git
# and then
$ cd study-cards
```

This project uses the yarn package manager, so **if you do not have it installed, run the following command**

```bash
$ npm install --global yarn
```

Now install the project dependencies

```bash
$ yarn
# and then
$ yarn install-client
```

After this you are all set up.

## Development

This project is divided in two main partitions, the React frontend and the express backend, to run them both in development mode at the same time, simply run

```bash
$ yarn dev
```

This will watch your files for changes and update both the frontend, and the backend whenever their files change

## Fetching to the backend

To fetch data from the backend, you simply have to fetch it from the route you have set up in Express. Take this backend code as an example

```typescript
// Express Backend
const express = require("express");
const app = express();
const PORT = 5000;

// GET at http://localhost:5000/api/customers
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
```

In this example, the /api/customers route will return the customers data, so if you wanted to use that data in the frontend, your code might look something like this

```javascript
// Customers component
const Customers => {
  const [data, setData] = useState()

  const fetchCustomers = async () => {
    fetch("/api/customers")
      .then(res => res.json())
      .then(data => setData(data))
  }

  useEffect(() => {
    // Call the fetch function once
    fetchCustomers()
  }, [])

  return (
    <div>{data}<div>
  )
}
```
