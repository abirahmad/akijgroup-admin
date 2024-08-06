import PrivateRoute from '@/components/_utlities/privateRoute';
import BoardMessageList from '@/components/board-messages/BoardMessageList';

export default function EmployeeListPage() {
    return (
        <PrivateRoute permission='employee.view'>
            <BoardMessageList />
        </PrivateRoute>
    )
}