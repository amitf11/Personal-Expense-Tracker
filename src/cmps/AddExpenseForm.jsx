import { useState } from "react";
import { expenseService } from "../services/expense.service";

export function AddExpenseForm({ onAddExpense }) {
    const [expenseToAdd, setExpenseToAdd] = useState(expenseService.getEmptyExpense())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setExpenseToAdd(prevExpense => ({ ...prevExpense, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        onAddExpense(expenseToAdd)
        setExpenseToAdd(expenseService.getEmptyExpense())
    }

    return (

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="description"
                value={expenseToAdd.description}
                onChange={handleChange} />
            <input
                type="number"
                name="amount"
                value={expenseToAdd.amount}
                onChange={handleChange} />
            <select
                name="category"
                onChange={handleChange}
                value={expenseToAdd.category}
            >
                <option value={'general'}>General</option>
                <option value={'personal'}>Personal</option>
                <option value={'food'}>Food</option>
                <option value={'housing'}>Housing</option>
                <option value={'transportation'}>Transportation</option>
                <option value={'utilities'}>Utilities</option>
            </select>
            <button>Add Expense</button>
        </form>
    )
}