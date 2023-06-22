import config from '~/config';
import { IconWallet, IconBox, Iconpaper, IconHistory } from '~/components/GlobalStyles/Layout/components/Icons';

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
        title: 'Tiết Kiệm',
        path: config.routes.NganSach,
        icon: <Iconpaper />,
    },
    //     {
    //         title: 'Nhật Ký',
    //         path: config.routes.LichSu,
    //         icon: <IconHistory />,
    //     },
];
