import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { utilService } from '../services/util.service';

ChartJS.register(ArcElement, Tooltip, Legend);


export function Chart({ expenses }) {
    const categories = ['general', 'personal', 'food', 'housing', 'transportation', 'utilities']
    console.log(categories.map(category => countCatogoryTotalExpense(category)))
    const data = {
        labels: categories.map(category => utilService.capitalizeFirstLetter(category)),
        datasets: [
            {
                label: '# Total $ Expense',
                data: categories.map(category => countCatogoryTotalExpense(category)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    function countCatogoryTotalExpense(category) {
        const count = expenses?.reduce((acc, expense) => {
            if (expense.category === category) acc += expense.amount
            return acc
        }, 0)
        
        return count
    }

    return <Pie data={data} />;
}