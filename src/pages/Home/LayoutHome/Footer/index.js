import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconFacebook, IconSP } from '~/components/GlobalStyles/Layout/components/Icons';

const cx = classNames.bind(styles);

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cx('wrapper')}>
            <p className={cx('content')}>Copyright @{currentYear} BA Warrior. All right reserved</p>

            <div className={cx('content-right')}>
                <p>Bog</p>
                <p>Quyền riêng tư</p>
                <IconFacebook />
                <Button leftIcon={<IconSP />} primary>
                    Hỗ trợ
                </Button>
            </div>
        </footer>
    );
}

export default Footer;
