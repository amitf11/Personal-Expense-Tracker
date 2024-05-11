import { ExpensePreview } from "./ExpensePreview";

export function ExpenseList({ expenses }) {

    if (!expenses || !expenses.length) return <div>No expenses to show</div>

    return (
        <>
            <h1>Hello from ExpenseList</h1>
            {expenses.map(expense => (

                <ExpensePreview
                    expense={expense} />
            ))}
        </>
    )
}