import { useState } from "react";
import { expenseService } from "../services/expense.service";

import CloseIcon from '@mui/icons-material/Close'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export function AddExpenseForm({ onAddExpense }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [expenseToAdd, setExpenseToAdd] = useState(expenseService.getEmptyExpense())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setExpenseToAdd(prevExpense => ({ ...prevExpense, [field]: value }))
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: "" }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        const errors = {}
        if (!expenseToAdd.description) {
            errors.description = "Description is required"
        }

        if (!expenseToAdd.category) {
            errors.category = "Please choose category"
        }

        if (!expenseToAdd.amount) {
            errors.amount = "Amount is required"
        }

        if (expenseToAdd.amount < 1) {
            errors.amount = "Please enter a valid number"
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        onAddExpense(expenseToAdd)
        setExpenseToAdd(expenseService.getEmptyExpense())
    }

    return (
        <>
            <Button 
                sx={{marginTop: '30px'}}
                onClick={() => setIsFormOpen(!isFormOpen)}>Add Expense</Button>
            {isFormOpen &&
                <section className="add-expense-form flex column align-center">
                    <h3>Add Expense</h3>
                    <form onSubmit={handleSubmit} className="flex space-between">
                        <CloseIcon onClick={() => setIsFormOpen(false)} className="close-form-icon" />
                        <TextField
                            className="material-ui-input"
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            required
                            type="text"
                            name="description"
                            value={expenseToAdd.description}
                            onChange={handleChange}
                            error={!!validationErrors.description}
                            helperText={validationErrors.description} />

                        <TextField
                            className="material-ui-input"
                            id="outlined-basic"
                            label="Amount"
                            variant="outlined"
                            required
                            type="number"
                            name="amount"
                            value={!expenseToAdd.amount ? '' : expenseToAdd.amount}
                            onChange={handleChange}
                            error={!!validationErrors.amount}
                            helperText={validationErrors.amount} />

                        <FormControl className="material-ui-input" sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                required
                                value={expenseToAdd.category}
                                label="Category"
                                name="category"
                                onChange={handleChange}
                                error={!!validationErrors.category}
                            // helperText={validationErrors.category}
                            >
                                <MenuItem value={'general'}>General</MenuItem>
                                <MenuItem value={'personal'}>Personal</MenuItem>
                                <MenuItem value={'food'}>Food</MenuItem>
                                <MenuItem value={'housing'}>Housing</MenuItem>
                                <MenuItem value={'transportation'}>Transportation</MenuItem>
                                <MenuItem value={'utilities'}>Utilities</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleSubmit}>Add +</Button>
                    </form>
                </section>
                }
        </>
    )
}