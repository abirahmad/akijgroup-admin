import PrivateRoute from '@/components/_utlities/privateRoute';
import NewsMediaForm from '@/components/news-media/NewsMediaForm';

export default function DepartmentCreatePage() {
    return (
        <PrivateRoute permission='department.create'>
            <NewsMediaForm
                id={0}
                pageType='create'
            />
        </PrivateRoute>
    )
}