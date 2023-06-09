import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';
import styles from '~/pages/User/SoGiaoDich/SoGiaoDich.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Avatar, Card, Space } from 'antd';
import config from '~/config';
import LayoutDetails from '../../LayoutDetails';

function TabContent({ icon, content }) {
    const [isLayoutDetailsOpen, setIsLayoutDetailsOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState({});

    const handleToggleLayoutDetails = () => {
        setIsLayoutDetailsOpen(!isLayoutDetailsOpen);
    };

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    useEffect(() => {
        fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/incomes', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data);
                console.log(data);
                const newCategories = data.map((transaction) => transaction.incomeCategoryName);
                setCategories((prevCategories) => {
                    const uniqueCategories = Array.from(new Set([...prevCategories, ...newCategories]));
                    return uniqueCategories;
                });
                //Đây là đoạn tính TotalMount và TotalIncome
                const amounts = {};
                data.forEach((transaction) => {
                    if (amounts[transaction.incomeCategoryName]) {
                        amounts[transaction.incomeCategoryName] += transaction.amount;
                    } else {
                        amounts[transaction.incomeCategoryName] = transaction.amount;
                    }
                });
                setCategoryAmounts(amounts);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const totalIncome = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <div className="container">
            {/* {icon && icon}
            <span>{content}</span> */}

            <div className="bodyTop">
                <div className="bodyDetail">
                    <span>Tiền vào</span>
                    <p className="tienVao">{totalIncome}</p>
                </div>
                <div className="bodyDetail">
                    <span>Tiền ra</span>
                    <p className="tienRa">-123</p>
                </div>
                <div className="bodyDetail">
                    <span></span>
                    <p className="lineTop">-123</p>
                </div>
                <Button className="btnBaocao" small to={config.routes.BaoCao}>
                    XEM BÁO CÁO GIAI ĐOẠN NÀY
                </Button>
                <div className="bodyBot">
                    {categories.map((category) => {
                        const categoryTransactions = transactions.filter(
                            (transaction) => transaction.incomeCategoryName === category,
                        );
                        return (
                            <div key={category} className="bodyDetail">
                                {categoryTransactions.map((transaction, index) => (
                                    <React.Fragment key={index}>
                                        {index === 0 && (
                                            <div className="titleBody">
                                                <div className="miniTitle">
                                                    <Avatar />
                                                    <div className="dichVu">
                                                        <span className="incomeCategoryName">
                                                            {transaction.incomeCategoryName}
                                                        </span>
                                                        <p>{categoryTransactions.length} Transactions</p>
                                                    </div>
                                                </div>
                                                <div className="totalAmount">{categoryAmounts[category]}</div>
                                            </div>
                                        )}
                                        <div className="detailChild">
                                            <div className="miniTitle">
                                                <span className="date">{transaction.date.slice(8, 10)}</span>
                                                <div className="dichVu">
                                                    <span className="dateMonthYear">
                                                        {transaction.date.split('T')[0]}
                                                    </span>
                                                    <p className="description">{transaction.description}</p>
                                                </div>
                                            </div>
                                            <p className="amount">{transaction.amount}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
            {isLayoutDetailsOpen && <LayoutDetails closeLayoutDetails={setIsLayoutDetailsOpen} />}
        </div>
    );
}

export default TabContent;
