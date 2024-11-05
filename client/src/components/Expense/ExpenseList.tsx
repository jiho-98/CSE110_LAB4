import { useEffect, useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { fetchExpenses } from "../../utils/expense-utils"; // Ensure this path is correct

const ExpenseList = () => {
  const { expenses, setExpenses } = useContext(AppContext); // Assuming setExpenses is available in AppContext

  // Function to load expenses and handle errors
  const loadExpenses = async () => {
    try {
      const expenseList = await fetchExpenses();
      setExpenses(expenseList);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // Fetch expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <ul className="list-group">
      {expenses.map((expense: Expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          description={expense.description}
          cost={expense.cost}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;