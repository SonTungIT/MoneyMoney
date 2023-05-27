import config from '~/config';
import Login from '~/pages/Authenticated/Login';
import Header from '~/components/GlobalStyles/Layout/components/Header/Header';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.header, component: Header, layout: null },
];

export { publicRoutes };
