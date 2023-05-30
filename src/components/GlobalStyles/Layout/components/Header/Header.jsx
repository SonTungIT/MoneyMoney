import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { IconDate, IconLogo, IconSearch, IconArrowRight, AddIcon } from '../Icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <IconLogo />
                    <div className={cx('right-logo')}>
                        <Button large rightIcon={<IconArrowRight />}>
                            Tổng Cộng
                        </Button>
                        <p>0</p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('icon-items')}>
                        <Button primary leftIcon={<AddIcon />}>
                            THÊM MỚI
                        </Button>
                        <IconDate />
                        <IconSearch />
                    </div>
                    <div>
                        <div className={cx('btn-user-avatar')} type="file">
                            <img
                                className={cx('user-avatar')}
                                src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg"
                                alt="avatar"
                            />

                            {/* {avatar &&
                                ((<input type="file" onChange={handlePreviewAvatar} />),
                                (<img className={cx('user-avatar')} src={avatar.preview} alt="" />))} */}
                        </div>
                    </div>
                    <div className={cx('name')}>
                        <span className={cx('user-name')}>{localStorage.getItem('userName')}</span>
                        <Link className={cx('logout')} to={config.routes.home}>
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
