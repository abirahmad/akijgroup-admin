import PrivateRoute from '@/components/_utlities/privateRoute';
import BannerForm from '@/components/banner/BannerForm';

export default function DepartmentCreatePage() {
    return (
        <PrivateRoute permission='department.create'>
            <BannerForm
                id={0}
                pageType='create'
            />
        </PrivateRoute>
    )
}