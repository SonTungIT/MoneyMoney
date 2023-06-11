import React, { useState, useEffect } from 'react';
import { Tabs, Avatar, Button } from 'antd';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';
import config from '~/config';
import LayoutUser from '../LayoutUser';
import LayoutDetails from '../LayoutDetails';
import styles from './SoGiaoDich.scss';

function SoGiaoDich() {
    const [isLayoutDetailsOpen, setIsLayoutDetailsOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState({});
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const headers = { Authorization: `Bearer ${accessToken}` };
                const incomesResponse = await fetch(
                    'https://money-money.azurewebsites.net/api/v1/money-money/users/incomes',
                    { headers },
                );
                const expensesResponse = await fetch(
                    'https://money-money.azurewebsites.net/api/v1/money-money/users/expenses',
                    { headers },
                );

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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleToggleLayoutDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setIsLayoutDetailsOpen(!isLayoutDetailsOpen);
    };

    const handleDeleteTransaction = (deletedTransactionId) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== deletedTransactionId);
        setTransactions(updatedTransactions);
        setIsLayoutDetailsOpen(false);
    };

    //Total của tháng này
    const totalIncome = transactions
        .filter((transaction) => transaction.incomeCategoryName)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.expenseCategoryName)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    //Total của tháng trước
    const totalIncomeLastMonth = transactions
        .filter((transaction) => new Date(transaction.date).getMonth() === 4 && transaction.incomeCategoryName)
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpensesLastMonth = transactions
        .filter((transaction) => new Date(transaction.date).getMonth() === 4 && transaction.expenseCategoryName)
        .reduce((total, transaction) => total + transaction.amount, 0);

    const overallTotalLastMonth = totalIncomeLastMonth - totalExpensesLastMonth;
    const signLastMonth = overallTotalLastMonth >= 0 ? '+' : '-';
    const formattedOverallTotalLastMonth = `${signLastMonth}${Math.abs(overallTotalLastMonth).toLocaleString()}`;

    const overallTotal = totalIncome - totalExpenses;
    const sign = overallTotal >= 0 ? '+' : '-';
    const formattedOverallTotal = `${sign}${Math.abs(overallTotal).toLocaleString()}`;

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

    return (
        <LayoutUser>
            <Tabs defaultActiveKey="1" onChange={() => {}} className="header">
                <Tabs.TabPane tab="THÁNG TRƯỚC" key="2">
                    {Object.entries(categoryTotals[4] || {}).length === 0 ? (
                        <div className="no-transaction">
                            <IconSad />
                            Không có giao dịch
                        </div>
                    ) : (
                        <div className="container">
                            <div className="bodyTop">
                                <div className="bodyDetail">
                                    <span>Tiền vào</span>
                                    <p className="tienVao">{totalIncomeLastMonth.toLocaleString()}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền ra</span>
                                    <p className="tienRa">-{totalExpensesLastMonth.toLocaleString()}</p>
                                </div>
                                <div className="bodyDetail">
                                    <span></span>
                                    <p className="lineTop">{formattedOverallTotalLastMonth}</p>
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
                                    <span>Tiền vào</span>
                                    <p className="tienVao">
                                        {transactions
                                            .filter(
                                                (transaction) =>
                                                    transaction.incomeCategoryName &&
                                                    new Date(transaction.date).getMonth() === new Date().getMonth() &&
                                                    new Date(transaction.date).getFullYear() ===
                                                        new Date().getFullYear(),
                                            )
                                            .reduce((sum, transaction) => sum + transaction.amount, 0)
                                            .toLocaleString()}
                                    </p>
                                </div>
                                <div className="bodyDetail">
                                    <span>Tiền ra</span>
                                    <p className="tienRa">
                                        {transactions
                                            .filter(
                                                (transaction) =>
                                                    transaction.expenseCategoryName &&
                                                    new Date(transaction.date).getMonth() === new Date().getMonth() &&
                                                    new Date(transaction.date).getFullYear() ===
                                                        new Date().getFullYear(),
                                            )
                                            .reduce((sum, transaction) => sum + transaction.amount, 0)
                                            .toLocaleString()}
                                    </p>
                                </div>
                                <div className="bodyDetail">
                                    <span></span>
                                    <p className="lineTop">{formattedOverallTotal}</p>
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
