import { utilService } from "../services/util.service"

export function ExpensePreview({ expense, onRemoveExpense }) {

    function removeExpense(expenseId) {
        onRemoveExpense(expenseId)
    }

    return (
        <tr>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>${expense.amount}</td>
            <td>{expense.createdAt ? utilService.getTimePassed(expense.createdAt) : 'Just Now'}</td>
            <td>
                <button onClick={() => removeExpense(expense._id)}>X</button>
                <button>Edit</button>
            </td>
        </tr>
    )
}