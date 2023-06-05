import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LayoutUser.module.scss';
import LayoutDetails from '../LayoutDetails';

const cx = classNames.bind(styles);

function LayoutUser({ children }) {
    const [isLayoutDetailsOpen, setIsLayoutDetailsOpen] = useState(false);

    const handleToggleLayoutDetails = () => {
        setIsLayoutDetailsOpen(!isLayoutDetailsOpen);
    };

    return (
        <div className={cx('content')}>
            <div className={cx('inner')}>{children}</div>
            {isLayoutDetailsOpen && <LayoutDetails />}
            <button onClick={handleToggleLayoutDetails}>LayoutDetails</button>
        </div>
    );
}

export default LayoutUser;
