import { ExpensePreview } from "./ExpensePreview";

export function ExpenseList({ expenses, onRemoveExpense }) {

    if (!expenses || !expenses.length) return <div>No expenses to show</div>

    return (
        <section>
            {expenses.map(expense => (
                <article key={expense._id}>

                    <ExpensePreview
                        expense={expense}
                        onRemoveExpense={onRemoveExpense}
                    />
                </article>
            ))}
        </section>
    )
}