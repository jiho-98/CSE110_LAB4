import React, { useState, useEffect } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const [newBudget, setNewBudget] = useState<number>(0);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const budgetAmount = await fetchBudget();
        setBudget(budgetAmount);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    loadBudget();
  }, []);

  const handleUpdateBudget = async () => {
    try {
      const updatedBudget = await updateBudget(newBudget);
      setBudget(updatedBudget);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <div>
      <h2>Budget: ${budget}</h2>
      <input
        type="number"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
        placeholder="Enter new budget"
      />
      <button onClick={handleUpdateBudget}>Update Budget</button>
    </div>
  );
};

export default Budget;
