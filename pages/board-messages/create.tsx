import PrivateRoute from '@/components/_utlities/privateRoute';
import BoardMessageForm from '@/components/board-messages/BoardMessageForm';

export default function DepartmentCreatePage() {
    return (
        <PrivateRoute permission='department.create'>
            <BoardMessageForm
                id={0}
                pageType='create'
            />
        </PrivateRoute>
    )
}