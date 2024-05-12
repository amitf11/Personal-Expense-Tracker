export function ExpenseSort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="flex column expense-sort">
        <h3>Sort</h3>

        <div>
            <button onClick={() => handleSortChange('amount')}>By amount</button>
            <button onClick={() => handleSortChange('createdAt')}>By date</button>
            <button onClick={handleToggleDirection}>{sortBy.asc ? '^' : 'v'}</button>
        </div>
    </section>
}