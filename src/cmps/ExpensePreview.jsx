import { useState } from "react"
import { utilService } from "../services/util.service"
import { expenseService } from "../services/expense.service"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export function ExpensePreview({ expense, onRemoveExpense, onUpdateExpense }) {
    const [isEditMode, setIsEditMode] = useState(false)
    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        value = (type === 'date') ? value.toString() : value
        setExpenseToEdit(prevExpense => ({ ...prevExpense, [field]: value }))
    }

    function updateExpense(ev) {
        ev.preventDefault()
        expenseToEdit.createdAt = utilService.dateStringToTimestamp(expenseToEdit.createdAt)

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
                    <td>{expense.createdAt ? utilService.formatTimestamp(expense.createdAt) : 'Just Now'}</td>
                    <td>
                        <EditIcon
                            sx={{ color: '#333', cursor: 'pointer' }}
                            onClick={(ev) => setEditMode(ev, expense, true)} />
                        <DeleteIcon
                            sx={{ color: '#333', cursor: 'pointer' }}
                            onClick={() => removeExpense(expense._id)} />
                    </td>
                </tr> : (
                    <tr>
                        <td>
                            <input
                                className="edit-input"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={expenseToEdit.description}
                            /></td>
                        <td>
                            <select
                                className="edit-input"
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
                                className="edit-input"
                                type="number"
                                name="amount"
                                onChange={handleChange}
                                value={expenseToEdit.amount}
                            /></td>
                        <td>
                            <input
                                className="edit-input"
                                type="date"
                                name="createdAt"
                                onChange={handleChange}
                                value={utilService.timestampToDateString(expenseToEdit.createdAt)}
                            /></td>
                        <td>
                            <SaveIcon onClick={(ev) => updateExpense(ev)}><span></span></SaveIcon>
                            <CancelIcon onClick={(ev) => setEditMode(ev, false)} />
                        </td>
                    </tr>
                )}
        </>
    )
}