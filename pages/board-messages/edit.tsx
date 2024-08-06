import PrivateRoute from '@/components/_utlities/privateRoute';
import BoardMessageForm from '@/components/board-messages/BoardMessageForm';
import DepartmentForm from '@/components/department/DepartmentForm';
import { useRouter } from 'next/router';

export default function EmployeeEditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PrivateRoute permission='department.edit'>
      <BoardMessageForm
        id={typeof id === undefined || id === null ? 0 : parseInt(id + '')}
        pageType='edit'
      />
    </PrivateRoute>
  )
}