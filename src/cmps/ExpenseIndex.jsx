import { useState } from "react";
import { ExpenseList } from "./ExpenseList";
import { useEffect } from "react";
import { expenseService } from "../services/expense.service";
import { AddExpenseForm } from "./AddExpenseForm";

export function ExpenseIndex() {
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        expenseService.query()
            .then(res => setExpenses(res))
    }, [])

    function onAddExpense(expense) {
        expenseService.save(expense)
            .then(setExpenses(prevExpenses => [...prevExpenses, expense]))
    }

    function onRemoveExpense(expenseId) {
        let updatedExpenses
        expenseService.remove(expenseId)
            .then(
                updatedExpenses = expenses.filter(expense => expense._id !== expenseId),
                setExpenses(updatedExpenses)
            )
    }

    function onUpdateExpense(updatedExpense) {
        let idx
        let updatedExpenses
        expenseService.save(updatedExpense)
            .then(
                // idx = expenses.findIndex(expense => expense._id === updatedExpense._id),
                // expenses.splice(idx, 1, updatedExpense),
                updatedExpenses = expenses.map(expense => expense._id === updatedExpense._id ? updatedExpense : expense),
                setExpenses(updatedExpenses)
            )
    }


    return (
        <>
            <h1>Hello from ExpenseIndex</h1>
            <AddExpenseForm 
                onAddExpense={onAddExpense} />
            
            <ExpenseList 
                expenses={expenses}
                onRemoveExpense={onRemoveExpense}
                onUpdateExpense={onUpdateExpense} />
        </>
    )
}