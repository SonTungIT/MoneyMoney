import React, { useEffect, useState } from 'react';
import LayoutUser from '../LayoutUser';
import styles from './LichSu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function LichSu() {
    const currentDate = new Date();

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('vi-VN', options);

    const token = localStorage.getItem('accessToken');
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        redirect: 'follow',
    };

    const [premiumHistory, setPremiumHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://moneymoney.azurewebsites.net/api/v1/money-money/users/premiums/premium-history', requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch premium history');
                }
                return response.json();
            })
            .then((data) => {
                setPremiumHistory(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('vi-VN', options);
        return formattedDate;
    };

    const getPackageName = (packageType) => {
        switch (packageType) {
            case '1-month':
                return 'Gói cơ bản';
            case '6-months':
                return 'Gói đặc biệt';
            case '1-year':
                return 'Gói VIP';
            default:
                return packageType;
        }
    };

    return (
        <LayoutUser>
            <div className={cx('lichSu')}>
                <div className={cx('header')}>Lịch Sử Giao Dịch - {formattedDate}</div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
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
                                    <td className="table-cell">{getPackageName(item.packageType)}</td>
                                    <td className="table-cell">{formatDate(item.startDate)}</td>
                                    <td className="table-cell">{formatDate(item.endDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </LayoutUser>
    );
}

export default LichSu;
