import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDetails.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconClose } from '~/components/GlobalStyles/Layout/components/Icons';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);

function LayoutDetails({ closeLayoutDetails, transactionData, onDeleteTransaction, onUpdateTransaction }) {
    const { id, incomeCategoryName, expenseCategoryName, assetName, date, description, amount } = transactionData;
    const checkInformation = transactionData.incomeCategoryName === incomeCategoryName;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTransactionData, setEditedTransactionData] = useState({ ...transactionData });

    useEffect(() => {
        setEditedTransactionData({ ...transactionData });
    }, [transactionData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedTransactionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        myHeaders.append('Content-Type', 'application/json');

        const payload = {
            incomeCategoryName: editedTransactionData.incomeCategoryName,
            date: editedTransactionData.date,
            amount: editedTransactionData.amount,
            description: editedTransactionData.description,
            assetName: editedTransactionData.assetName,
        };

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(payload),
            redirect: 'follow',
        };

        fetch(`https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setIsEditing(false); // Exit editing mode
                onUpdateTransaction(); // Call the callback function to update the data
            })
            .catch((error) => console.log('error', error));
    };

    const handleCancelChanges = () => {
        setIsEditing(false);
    };

    const handleDeleteTransaction = () => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                onDeleteTransaction(id);
            })
            .catch((error) => console.log('error', error));

        fetch(`https://money-money.azurewebsites.net/api/v1/money-money/users/expenses/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                onDeleteTransaction(id);
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <div className={cx('details')}>
            <div className={cx('header')}>
                <Button
                    leftIcon={<IconClose />}
                    small
                    onClick={() => {
                        closeLayoutDetails(false);
                    }}
                >
                    {isEditing ? 'Chỉnh sửa chi tiết giao dịch' : 'Chi tiết về giao dịch'}
                </Button>
                <div>
                    <Button textbox onClick={handleDeleteTransaction}>
                        Xóa
                    </Button>
                    {checkInformation && !isEditing && (
                        <Button update onClick={handleEditClick}>
                            Sửa
                        </Button>
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <Avatar className={cx('avtBody')} />
                <div className={cx('avtDetail')}>
                    <div className={cx('textDetail')}>
                        <span>{incomeCategoryName || expenseCategoryName}</span>
                        <p>{assetName}</p>
                        <p>{date.split('T')[0]}</p>
                    </div>
                    <span>{description}</span>
                    <div
                        className={cx('sumDetail', {
                            income: transactionData.incomeCategoryName,
                            expense: transactionData.expenseCategoryName,
                        })}
                    >
                        {amount}
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className={cx('body-edit')}>
                    <div className={cx('editField')}>
                        <label htmlFor="assetName">Nhóm:</label>
                        <input
                            type="text"
                            id="assetName"
                            name="assetName"
                            value={editedTransactionData.incomeCategoryName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="assetName">Ví:</label>
                        <input
                            type="text"
                            id="assetName"
                            name="assetName"
                            value={editedTransactionData.assetName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="date">Ngày:</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={editedTransactionData.date.split('T')[0] || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="description">Mô tả:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={editedTransactionData.description || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="amount">Số tiền:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={editedTransactionData.amount || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editButtons')}>
                        <Button rounded onClick={handleSaveChanges}>
                            Lưu
                        </Button>
                        <Button text onClick={handleCancelChanges}>
                            Hủy bỏ
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LayoutDetails;
