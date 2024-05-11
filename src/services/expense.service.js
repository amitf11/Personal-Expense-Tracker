import { storageService } from "./async-storage.service"

export const expenseService = {
    query,
    getById,
    remove,
    save,
    getEmptyExpense,
    getByUserId,
}

const STORAGE_KEY = "expensesDB"
const BASE_URL = "expense"

async function query() {
    const expenses = await storageService.query(STORAGE_KEY)
    return expenses

    //Un-comment when connecting to back-end
    // return httpService.get(BASE_URL, params: { filterBy, sortBy })
}

async function getByUserId(userId) {
    //Implement after userService
}

async function getById(expenseId) {
    return storageService.get(STORAGE_KEY, expenseId)

    //Un-comment when connecting to back-end
    // return httpService.get(`${BASE_URL}/${expenseId}`)
}

async function save(expense) {
    var savedExpense
    if (expense._id) {
        savedExpense = await storageService.put(STORAGE_KEY, expense)

        //Need to implement back-end version
    } else {
        //Need to implement back-end version
        
        //Need to implement userService
        //Later, need to set owner by the backend
        // expense.owner = userService.getLoggedinUser()
        savedExpense = await storageService.post(STORAGE_KEY, expense)
    }

    return savedExpense
}

async function remove(expenseId) {
    await storageService.remove(STORAGE_KEY, expenseId)

    //Backend
    // return httpService.delete(`${BASE_URL}/${expenseId}`)
}

function getEmptyExpense() {
    return {
        description: '',
        category: '',
        amount: 0,
    }
}