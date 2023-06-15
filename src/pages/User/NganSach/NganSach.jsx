import React, { useEffect, useState } from 'react';
import LayoutUser from '../LayoutUser';
import styles from './NganSach.scss';
import classNames from 'classnames/bind';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Avatar } from 'antd';
import { Tabs } from 'antd';

const cx = classNames.bind(styles);

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: `Tab 1`,
        children: `Content of Tab Pane 1`,
    },
    {
        key: '2',
        label: `Tab 2`,
        children: `Content of Tab Pane 2`,
    },
    {
        key: '3',
        label: `Tab 3`,
        children: `Content of Tab Pane 3`,
    },
];

function NganSach() {
    return (
        <LayoutUser>
            <div className={cx('nganSach')}>
                <div className={cx('header')}>Budget Plus</div>
                <div className={cx('body')}>
                    <div className={cx('dangKy')}>
                        <div className={cx('sale')}>
                            <button className={cx('chonGoi')}>
                                <div className={cx('title')}>Gói đặc biệt</div>
                                <div className={cx('price')}>
                                    <span>359.000 đ</span>
                                    <p>12 tháng</p>
                                    <div className={cx('btn-sale')}>Giảm 50%</div>
                                </div>
                            </button>
                            <button className={cx('chonGoi')}>
                                <div className={cx('title')}>Gói cơ bản</div>
                                <div className={cx('price')}>
                                    <span>359.000đ</span>
                                    <p>12 tháng</p>
                                </div>
                            </button>
                        </div>
                        <Button primary className={cx('btn-signup')}>
                            Đăng ký
                        </Button>
                        <p>Hủy bất cứ lúc nào</p>
                    </div>
                    <div className={cx('description')}>
                        <div className={cx('descriptionTop')}>
                            <Avatar />
                            Tiết kiệm nhiều hơn & biến ước mơ <br /> tài chính của bạn thành hiện thực.
                        </div>
                        <div className={cx('descriptionBot')}>
                            <p>
                                Hơn 1 triệu người dùng Budget Plus đã cải thiện cuộc
                                <br /> sống của họ tích cực hơn với giá trị chỉ bằng 1 cốc cà phê
                                <br /> mỗi tháng. Hãy trở thành 1 trong số đó!
                            </p>
                        </div>
                    </div>
                    <div className={cx('tabpane')}>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
                    </div>
                </div>
            </div>
        </LayoutUser>
    );
}

export default NganSach;
