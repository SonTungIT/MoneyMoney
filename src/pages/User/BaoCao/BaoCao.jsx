import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import LayoutUser from '../LayoutUser';
import styles from './BaoCao.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cx = classNames.bind(styles);

function BaoCao() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [totalProfitM, setTotalProfit] = useState(0);
    const [openingBalance, setOpeningBalance] = useState(0);
    const [endingBalance, setEndingBalance] = useState(0);

    const [chartData, setChartData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchTotalByMonth('incomes', selectedDate);
        fetchTotalByMonth('expenses', selectedDate);
        fetchTotalProfit(selectedDate);
    }, [selectedDate]);

    const fetchTotalByMonth = (category, date) => {
        const token = localStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        fetch(
            `https://money-money.azurewebsites.net/api/v1/money-money/users/${category}/total-by-month?date=${year}%2F${month}%2F01`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((result) => {
                if (category === 'incomes') {
                    setIncomeTotal(result);
                } else if (category === 'expenses') {
                    setExpenseTotal(result);
                }
            })
            .catch((error) => console.log('Error:', error));
    };

    const fetchTotalProfit = (date) => {
        const token = localStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        Promise.all([
            fetch(
                `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/total-by-month?date=${year}%2F${month}%2F01`,
                requestOptions,
            ).then((response) => response.json()),
            fetch(
                `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/starting-balance/${month}/${year}`,
                requestOptions,
            ).then((response) => response.text()),
            fetch(
                `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/ending-balance/${month}/${year}`,
                requestOptions,
            ).then((response) => response.text()),
        ])
            .then(([totalProfit, startingBalance, endingBalance]) => {
                setTotalProfit(totalProfit);
                setOpeningBalance(startingBalance);
                setEndingBalance(endingBalance);
            })
            .catch((error) => console.log('error', error));
    };

    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat('vi-VN');
        return value >= 0 ? '+' + formatter.format(value) : formatter.format(value);
    };

    useEffect(() => {
        const data = [{ month: `Tháng ${selectedMonth}`, income: incomeTotal, expense: expenseTotal }];
        setChartData(data);
    }, [incomeTotal, expenseTotal]);

    const selectedMonth = selectedDate.getMonth() + 1;

    return (
        <LayoutUser>
            <div className={cx('calendar')}>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className={cx('datePicker')}
                />
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('openingBalance')}>
                    <div className={cx('title')}>Số dư đầu</div>
                    <p className={cx('totalO')}>{formatCurrency(openingBalance)}</p>
                </div>
                <div className={cx('endingBalance')}>
                    <div className={cx('title')}>Số dư cuối</div>
                    <p className={cx('totalE')}>{formatCurrency(endingBalance)}</p>
                </div>
                <div className={cx('netIncome')}>
                    <div className={cx('title')}>Lợi nhuận tháng {selectedMonth}</div>
                    <p className={cx('totalN')}>{formatCurrency(totalProfitM)}</p>
                    <div className={cx('columnChart')}>
                        <BarChart width={500} height={400} data={chartData}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
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
