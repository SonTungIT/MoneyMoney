import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDetails.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconClose } from '~/components/GlobalStyles/Layout/components/Icons';
import { Avatar } from 'antd';
import UpdateLayoutDetails from './EditDetails';

const cx = classNames.bind(styles);

function LayoutDetails({ closeLayoutDetails, transactionData, onDeleteTransaction }) {
    const { id, incomeCategoryName, expenseCategoryName, assetName, date, description, amount } = transactionData;
    const checkInformation = transactionData.incomeCategoryName === incomeCategoryName;
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [editedTransactionData, setEditedTransactionData] = useState({ ...transactionData });
    const [transactionDataNew, setTransactionData] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
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
            body: JSON.stringify(payload), // Thay thế payload bằng đối tượng chứa dữ liệu cần cập nhật
            redirect: 'follow',
        };

        fetch(`https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // Xử lý phản hồi thành công từ API (nếu cần)
            })
            .catch((error) => console.log('error', error));
    };

    const handleCancelChanges = () => {
        // TODO: Xử lý hủy bỏ các thay đổi
        console.log('Các thay đổi đã được hủy bỏ');
    };

    // Hàm xóa giao dịch
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
                // Gọi hàm xóa giao dịch từ props để cập nhật UI hoặc thực hiện các thao tác khác sau khi xóa
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
                    <h2 className={cx('editTitle')}>Chỉnh sửa chi tiết giao dịch</h2>
                    <div className={cx('editField')}>
                        <label htmlFor="assetName">Category Name:</label>
                        <input
                            type="text"
                            id="assetName"
                            name="assetName"
                            value={editedTransactionData.incomeCategoryName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="assetName">Asset Name:</label>
                        <input
                            type="text"
                            id="assetName"
                            name="assetName"
                            value={editedTransactionData.assetName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="date">Date:</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={editedTransactionData.date.split('T')[0] || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={editedTransactionData.description || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editField')}>
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={editedTransactionData.amount || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('editButtons')}>
                        <Button onClick={handleSaveChanges}>Lưu</Button>
                        <Button onClick={handleCancelChanges}>Hủy bỏ</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LayoutDetails;
