import { createExpense } from "../../utils/expense-utils";
import { Expense } from "../../types/types";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"; // Assuming you have context to manage expenses

const AddExpenseForm = () => {
    const [description, setDescription] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const { expenses, setExpenses } = useContext(AppContext);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevents the form from refreshing the page

        try {
            const expenseCost = parseFloat(cost);
            if (isNaN(expenseCost)) {
                console.error("Invalid cost value");
                return; // Exit if the cost is not a valid number
            }

            // Create a new expense object
            const newExpense: Expense = {
                id: crypto.randomUUID(),
                description: description.trim(),
                cost: expenseCost,
            };

            // Call the backend API to create the expense
            const createdExpense = await createExpense(newExpense);

            // Ensure the expense was successfully created before updating the context
            if (createdExpense && createdExpense.id) {
                setExpenses([...expenses, createdExpense]); // Update the expenses in context
            } else {
                console.error("Failed to add expense: Invalid response from backend");
            }

            // Reset the form fields
            setDescription("");
            setCost("");
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    required
                />
            </div>
            <div>
                <label>Cost</label>
                <input
                    type="text"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Enter cost"
                    required
                />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpenseForm;



