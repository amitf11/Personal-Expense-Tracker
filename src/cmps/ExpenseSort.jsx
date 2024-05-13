export function ExpenseSort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="flex align-center expense-sort">
        <h3>Sort By</h3>
        <div className="sort-btns">
            <button onClick={() => handleSortChange('amount')}>Amount</button>
            <button onClick={() => handleSortChange('createdAt')}>Date</button>
            <button onClick={handleToggleDirection}>{sortBy.asc ? '^' : 'v'}</button>
        </div>
    </section>
}