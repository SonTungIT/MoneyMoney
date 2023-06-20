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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const [quantities, setQuantities] = useState({
        basic: 0,
        special: 0,
        vip: 0,
    });

    const [apiResponse, setApiResponse] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

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
        // Chuẩn bị dữ liệu gửi đi
        const token = localStorage.getItem('accessToken');
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', 'Bearer ' + token);

        const subscriptions = [];

        // Kiểm tra số lượng gói cơ bản và thêm vào mảng subscriptions
        if (quantities.basic > 0) {
            subscriptions.push({
                subscriptionId: 1,
                quantity: quantities.basic,
            });
        }

        // Kiểm tra số lượng gói đặc biệt và thêm vào mảng subscriptions
        if (quantities.special > 0) {
            subscriptions.push({
                subscriptionId: 2,
                quantity: quantities.special,
            });
        }

        // Kiểm tra số lượng gói VIP và thêm vào mảng subscriptions
        if (quantities.vip > 0) {
            subscriptions.push({
                subscriptionId: 3,
                quantity: quantities.vip,
            });
        }

        const requestBody = {
            subscriptions,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestBody),
            redirect: 'follow',
        };

        try {
            // Gọi API
            const response = await fetch(
                'https://money-money.azurewebsites.net/api/v1/money-money/users/premiums/api/orders',
                requestOptions,
            );
            if (response.ok) {
                const result = await response.json(); // Parse the response as JSON
                setApiResponse(result);
                setTotalPrice(result.totalPrice); // Set the totalPrice in state
                setPaymentQRCodeUrl('URL_HERE'); // Thay 'URL_HERE' bằng URL hình ảnh mã QR trả về từ API
                setIsModalOpen(true);
            } else {
                // Xử lý lỗi
                console.log('Error:', response.status);
            }
        } catch (error) {
            // Xử lý lỗi
            console.log('Error:', error);
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
                                        <span>25.000đ</span>
                                        <p>1 tháng</p>
                                        <div className={cx('quantity')}>
                                            <p>Số lượng</p>
                                            <input
                                                className={cx('quantity')}
                                                type="number"
                                                placeholder="0"
                                                value={quantities.basic} // For the 'basic' subscription option
                                                onChange={(e) =>
                                                    setQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        basic: parseInt(e.target.value),
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </button>
                                <button className={cx('chonGoi')} onClick={() => setSelectedSubscription('special')}>
                                    <div className={cx('title')}>Gói đặc biệt</div>
                                    <div className={cx('price')}>
                                        <span>125.000 đ</span>
                                        <p>6 tháng</p>
                                        <div className={cx('btn-sale')}>TẶNG 1 THÁNG</div>
                                        <div className={cx('quantity')}>
                                            <p>Số lượng</p>
                                            <input
                                                className={cx('quantity')}
                                                type="number"
                                                placeholder="0"
                                                value={quantities.special} // For the 'special' subscription option
                                                onChange={(e) =>
                                                    setQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        special: parseInt(e.target.value),
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </button>
                                <button className={cx('chonGoi')} onClick={() => setSelectedSubscription('vip')}>
                                    <div className={cx('title')}>Gói VIP</div>
                                    <div className={cx('price')}>
                                        <span>225.000 đ</span>
                                        <p>1 năm</p>
                                        <div className={cx('btn-sale')}>TẶNG 3 THÁNG</div>
                                        <div className={cx('quantity')}>
                                            <p>Số lượng</p>
                                            <input
                                                className={cx('quantity')}
                                                type="number"
                                                placeholder="0"
                                                value={quantities.vip} // For the 'vip' subscription option
                                                onChange={(e) =>
                                                    setQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        vip: parseInt(e.target.value),
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <>
                                <Button primary className={cx('btn-signup')} onClick={handleCallApi}>
                                    Đăng ký
                                </Button>
                                <Modal
                                    open={isModalOpen}
                                    onOpen={handleOk}
                                    onClose={handleCancel}
                                    footer={[
                                        <Button key="cancel" onClick={handleCancel}>
                                            Hủy
                                        </Button>,
                                        <Button key="confirm" primary onClick={handleConfirm} loading={isSubmitting}>
                                            Xác nhận
                                        </Button>,
                                    ]}
                                >
                                    <table className="table">
                                        <thead>
                                            <tr className="table-header">
                                                <th className="table-cell">Sản Phẩm</th>
                                                <th className="table-cell">Số Lượng</th>
                                                <th className="table-cell">Số Tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalPrice > 0 && (
                                                <tr className="table-row">
                                                    <td className="table-cell">Gói cơ bản</td>
                                                    <td className="table-cell">{quantities.basic}</td>
                                                    <td className="table-cell">{apiResponse.list[0].totalPrice}</td>
                                                </tr>
                                            )}
                                            {totalPrice > 0 && (
                                                <tr className="table-row">
                                                    <td className="table-cell">Gói đặc biệt</td>
                                                    <td className="table-cell">{quantities.special}</td>
                                                    <td className="table-cell">{apiResponse.list[1].totalPrice}</td>
                                                </tr>
                                            )}
                                            {totalPrice > 0 && (
                                                <tr className="table-row">
                                                    <td className="table-cell">Gói VIP</td>
                                                    <td className="table-cell">{quantities.vip}</td>
                                                    <td className="table-cell">{apiResponse.list[2].totalPrice}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <p className="totalPrice">Tổng số tiền: {totalPrice}</p>
                                </Modal>
                            </>
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
