import { useEffect, useState } from "react";
import { utilService } from "../services/util.service";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { expenseService } from "../services/expense.service";


export function ExpenseFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = (type === 'number') ? +value : value
        if (type === 'date') value = utilService.dateStringToTimestamp(value)
        console.log('filterByToEdit:', filterByToEdit)

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <section className="filter-container">
            <h3>Filter</h3>
            <form className="filter-form">
                <TextField
                    sx={{ width: 120 }}
                    id="outlined-basic"
                    label="Description"
                    variant="standard"
                    type="text"
                    name="description"
                    value={filterBy.description}
                    onChange={handleChange} />

                <TextField
                    sx={{ width: 120 }}
                    id="outlined-basic"
                    label="Min. Amount"
                    variant="standard"
                    type="number"
                    name="minAmount"
                    value={filterBy.minAmount || ''}
                    onChange={handleChange} />

                <TextField
                    sx={{ width: 120 }}
                    id="outlined-basic"
                    label="Max. Amount"
                    variant="standard"
                    type="number"
                    name="maxAmount"
                    value={filterBy.maxAmount === Infinity ? '' : filterBy.maxAmount}
                    onChange={handleChange} />

                <FormControl className="material-ui-input" sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        variant="standard"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        name="category"
                        value={filterBy.category}
                        onChange={handleChange}
                    >
                        <MenuItem value={''}>All</MenuItem>
                        <MenuItem value={'general'}>General</MenuItem>
                        <MenuItem value={'personal'}>Personal</MenuItem>
                        <MenuItem value={'food'}>Food</MenuItem>
                        <MenuItem value={'housing'}>Housing</MenuItem>
                        <MenuItem value={'transportation'}>Transportation</MenuItem>
                        <MenuItem value={'utilities'}>Utilities</MenuItem>
                    </Select>
                </FormControl>
                <section className="flex date-filter">
                    <div>
                        <span>From</span>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <span>To</span>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange} />
                    </div>
                    <button type="button" onClick={() => setFilterByToEdit(expenseService.getDefaultFilterBy())}>Clear Filter</button>
                </section>
            </form>
        </section>

    )
}