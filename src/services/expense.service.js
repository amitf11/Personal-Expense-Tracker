import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"

export const expenseService = {
    query,
    getById,
    remove,
    save,
    getEmptyExpense,
    getDefaultSortBy,
    getDefaultFilterBy,
    // getByUserId,
}

const STORAGE_KEY = "expensesDB"
const BASE_URL = "expense"

async function query(filterBy = { description: '' }, sortBy = { by: 'createdAt', asc: false }) {
    return httpService.get(BASE_URL, { params: { filterBy, sortBy } })
}

async function getById(expenseId) {
    // return storageService.get(STORAGE_KEY, expenseId)

    //Un-comment when connecting to back-end
    // return httpService.get(`${BASE_URL}/${expenseId}`)
}

async function save(expense) {
    if (expense._id) {
        return httpService.put(`${BASE_URL}/${expense._id}`, expense)
    } else {
        return httpService.post(BASE_URL, expense)
    }
}

async function remove(expenseId) {
    // await storageService.remove(STORAGE_KEY, expenseId)

    //Backend
    return httpService.delete(`${BASE_URL}/${expenseId}`)
}

function getEmptyExpense() {
    return {
        description: '',
        category: '',
        amount: 0,
    }
}

function getDefaultSortBy() {
    return {
        by: 'createdAt',
        asc: false
    }
}

function getDefaultFilterBy() {
    return {
        description: '',
        category: '',
        minAmount: 0,
        maxAmount: Infinity,
        startDate: 0,
        endDate: Infinity
    }
}