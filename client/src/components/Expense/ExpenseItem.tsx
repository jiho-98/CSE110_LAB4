import React from "react";

interface ExpenseItemProps {
  id: string;
  description: string;
  cost: number;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, description, cost }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{description}</span>
      <span className="badge bg-primary rounded-pill">${cost}</span>
    </li>
  );
};

export default ExpenseItem;
