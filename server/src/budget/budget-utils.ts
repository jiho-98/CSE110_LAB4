// Server-side file: src/budget/budget-utils.ts

import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
	res.status(200).send({ data: budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
	const { amount } = body;

	// Validate that the amount is a number
	if (typeof amount !== "number") {
		return res.status(400).send({ error: "Invalid budget amount" });
	}

	// Update the budget
	budget.amount = amount;
	res.status(200).send({ message: "Budget updated successfully", budget: budget.amount });
}


