import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDetails.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconClose } from '~/components/GlobalStyles/Layout/components/Icons';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);

function LayoutDetails({ closeLayoutDetails, transactionData, onDeleteTransaction }) {
    const { id, incomeCategoryName, assetName, date, description, amount } = transactionData;

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
                    Chi tiết về giao dịch
                </Button>
                <div>
                    <Button textbox onClick={handleDeleteTransaction}>
                        Xóa
                    </Button>
                    <Button update>Sửa</Button>
                </div>
            </div>
            <div className={cx('body')}>
                <Avatar className={cx('avtBody')} />
                <div className={cx('avtDetail')}>
                    <div className={cx('textDetail')}>
                        <span>{incomeCategoryName}</span>
                        <p>{assetName}</p>
                        <p>{date.split('T')[0]}</p>
                    </div>
                    <span>{description}</span>
                    <div className={cx('sumDetail')}>{amount}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutDetails;
