import React, { useEffect, useState } from 'react';
import styles from './ModalConfirm.scss';
import classNames from 'classnames/bind';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconBack } from '~/components/GlobalStyles/Layout/components/Icons';

const cx = classNames.bind(styles);

const CountdownTimer = ({ initialTime, onTimerComplete, styles }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            onTimerComplete();
        }
    }, [timeLeft, onTimerComplete]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return <span style={styles}>{formatTime(timeLeft)}</span>;
};

function ModalConfirm({ closeModal, totalPrice }) {
    const handleTimerComplete = () => {
        // Implement your logic when the timer completes (e.g., close modal)
        closeModal();
    };
    const handleGoBack = () => {
        closeModal();
    };

    const countdownStyles = {
        color: 'red', // Custom style for the countdown timer
    };

    return (
        <div className={cx('detailBackground')}>
            <div className={cx('header')}>Xác Nhận Thanh Toán</div>
            <div className={cx('body')}>
                <div className="QRCard">
                    <p>Quét mã này để thanh toán</p>
                    <img src={require('~/assets/images/gói 1 tháng.jpg')} alt="Gói 1 tháng" className={cx('imgMomo')} />
                    <span>
                        Sử dụng App MoMo hoặc <br /> ứng dụng Camera hỗ trợ QR code để quét mã{' '}
                    </span>
                </div>
                <div className={cx('infoCard')}>
                    <p className={cx('timer')}>
                        Đơn hàng hết hạn sau:{' '}
                        <CountdownTimer
                            styles={countdownStyles}
                            initialTime={120}
                            onTimerComplete={handleTimerComplete}
                        />
                    </p>
                    <p className={cx('price')}>Số tiền: {totalPrice} vnd</p>
                    <Button leftIcon={<IconBack />} onClick={handleGoBack}>
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;
