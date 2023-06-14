import React, { useState, useEffect } from 'react';
import { Tabs, Avatar, Button } from 'antd';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';
import LayoutUser from '../LayoutUser';
import LayoutDetails from '../LayoutDetails';
import styles from './SoGiaoDich.scss';
import { DatePicker } from 'antd';
import moment from 'moment';

function SoGiaoDich() {
    const [isLayoutDetailsOpen, setIsLayoutDetailsOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState({});
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [totalIncomeM, setTotalIncome] = useState(0);
    const [totalExpenseM, setTotalExpense] = useState(0);
    const [totalProfitM, setTotalProfit] = useState(0);

    const [openingBalance, setOpeningBalance] = useState(0);
    const [endingBalance, setEndingBalance] = useState(0);

    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState(moment().subtract(1, 'month'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const headers = { Authorization: `Bearer ${accessToken}` };

                const [incomesResponse, expensesResponse] = await Promise.all([
                    fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/incomes', { headers }),
                    fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/expenses', { headers }),
                ]);

                if (!incomesResponse.ok || !expensesResponse.ok) {
                    throw new Error('Error fetching data');
                }

                const incomes = await incomesResponse.json();
                const expenses = await expensesResponse.json();

                const allTransactions = [...incomes, ...expenses];
                setTransactions(allTransactions);

                const newCategories = allTransactions.reduce((acc, transaction) => {
                    if (transaction.incomeCategoryName && !acc.includes(transaction.incomeCategoryName)) {
                        acc.push(transaction.incomeCategoryName);
                    }
                    if (transaction.expenseCategoryName && !acc.includes(transaction.expenseCategoryName)) {
                        acc.push(transaction.expenseCategoryName);
                    }
                    return acc;
                }, []);
                setCategories(newCategories);

                const amounts = allTransactions.reduce((acc, transaction) => {
                    const category = transaction.incomeCategoryName || transaction.expenseCategoryName;
                    acc[category] = (acc[category] || 0) + transaction.amount;
                    return acc;
                }, {});
                setCategoryAmounts(amounts);

                fetch(
                    `https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/total-incomes-by-month/${selectedMonth.month()}/${selectedMonth.year()}`,
                    requestOptions,
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setTotalIncome(result.toLocaleString());
                    })
                    .catch((error) => console.log('error', error));

                // Fetching total expense
                fetch(
                    `https://money-money.azurewebsites.net/api/v1/money-money/users/expenses/total-expenses-by-month/${selectedMonth.month()}/${selectedMonth.year()}`,
                    requestOptions,
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setTotalExpense(result.toLocaleString());
                    })
                    .catch((error) => console.log('error', error));

                // Fetching total profit
                fetch(
                    `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/total-profits-by-month/${selectedMonth.month()}/${selectedMonth.year()}`,
                    requestOptions,
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setTotalProfit(result.toLocaleString());
                    })
                    .catch((error) => console.log('error', error));

                // Fetching opening balance
                fetch(
                    `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/starting-balance/${selectedMonth.month()}/${selectedMonth.year()}`,
                    requestOptions,
                )
                    .then((response) => response.text())
                    .then((result) => {
                        setOpeningBalance(result);
                    })
                    .catch((error) => console.log('error', error));

                // Fetching ending balance
                fetch(
                    `https://money-money.azurewebsites.net/api/v1/money-money/users/profits/ending-balance/${selectedMonth.month()}/${selectedMonth.year()}`,
                    requestOptions,
                )
                    .then((response) => response.text())
                    .then((result) => {
                        setEndingBalance(result);
                    })
                    .catch((error) => console.log('error', error));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const token = localStorage.getItem('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        fetchData();
    }, [selectedMonth]);

    const handleToggleLayoutDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setIsLayoutDetailsOpen(!isLayoutDetailsOpen);
    };

    const handleDeleteTransaction = (deletedTransactionId) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== deletedTransactionId);
        setTransactions(updatedTransactions);
        setIsLayoutDetailsOpen(false);
    };

    //Total của tháng trước

    let categoryTotals = {};
    // Trước khi render các giao dịch
    transactions.forEach((transaction) => {
        const month = new Date(transaction.date).getMonth();
        const categoryName = transaction.incomeCategoryName || transaction.expenseCategoryName;
        const amount = transaction.amount;

        if (!categoryTotals[month]) {
            categoryTotals[month] = {};
        }

        if (categoryTotals[month][categoryName]) {
            categoryTotals[month][categoryName] += amount;
        } else {
            categoryTotals[month][categoryName] = amount;
        }
    });

    const handleTabChange = (key) => {
        if (key === '2') {
            setIsLayoutDetailsOpen(false);
            setSelectedMonth(moment().subtract(1, 'month'));
        }
    };

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };

    return (
        <LayoutUser>
            <Tabs defaultActiveKey="1" onChange={handleTabChange} className="header">
                <Tabs.TabPane tab="THÁNG TRƯỚC" key="2">
                    <DatePicker
                        value={selectedMonth}
                        onChange={(date) => setSelectedMonth(date)}
                        picker="month"
                        className="month-picker"
                    />
                    {Object.entries(categoryTotals[4] || {}).length === 0 ? (
                        <div className="no-transaction">
                            <IconSad />
                            Không có giao dịch
                        </div>
                    ) : (
                        <div className="container">
                            <div className="bodyTop">
                                <div className="bodyDetail">
                                    <span>Số dư cuối</span>
                                    <p className="totalO">{endingBalance}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền vào</span>
                                    <p className="tienVao">{totalIncomeM}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền ra</span>
                                    <p className="tienRa">-{totalExpenseM}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span></span>
                                    <p className="lineTop">{totalProfitM}</p>
                                </div>
                                <Button className="btnBaocao" small to={config.routes.BaoCao}>
                                    XEM BÁO CÁO GIAI ĐOẠN NÀY
                                </Button>
                                <div className="bodyBot">
                                    {Object.entries(
                                        transactions
                                            .filter(
                                                (transaction) =>
                                                    new Date(transaction.date).getMonth() < new Date().getMonth() &&
                                                    (transaction.incomeCategoryName || transaction.expenseCategoryName),
                                            )
                                            .reduce((groupedTransactions, transaction) => {
                                                const category =
                                                    transaction.incomeCategoryName || transaction.expenseCategoryName;
                                                if (!groupedTransactions[category]) {
                                                    groupedTransactions[category] = [];
                                                }
                                                groupedTransactions[category].push(transaction);
                                                return groupedTransactions;
                                            }, {}),
                                    ).map(([category, categoryTransactions]) => {
                                        const totalCategoryAmount = categoryTransactions.reduce(
                                            (total, transaction) => {
                                                return total + transaction.amount;
                                            },
                                            0,
                                        );

                                        return (
                                            <div key={category} className="bodyDetail">
                                                <div className="titleBody">
                                                    <div className="miniTitle">
                                                        <Avatar />
                                                        <div className="dichVu">
                                                            <span className="incomeCategoryName">{category}</span>
                                                            <p>{categoryTransactions.length} Transactions</p>
                                                        </div>
                                                    </div>
                                                    <div className="totalAmount">
                                                        {totalCategoryAmount.toLocaleString()}
                                                    </div>
                                                </div>
                                                {categoryTransactions.map((transaction, index) => (
                                                    <button
                                                        key={index}
                                                        className="detailChild"
                                                        onClick={() => handleToggleLayoutDetails(transaction)}
                                                    >
                                                        <div className="miniTitle">
                                                            <span className="date">
                                                                {transaction.date?.slice(8, 10)}
                                                            </span>
                                                            <div className="dichVu">
                                                                <p className="dateMonthYear">
                                                                    {transaction.date?.split('T')[0]}
                                                                </p>
                                                                <p className="description">{transaction.description}</p>
                                                            </div>
                                                        </div>
                                                        <p
                                                            className={`amount ${
                                                                transaction.incomeCategoryName ? 'income' : 'expense'
                                                            }`}
                                                        >
                                                            {transaction.amount.toLocaleString()}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="THÁNG NÀY" key="1">
                    {Object.entries(categoryTotals[5] || {}).length === 0 ? (
                        <div className="no-transaction">
                            <IconSad />
                            Không có giao dịch
                        </div>
                    ) : (
                        <div className="container">
                            <div className="bodyTop">
                                <div className="bodyDetail">
                                    <span>Số dư đầu</span>
                                    <p className="totalO">{openingBalance}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền vào</span>
                                    <p className="tienVao">{totalIncomeM}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền ra</span>
                                    <p className="tienRa">{totalExpenseM}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span></span>
                                    <p className="lineTop">{totalProfitM}</p>
                                </div>
                                <Button className="btnBaocao" small to={config.routes.BaoCao}>
                                    XEM BÁO CÁO GIAI ĐOẠN NÀY
                                </Button>
                                <div className="bodyBot">
                                    {categories.map((category) => {
                                        const categoryTransactions = transactions.filter(
                                            (transaction) =>
                                                (transaction.incomeCategoryName === category ||
                                                    transaction.expenseCategoryName === category) &&
                                                new Date(transaction.date).getMonth() === new Date().getMonth(),
                                        );

                                        return (
                                            <div key={category} className="bodyDetail">
                                                <div className="titleBody">
                                                    <div className="miniTitle">
                                                        <Avatar />
                                                        <div className="dichVu">
                                                            <span className="incomeCategoryName">{category}</span>
                                                            <p>{categoryTransactions.length} Transactions</p>
                                                        </div>
                                                    </div>
                                                    <div className="totalAmount">
                                                        {categoryTransactions
                                                            .reduce((sum, transaction) => sum + transaction.amount, 0)
                                                            .toLocaleString()}
                                                    </div>
                                                </div>
                                                {categoryTransactions.map((transaction, index) => (
                                                    <button
                                                        key={index}
                                                        className="detailChild"
                                                        onClick={() => handleToggleLayoutDetails(transaction)}
                                                    >
                                                        <div className="miniTitle">
                                                            <span className="date">
                                                                {transaction.date?.slice(8, 10)}
                                                            </span>
                                                            <div className="dichVu">
                                                                <p className="dateMonthYear">
                                                                    {transaction.date?.split('T')[0]}
                                                                </p>
                                                                <p className="description">{transaction.description}</p>
                                                            </div>
                                                        </div>
                                                        <p
                                                            className={`amount ${
                                                                transaction.incomeCategoryName ? 'income' : 'expense'
                                                            }`}
                                                        >
                                                            {transaction.amount.toLocaleString()}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="TƯƠNG LAI" key="3">
                    {transactions.length === 0 ? (
                        <div className="no-transaction">
                            <IconSad />
                            Không có giao dịch
                        </div>
                    ) : (
                        <div className="container">
                            <div className="bodyTop">{/* Render transaction details */}</div>
                        </div>
                    )}
                </Tabs.TabPane>
            </Tabs>
            {isLayoutDetailsOpen && (
                <LayoutDetails
                    closeLayoutDetails={setIsLayoutDetailsOpen}
                    transactionData={selectedTransaction}
                    handleDeleteTransaction={handleDeleteTransaction}
                />
            )}
        </LayoutUser>
    );
}

export default SoGiaoDich;
