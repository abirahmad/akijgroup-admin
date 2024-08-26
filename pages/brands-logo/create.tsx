import PrivateRoute from '@/components/_utlities/privateRoute';
import BrandLogoForm from '@/components/brandslogo/BrandLogoForm';

export default function DepartmentCreatePage() {
    return (
        <PrivateRoute permission='department.create'>
            <BrandLogoForm
                id={0}
                pageType='create'
            />
        </PrivateRoute>
    )
}