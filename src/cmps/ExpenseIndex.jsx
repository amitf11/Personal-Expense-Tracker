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
    })

    function onAddExpense(expense) {
        expenseService.save(expense)
            .then(setExpenses(prevExpenses => [...prevExpenses, expense]))
    }


    return (
        <>
            <h1>Hello from ExpenseIndex</h1>
            <AddExpenseForm 
                onAddExpense={onAddExpense} />
            
            <ExpenseList 
                expenses={expenses}/>
        </>
    )
}