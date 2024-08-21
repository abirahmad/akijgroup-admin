import PrivateRoute from '@/components/_utlities/privateRoute';
import BannerList from '@/components/banner/BannerList';

export default function NewsMediaPage() {
    return (
        <PrivateRoute permission='department.view'>
            <BannerList />
        </PrivateRoute>
    )
}