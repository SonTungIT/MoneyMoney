import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SoGiaoDich.scss';
import LayoutUser from '../LayoutUser';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';
import { Tabs } from 'antd';

const cx = classNames.bind(styles);

function SoGiaoDich() {
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
    return (
        <LayoutUser>
            {/* <div className={cx('header')}>
                <div>THÁNG TRƯỚC</div>
                <div>THÁNG NÀY</div>
                <div>TƯƠNG LAI</div>
            </div>
            <div className={cx('container')}>
                <IconSad />
                <span>Không có giao dịch</span>
            </div> */}

            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </LayoutUser>
    );
}

export default SoGiaoDich;
