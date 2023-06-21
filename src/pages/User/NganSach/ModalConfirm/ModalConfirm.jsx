import React, { useEffect, useState } from 'react';
import styles from './ModalConfirm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return <span>{formatTime(timeLeft)}</span>;
};

function ModalConfirm({ closeModal }) {
    return (
        <div className={cx('detailBackground')}>
            <div className={cx('header')}>Xác Nhận Thanh Toán</div>
            <div className={cx('body')}>
                <img src={require('~/assets/images/gói 1 tháng.jpg')} alt="Gói 1 tháng" className={cx('imgMomo')} />
                <p>Thời gian còn lại: CountdownTimer</p>
            </div>
        </div>
    );
}

export default ModalConfirm;
