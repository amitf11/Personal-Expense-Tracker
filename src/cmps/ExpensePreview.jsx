export function ExpensePreview({ expense, onRemoveExpense }) {

    function removeExpense(expenseId) {
        onRemoveExpense(expenseId)
    }

    return (
        <section>
            {expense.description}
            {expense.amount}
            {expense.category}
            <button onClick={() => removeExpense(expense._id)}>X</button>
        </section>
    )
}