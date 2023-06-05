import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutUser.module.scss';
import LayoutDetails from '../LayoutDetails';

const cx = classNames.bind(styles);

function LayoutUser({ children }) {
    return (
        <div className={cx('content')}>
            <div className={cx('inner')}>{children}</div>
        </div>
    );
}

export default LayoutUser;
