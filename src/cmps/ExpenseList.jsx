import { ExpensePreview } from "./ExpensePreview";

export function ExpenseList({ expenses, onRemoveExpense, onUpdateExpense }) {

    if (!expenses || !expenses.length) return <div>No expenses to show</div>

    return (
        <section className="expense-list">
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
                    {expenses.map((expense, index) => (
                        <ExpensePreview
                            key={index}
                            expense={expense}
                            onRemoveExpense={onRemoveExpense}
                            onUpdateExpense={onUpdateExpense}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}