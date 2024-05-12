import { useState } from "react"
import { utilService } from "../services/util.service"
import { expenseService } from "../services/expense.service"

export function ExpensePreview({ expense, onRemoveExpense, onUpdateExpense }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setExpenseToEdit(prevExpense => ({ ...prevExpense, [field]: value }))
    }

    function updateExpense(ev) {
        ev.preventDefault()
        setIsEditMode(false)
        onUpdateExpense(expenseToEdit)
    }

    function removeExpense(expenseId) {
        onRemoveExpense(expenseId)
    }

    function setEditMode(ev, expense, bool) {
        ev.preventDefault()
        setIsEditMode(bool)
        setExpenseToEdit(expense)
    }

    return (
        <>
            {(!isEditMode) ?
                <tr>
                    <td>{expense.description}</td>
                    <td>{utilService.capitalizeFirstLetter(expense.category)}</td>
                    <td>${expense.amount}</td>
                    <td>{expense.createdAt ? utilService.getTimePassed(expense.createdAt) : 'Just Now'}</td>
                    <td>
                        <button onClick={() => removeExpense(expense._id)}>X</button>
                        <button onClick={(ev) => setEditMode(ev, expense, true)}>Edit</button>
                    </td>
                </tr> : (
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={expenseToEdit.description}
                            /></td>
                        <td>
                            <select
                                name="category"
                                onChange={handleChange}
                                value={expenseToEdit.category}
                            >
                                <option value={'general'}>General</option>
                                <option value={'personal'}>Personal</option>
                                <option value={'food'}>Food</option>
                                <option value={'housing'}>Housing</option>
                                <option value={'transportation'}>Transportation</option>
                                <option value={'utilities'}>Utilities</option>
                            </select></td>
                        <td>
                            <input
                                type="number"
                                name="amount"
                                onChange={handleChange}
                                value={expenseToEdit.amount}
                            /></td>
                        <td>
                            <input
                                type="date"
                                name="createdAt"
                                onChange={handleChange}
                                value={expenseToEdit.createdAt}
                            /></td>
                        <td>
                            <button onClick={(ev) => updateExpense(ev)}>Save</button>
                            <button onClick={(ev) => setEditMode(ev, false)}>Cancel</button>
                        </td>
                    </tr>
                )}
        </>
    )
}