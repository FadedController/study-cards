import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export interface Customer {
  id: number;
  name: string;
}

const Customers: React.FC = () => {
  const [data, setData] = useState<Customer[]>();

  const getData = async () => {
    const response = await fetch("/api/customers");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Customers component</h1>
      <ul>
        {data &&
          data.map((customer, idx) => <li key={idx}>{customer.name}</li>)}
      </ul>
    </div>
  );
};

export default Customers;
