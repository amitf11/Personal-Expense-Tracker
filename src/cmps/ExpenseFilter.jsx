import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


export function ExpenseFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = (type === 'number') ? +value : value
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
            </form>
        </section>

    )
}