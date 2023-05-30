import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconLanguage, LogoMoney2 } from '~/components/GlobalStyles/Layout/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Button className={cx('logo')}>
                    <LogoMoney2 />
                </Button>
                <div className={cx('content')}>
                    <div>Về Chúng tôi</div>
                    <div>Tuyển Dụng</div>
                    <div className={cx('icon-language')}>
                        <IconLanguage />
                        <span>English</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
