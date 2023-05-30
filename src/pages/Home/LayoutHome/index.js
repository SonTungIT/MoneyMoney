import classNames from 'classnames/bind';
import styles from './LayoutHome.module.scss';
import Header from './Header/Header';
import Button from '~/components/GlobalStyles/Layout/components/Button';
import { IconAppStore, IconGGPlay } from '~/components/GlobalStyles/Layout/components/Icons';
import Footer from './Footer';
import config from '~/config';

const cx = classNames.bind(styles);

function LayoutHome() {
    return (
        <div className={cx('wapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-top')}>
                        <span>Cách đơn giản nhất</span>
                        <p>
                            để quản lí<span> tài chính cá nhân</span>
                        </p>
                    </div>
                    <div className="btn-options">
                        <Button text to={config.routes.login}>
                            Phiên bản web
                        </Button>
                        <Button rounded>
                            <p>Tải về miễn phí</p>
                        </Button>
                    </div>
                    <div className={cx('content-bot')}>
                        <div className={cx('bot-left')}>
                            <span>
                                Quản lí tài chính cá nhân <p>thật dễ dàng</p>
                            </span>
                            <p>Khi đã có MoneyMoney.</p>
                            <div>
                                <IconAppStore />
                                <IconGGPlay />
                            </div>
                        </div>
                        <div className={cx('bot-right')}>
                            <img
                                className={cx('image-home')}
                                src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/350367609_253806947325289_6975112200951959026_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=NFUyE-NLDusAX9y-ezC&_nc_ht=scontent.fsgn5-11.fna&oh=03_AdSk7DfHDEjPxSmRArjkIwBEJs-epQtIo5CRNwD4RCLSPA&oe=649C1164"
                                alt="Image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LayoutHome;
