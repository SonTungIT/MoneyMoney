import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SoGiaoDich.scss';
import LayoutUser from '../LayoutUser';
import { IconSad } from '~/components/GlobalStyles/Layout/components/Icons';

const cx = classNames.bind(styles);

function SoGiaoDich() {
    return (
        <LayoutUser>
            <div className={cx('header')}>
                <div>THÁNG TRƯỚC</div>
                <div>THÁNG NÀY</div>
                <div>TƯƠNG LAI</div>
            </div>
            <div className={cx('container')}>
                <IconSad />
                <span>Không có giao dịch</span>
            </div>
        </LayoutUser>
    );
}

export default SoGiaoDich;
