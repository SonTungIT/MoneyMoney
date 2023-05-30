import config from '~/config';
import Login from '~/pages/Authenticated/Login';
import DefaultLayout from '~/components/GlobalStyles/Layout/DefaultLayout';
import LayoutHome from '~/pages/Home/LayoutHome';
import SoGiaoDich from '~/pages/User/SoGiaoDich/SoGiaoDich';
import BaoCao from '~/pages/User/BaoCao/BaoCao';
import NganSach from '~/pages/User/NganSach/NganSach';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.LayoutHome, component: LayoutHome, layout: null },

    { path: config.routes.SoGiaoDich, component: SoGiaoDich, layout: DefaultLayout },
    { path: config.routes.BaoCao, component: BaoCao, layout: DefaultLayout },
    { path: config.routes.NganSach, component: NganSach, layout: DefaultLayout },
];

export { publicRoutes };
