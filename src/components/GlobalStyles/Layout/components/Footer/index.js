import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cx('wrapper')}>
            <p className={cx('content')}>Copyright @{currentYear} BA Warrior. All right reserved</p>
        </footer>
    );
}

export default Footer;
