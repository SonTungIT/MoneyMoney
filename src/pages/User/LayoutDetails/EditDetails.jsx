import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './LayoutDetails.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconClose } from '~/components/GlobalStyles/Layout/components/Icons';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);

Modal.setAppElement('#root');

const UpdateLayoutDetails = ({ id, checkInformation, closeLayoutDetails, transactionData, onDeleteTransaction }) => {
    const [editedData, setEditedData] = useState({}); // State lưu trữ dữ liệu đã chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        setInitialData(transactionData);
        setEditedData({
            field1: transactionData.incomeCategoryName,
            field2: transactionData.date,
            field3: transactionData.amount.toString(),
        });
    }, [transactionData]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedData({
            field1: transactionData.incomeCategoryName,
            field2: transactionData.date,
            field3: transactionData.amount.toString(),
        });
        console.log(setEditedData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = () => {
        // Chuẩn bị dữ liệu để gửi đi
        const requestData = {
            field1: editedData.field1,
            field2: editedData.field2,
        };
        console.log(requestData);

        // Gửi yêu cầu PUT đến API
        fetch(`https://money-money.azurewebsites.net/api/v1/money-money/users/incomes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Dữ liệu đã được cập nhật:', result);
                setIsEditing(false);
            })
            .catch((error) => console.log('Lỗi khi gửi yêu cầu PUT:', error));
    };

    const handleCancelChanges = () => {
        // TODO: Xử lý hủy bỏ các thay đổi
        console.log('Các thay đổi đã được hủy bỏ');
    };
    const customModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
        },
    };

    return (
        <div className={cx('details')}>
            {/* ... */}
            <Button onClick={handleEditClick}>Sửa</Button>
            <Modal
                isOpen={isEditing}
                onRequestClose={handleCancelChanges}
                contentLabel="Chỉnh sửa chi tiết giao dịch"
                style={customModalStyles}
            >
                <h2>Chỉnh sửa chi tiết giao dịch</h2>
                <div>
                    <label htmlFor="field1">Trường 1:</label>
                    <input
                        type="text"
                        id="field1"
                        name="field1"
                        value={editedData.field1 || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="field2">Trường 2:</label>
                    <input
                        type="text"
                        id="field2"
                        name="field2"
                        value={editedData.field2 || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="field3">Trường 3:</label>
                    <input
                        type="text"
                        id="field3"
                        name="field3"
                        value={editedData.field3 || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button onClick={handleSaveChanges}>Lưu</button>
                    <button onClick={handleCancelChanges}>Hủy bỏ</button>
                </div>
            </Modal>
        </div>
    );
};

export default UpdateLayoutDetails;
