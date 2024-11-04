import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from './context/AppContext';
import { MyBudgetTracker } from './views/MyBudgetTracker';

describe('Expense Tracker Functionality', () => {

  // Expense Creation Test
  test('should add a new expense and update spent/remaining correctly', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Simulate adding an expense
    const nameInput = screen.getByPlaceholderText('Enter name of expense');
    const costInput = screen.getByPlaceholderText('Enter cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(costInput, { target: { value: '50' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();

    expect(screen.getByText('Remaining: $800')).toBeInTheDocument();
    expect(screen.getByText('Spent so far: $50')).toBeInTheDocument();
  });

  // Adding Multiple Expenses
  test('should add multiple expenses and update spent/remaining correctly', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Add first expense
    const nameInput = screen.getByPlaceholderText('Enter name of expense');
    const costInput = screen.getByPlaceholderText('Enter cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(costInput, { target: { value: '50' } });
    fireEvent.click(saveButton);

    // Add second expense
    fireEvent.change(nameInput, { target: { value: 'Transport' } });
    fireEvent.change(costInput, { target: { value: '130' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('$130')).toBeInTheDocument();

    expect(screen.getByText('Remaining: $820')).toBeInTheDocument();
    expect(screen.getByText('Spent so far: $180')).toBeInTheDocument();
  });

  // Deleting an Expense
  test('should delete an expense and update spent/remaining correctly', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    // Add an expense
    const nameInput = screen.getByPlaceholderText('Enter name of expense');
    const costInput = screen.getByPlaceholderText('Enter cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(costInput, { target: { value: '50' } });
    fireEvent.click(saveButton);

    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();

    expect(screen.getByText('Remaining: $1000')).toBeInTheDocument();
    expect(screen.getByText('Spent so far: $0')).toBeInTheDocument();
  });

  // test Budget Balance Verification
  test('should validate the budget balance equation after adding expenses', () => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );

    const initialBudget = 1000;

    // Add an expense
    const nameInput = screen.getByPlaceholderText('Enter name of expense');
    const costInput = screen.getByPlaceholderText('Enter cost');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Groceries' } });
    fireEvent.change(costInput, { target: { value: '50' } });
    fireEvent.click(saveButton);

    const remaining = parseInt(screen.getByText(/Remaining: \$([\d]+)/).textContent!.match(/\d+/)![0]);
    const spentSoFar = parseInt(screen.getByText(/Spent so far: \$([\d]+)/).textContent!.match(/\d+/)![0]);

    expect(initialBudget).toEqual(remaining + spentSoFar);
  });

});
