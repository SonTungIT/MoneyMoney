import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { IconDate, IconLogo, IconSearch, IconArrowRight, AddIcon } from '../Icons';
import Button from '../Button';
import ImportModal from './ImportModal/ImportModal';
import { googleLogout } from '@react-oauth/google';

const cx = classNames.bind(styles);

function Header() {
    const [openModal, setOpenModal] = useState(false);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const logOut = () => {
        googleLogout();
        console.log(googleLogout());
        localStorage.removeItem('accessToken'); // Xóa accessToken từ localStorage
        navigate('/');
    };

    useEffect(() => {
        fetchTotalByYear('incomes');
        fetchTotalByYear('expenses');
    }, []);

    const fetchTotalByYear = (category) => {
        const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            redirect: 'follow',
        };

        fetch(
            `https://money-money1.azurewebsites.net/api/v1/money-money/users/${category}/total-by-year?year=2023`,
            requestOptions,
        )
            .then((response) => response.text())
            .then((result) => {
                if (category === 'incomes') {
                    setIncomeTotal(result);
                } else if (category === 'expenses') {
                    setExpenseTotal(result);
                }
            })
            .catch((error) => console.log('Error:', error));
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <IconLogo />
                    <div className={cx('right-logo')}>
                        <Button large rightIcon={<IconArrowRight />}>
                            Tổng Cộng
                        </Button>
                        <p>{formatCurrency(incomeTotal - expenseTotal)}</p>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('icon-items')}>
                        <Button
                            primary
                            leftIcon={<AddIcon />}
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            THÊM MỚI
                        </Button>
                        <IconDate />
                        <IconSearch />
                    </div>
                    <div className={cx('btn-user-avatar')} onClick={() => setShowDropdown(!showDropdown)}>
                        <img
                            className={cx('user-avatar')}
                            src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg"
                            alt="avatar"
                        />
                        {showDropdown && (
                            <div className={cx('logout-dropdown')}>
                                <span className={cx('logout')} onClick={logOut}>
                                    Log out
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cx('name')}>
                        <span className={cx('user-name')}>{localStorage.getItem('userName')}</span>
                    </div>
                </div>
            </div>
            {openModal && <ImportModal closeModal={setOpenModal} />}
        </header>
    );
}

export default Header;
