import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutDetails.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconClose } from '~/components/GlobalStyles/Layout/components/Icons';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);

function LayoutDetails({ closeLayoutDetails, transactionData }) {
    const { incomeCategoryName, assetName, date, description, amount } = transactionData;

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
                    <Button textbox>Xóa</Button>
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
