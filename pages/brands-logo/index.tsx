import PrivateRoute from '@/components/_utlities/privateRoute';
import BrandLogoList from '@/components/brandslogo/BrandLogoList';

export default function NewsMediaPage() {
    return (
        <PrivateRoute permission='department.view'>
            <BrandLogoList />
        </PrivateRoute>
    )
}