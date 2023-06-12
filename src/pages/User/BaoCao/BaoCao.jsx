import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import LayoutUser from '../LayoutUser';
import styles from './BaoCao.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const cx = classNames.bind(styles);

function BaoCao() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [totalProfitM, setTotalProfit] = useState(0);
    const [openingBalance, setOpeningBalance] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [totalIncomeM, setTotalIncome] = useState(0);
    const [totalExpenseM, setTotalExpense] = useState(0);

    useEffect(() => {
        fetchTotalByYear('incomes');
        fetchTotalByYear('expenses');
        fetchTotalProfit();
    }, []);

    useEffect(() => {
        updateOpeningBalance();
    }, [incomeTotal, expenseTotal, totalProfitM]);

    const fetchTotalByYear = (category) => {
        const token = localStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        fetch(
            `https://money-money.azurewebsites.net/api/v1/money-money/users/${category}/total-by-year?year=2023`,
            requestOptions,
        )
            .then((response) => response.text())
            .then((result) => {
                if (category === 'incomes') {
                    setIncomeTotal(result);
                } else if (category === 'expenses') {
                    setExpenseTotal(result);
                }
            })
            .catch((error) => console.log('Error:', error));
    };

    const fetchTotalProfit = () => {
        const token = localStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        fetch(
            'https://money-money.azurewebsites.net/api/v1/money-money/users/profits/total-by-month?date=2023%2F06%2F11',
            requestOptions,
        )
            .then((response) => response.json())
            .then((result) => {
                setTotalProfit(result);
            })
            .catch((error) => console.log('error', error));

        fetch(
            'https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/total-by-month?date=2023%2F06%2F12',
            requestOptions,
        )
            .then((response) => response.json())
            .then((result) => {
                setTotalIncome(result.toLocaleString());
            })
            .catch((error) => console.log('error', error));

        fetch(
            'https://money-money.azurewebsites.net/api/v1/money-money/users/expenses/total-by-month?date=2023%2F06%2F12',
            requestOptions,
        )
            .then((response) => response.json())
            .then((result) => {
                setTotalExpense(result.toLocaleString());
            })
            .catch((error) => console.log('error', error));
    };

    const updateOpeningBalance = () => {
        setOpeningBalance(incomeTotal - expenseTotal - totalProfitM);
    };

    const formatCurrency = (value) => {
        const formattedValue = value.toLocaleString('vi-VN');
        return value >= 0 ? '+' + formattedValue : formattedValue;
    };

    // column chart
    useEffect(() => {
        const data = [{ day: '1-4', income: incomeTotal, expense: expenseTotal }];
        setChartData(data);
    }, [incomeTotal, expenseTotal]);

    return (
        <LayoutUser>
            <div className={cx('wrapper')}>
                <div className={cx('openingBalance')}>
                    <div className={cx('title')}>Số dư đầu</div>
                    <p className={cx('totalO')}>{formatCurrency(openingBalance)}</p>
                </div>
                <div className={cx('endingBalance')}>
                    <div className={cx('title')}>Số dư cuối</div>
                    <p className={cx('totalE')}>{formatCurrency(incomeTotal - expenseTotal)}</p>
                </div>
                <div className={cx('netIncome')}>
                    <div className={cx('title')}>Thu nhập ròng</div>
                    <p className={cx('totalN')}>{formatCurrency(totalProfitM)}</p>
                    <div className={cx('columnChart')}>
                        <BarChart width={500} height={300} data={chartData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="income" fill="#00b3ff" name="Tổng khoản thu" />
                            <Bar dataKey="expense" fill="#ff0044c6" name="Tổng khoản chi" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}

export default BaoCao;
