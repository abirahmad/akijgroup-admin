import PrivateRoute from '@/components/_utlities/privateRoute';
import NewsMediaList from '@/components/news-media/NewsMediaList';

export default function NewsMediaPage() {
    return (
        <PrivateRoute permission='department.view'>
            <NewsMediaList />
        </PrivateRoute>
    )
}