import React, { useEffect, useState } from 'react';
import LayoutUser from '../LayoutUser';
import styles from './NganSach.scss';
import classNames from 'classnames/bind';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { Avatar, Modal, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const key = 'updatable';

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

function NganSach() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState('');
    const [paymentQRCodeUrl, setPaymentQRCodeUrl] = useState('');
    const [isLoadingQRCode, setIsLoadingQRCode] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCallApi = async () => {
        const token = localStorage.getItem('accessToken');
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + token);

        let packageType = '';
        if (selectedSubscription === 'basic') {
            packageType = '1-month';
        } else if (selectedSubscription === 'special') {
            packageType = '6-months';
        } else if (selectedSubscription === 'vip') {
            packageType = '1-year';
        }

        var raw = JSON.stringify({
            packageType: packageType,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        setIsLoadingQRCode(true);

        try {
            const response = await fetch(
                'https://money-money.azurewebsites.net/api/v1/money-money/users/premiums/purchase',
                requestOptions,
            );
            const result = await response.json();

            if (response.ok) {
                const qrCodeUrl = result.paymentQRCodeUrl;
                setPaymentQRCodeUrl(qrCodeUrl);
                setIsModalOpen(true);
                if (result.message === 'already_premium') {
                    setTimeout(() => {
                        api.open({
                            key,
                            message: 'Đã tồn tại!',
                            description: 'Bạn đã đăng ký gói trước đó!',
                        });
                    }, 1000);
                }
            } else {
                console.log('API response status:', response.status);
            }
        } catch (error) {
            console.log('API error:', error);
            // Handle API error if needed
        } finally {
            setIsLoadingQRCode(false);
        }
    };

    const getSubscriptionImage = () => {
        if (selectedSubscription === 'basic') {
            return require('../../../assets/images/gói 1 tháng.jpg');
        } else if (selectedSubscription === 'special') {
            return require('../../../assets/images/gói 6 tháng.jpg');
        } else if (selectedSubscription === 'vip') {
            return require('../../../assets/images/gói 12 tháng.jpg');
        } else {
            return null;
        }
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        api.open({
            message: 'Thành Công',
            description: 'Bạn đã đăng ký thành công!',
            icon: (
                <SmileOutlined
                    style={{
                        position: 'absolute',
                        color: '#108ee9',
                    }}
                />
            ),
        });
        navigate('/sogiaodich');
    };

    return (
        <>
            {contextHolder}
            <LayoutUser>
                <div className={cx('nganSach')}>
                    <div className={cx('header')}>Gói Premium</div>
                    <div className={cx('body')}>
                        <div className={cx('dangKy')}>
                            <div className={cx('sale')}>
                                <button className={cx('chonGoi')} onClick={() => setSelectedSubscription('basic')}>
                                    <div className={cx('title')}>Gói cơ bản</div>
                                    <div className={cx('price')}>
                                        <span>24.999đ</span>
                                        <p>1 tháng</p>
                                    </div>
                                </button>
                                <button className={cx('chonGoi')} onClick={() => setSelectedSubscription('special')}>
                                    <div className={cx('title')}>Gói đặc biệt</div>
                                    <div className={cx('price')}>
                                        <span>125.000 đ</span>
                                        <p>6 tháng</p>
                                        <div className={cx('btn-sale')}>TẶNG 1 THÁNG</div>
                                    </div>
                                </button>
                                <button className={cx('chonGoi')} onClick={() => setSelectedSubscription('vip')}>
                                    <div className={cx('title')}>Gói VIP</div>
                                    <div className={cx('price')}>
                                        <span>225.000 đ</span>
                                        <p>1 năm</p>
                                        <div className={cx('btn-sale')}>TẶNG 3 THÁNG</div>
                                    </div>
                                </button>
                            </div>
                            <>
                                <Button primary className={cx('btn-signup')} onClick={handleCallApi}>
                                    Đăng ký
                                </Button>
                                <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                    {isLoadingQRCode ? (
                                        <p>Loading QR Code...</p>
                                    ) : paymentQRCodeUrl ? (
                                        <>
                                            <img
                                                src={getSubscriptionImage()}
                                                className={cx('paymentQRCode')}
                                                alt="Payment QR Code"
                                            />
                                            <p>
                                                Thời gian còn lại: <CountdownTimer />
                                            </p>
                                            <p>Bấm 'Xác Nhận sau khi thanh toán!'</p>
                                            {paymentQRCodeUrl && (
                                                <Button primary className={cx('btn-signup')} onClick={handleConfirm}>
                                                    Xác Nhận
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <p>Bạn đã đăng ký!</p>
                                    )}
                                </Modal>
                            </>
                            <p>Hủy bất cứ lúc nào</p>
                        </div>
                        <div className={cx('description')}>
                            <div className={cx('descriptionTop')}>
                                <Avatar />
                                Tiết kiệm nhiều hơn & biến ước mơ <br /> tài chính của bạn thành hiện thực.
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </>
    );
}

export default NganSach;
