import { useState, useEffect } from "react";

import { ExpenseList } from "./ExpenseList";
import { ExpenseFilter } from "./ExpenseFilter";
import { ExpenseSort } from "./ExpenseSort";
import { AddExpenseForm } from "./AddExpenseForm";
import { expenseService } from "../services/expense.service";

export function ExpenseIndex() {
    const [expenses, setExpenses] = useState([])
    const [sortBy, setSortBy] = useState(expenseService.getDefaultSortBy())
    const [filterBy, setFilterBy] = useState(expenseService.getDefaultFilterBy())

    useEffect(() => {
        expenseService.query(filterBy, sortBy)
            .then(res => setExpenses(res))
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }

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
        let updatedExpenses
        expenseService.save(updatedExpense)
            .then(
                updatedExpenses = expenses.map(expense => expense._id === updatedExpense._id ? updatedExpense : expense),
                setExpenses(updatedExpenses)
            )
    }


    return (
        <>
            <AddExpenseForm
                onAddExpense={onAddExpense} />

            <ExpenseFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter} />

            <ExpenseSort
                sortBy={sortBy}
                onSetSort={onSetSort} />

            <ExpenseList
                expenses={expenses}
                onRemoveExpense={onRemoveExpense}
                onUpdateExpense={onUpdateExpense} />
        </>
    )
}