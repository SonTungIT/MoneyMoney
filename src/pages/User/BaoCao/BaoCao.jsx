import React from 'react';
import classNames from 'classnames/bind';
import LayoutUser from '../LayoutUser';
import styles from './BaoCao.scss';
import RevenuePieChart from './RevenuePieChart/RevenuePieChart';

const cx = classNames.bind(styles);

function BaoCao() {
    return (
        <LayoutUser>
            <div className={cx('wrapper')}>
                <div className={cx('openingBalance')}>
                    <div className={cx('title')}>Số dư đầu</div>
                    <p className={cx('totalO')}>1.000.000</p>
                </div>
                <div className={cx('endingBalance')}>
                    <div className={cx('title')}>Số dư cuối</div>
                    <p className={cx('totalE')}>2.000.000</p>
                </div>
            </div>
        </LayoutUser>
    );
}

export default BaoCao;
