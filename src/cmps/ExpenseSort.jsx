export function ExpenseSort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="Expense-sort">
        <h3>Sort Expenses:</h3>
        <button onClick={() => handleSortChange('amount')}>By amount</button>
        <button onClick={() => handleSortChange('createdAt')}>By date</button>
        <button onClick={handleToggleDirection}>{sortBy.asc ? '^' : 'v'}</button>
    </section>
}