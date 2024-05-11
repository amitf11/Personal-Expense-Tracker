import { ExpensePreview } from "./ExpensePreview";

export function ExpenseList({ expenses, onRemoveExpense }) {

    if (!expenses || !expenses.length) return <div>No expenses to show</div>

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <ExpensePreview
                            expense={expense}
                            onRemoveExpense={onRemoveExpense}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}