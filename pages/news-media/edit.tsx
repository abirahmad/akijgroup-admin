import PrivateRoute from '@/components/_utlities/privateRoute';
import NewsMediaForm from '@/components/news-media/NewsMediaForm';
import { useRouter } from 'next/router';

export default function EmployeeEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute permission='department.edit'>
      <NewsMediaForm
        id={typeof id === undefined || id === null ? 0 : parseInt(id + '')}
        pageType='edit'
      />
    </PrivateRoute>
  )
}