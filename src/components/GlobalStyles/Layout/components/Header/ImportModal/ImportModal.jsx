import React, { useState } from 'react';
import './ImportModal.scss';
import Button from '../../Button';
import { IconGroup, IconRight, IconWallet2 } from '../../Icons';
import ImportDetail from './ImportDetail/ImportDetail';
import { DatePicker, Space } from 'antd';

function ImportModal({ closeModal }) {
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');

    const onChange = (date, dateString) => {
        setSelectedDate(date);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Tạo payload dữ liệu
        const payload = {
            incomeCategoryName: selectedGroup ? selectedGroup : '',
            expenseCategoryName: selectedGroup ? selectedGroup : '',
            date: selectedDate ? selectedDate.toISOString() : '',
            amount: isNaN(amount) ? 0 : amount,
            description: description ? description : '',
            assetName: 'Tiền mặt trong túi',
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(payload),
            redirect: 'follow',
        };
        // API incomes
        fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/incomes', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                closeModal(false);
            })
            .catch((error) => console.log('error', error));

        // API expenses
        fetch('https://money-money.azurewebsites.net/api/v1/money-money/users/expenses', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then((result) => {
                console.log(result);
                closeModal(false);
            })
            .catch((error) => console.log('error', error));
    };

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);
        setOpenDetail(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Thêm giao dịch</h1>
                </div>
                <form className="form-input" onSubmit={handleFormSubmit}>
                    <div className="body">
                        <label className="label-input">
                            <div className="content-input">
                                <p>Ví</p>
                                <Button leftIcon={<IconWallet2 />}>
                                    <div className="detail-input">
                                        Tiền mặt trong túi
                                        <IconRight />
                                    </div>
                                </Button>
                            </div>
                            <div className="content-input">
                                <p>Nhóm</p>
                                <Button
                                    leftIcon={<IconGroup />}
                                    type="button"
                                    onClick={() => {
                                        setOpenDetail(true);
                                    }}
                                >
                                    <div className="detail-input">
                                        {selectedGroup ? selectedGroup : 'Chọn nhóm'}
                                        <IconRight />
                                    </div>
                                </Button>
                            </div>
                            <div className="content-input">
                                <p>Số tiền</p>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={amount}
                                    onChange={(event) => setAmount(parseFloat(event.target.value))}
                                />
                            </div>
                            <div className="content-input">
                                <p>Ngày</p>
                                <Space direction="vertical">
                                    <DatePicker value={selectedDate} onChange={onChange} />
                                </Space>
                            </div>
                            <div className="content-input note-input">
                                <p>Ghi chú</p>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className="ant-divider" role="separator"></div>
                    <div className="footer">
                        <Button onClick={() => closeModal(false)} text>
                            Hủy
                        </Button>
                        <Button type="submit" rounded>
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
            {openDetail && <ImportDetail closeDetail={setOpenDetail} setSelectedGroup={handleGroupSelection} />}
        </div>
    );
}

export default ImportModal;
