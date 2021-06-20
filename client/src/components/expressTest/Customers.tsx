import React from "react";
import { useState } from "react";

export interface Customer {
  id: number;
  name: string;
}

const Customers: React.FC = () => {
  const [data, setData] = useState<Customer[]>();

  const getData = async () => {
    const data = await (await fetch("/api/customers")).json();
    setData(data);
  };

  return (
    <div>
      <h1>Customers component</h1>
      <button onClick={getData}>Load customers</button>
      <ul>{data && data.map(({ name }, idx) => <li key={idx}>{name}</li>)}</ul>
    </div>
  );
};

export default Customers;
