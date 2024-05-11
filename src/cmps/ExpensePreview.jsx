export function ExpensePreview({ expense }) {
    return (
        <section>
            {expense.description}
            {expense.amount}
            {expense.category}

        </section>
    )
}