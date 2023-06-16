import React, { useEffect, useState } from 'react';
import LayoutUser from '../LayoutUser';
import styles from './LichSu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LichSu() {
    const currentDate = new Date();

    const options = { weekday: 'long' };
    // Format the day of the week
    const dayOfWeek = currentDate.toLocaleDateString('vi-VN', options);

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const token = localStorage.getItem('accessToken');
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        redirect: 'follow',
    };

    const [premiumHistory, setPremiumHistory] = useState([]);

    useEffect(() => {
        fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/premiums/premium-history', requestOptions)
            .then((response) => response.json())
            .then((data) => setPremiumHistory(data))
            .catch((error) => console.log('error', error));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('vi-VN');
        return formattedDate;
    };

    return (
        <LayoutUser>
            <div className={cx('lichSu')}>
                <div className={cx('header')}>
                    Lịch Sử Giao Dịch - {dayOfWeek}, {day} tháng {month}, {year}
                </div>
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-cell">Tên gói</th>
                            <th className="table-cell">Ngày bắt đầu</th>
                            <th className="table-cell">Ngày kết thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {premiumHistory.map((item, index) => (
                            <tr className="table-row" key={index}>
                                <td className="table-cell">{item.packageType}</td>
                                <td className="table-cell">{formatDate(item.startDate)}</td>
                                <td className="table-cell">{formatDate(item.endDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutUser>
    );
}

export default LichSu;
