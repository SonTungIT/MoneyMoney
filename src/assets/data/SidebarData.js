import config from '~/config';
import { IconWallet, IconBox, Iconpaper } from '~/components/GlobalStyles/Layout/components/Icons';

export const SidebarData = [
    {
        title: 'Sổ Giao Dịch',
        path: config.routes.SoGiaoDich,
        icon: <IconWallet />,
    },
    {
        title: 'Báo Cáo',
        path: config.routes.BaoCao,
        icon: <IconBox />,
    },
    {
        title: 'Ngân Sách',
        path: config.routes.NganSach,
        icon: <Iconpaper />,
    },
];
