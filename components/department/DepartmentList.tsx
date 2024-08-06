import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState, AppDispatch } from '@/redux/store'; // Ensure AppDispatch is defined correctly in your store
import { PageContentList } from '@/components/layouts/PageContentList';
import { IDepartmentView, IMessageView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import PermissionModal from '../permissionModal';
import { emptyDepartmentInputAction, getDepartmentListAction } from '@/redux/actions/department-action';

export default function DepartmentList() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [messageID, setMessageID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { departmentList, departmentPaginationData, isLoading, isDeleting } = useSelector((state: RootState) => state.department);
    const [searchText, setSearchText] = useState<string>('');

    const columnData = [
        { title: "SL", id: 1 },
        { title: 'Name', id: 2 },
        { title: 'Designation', id: 3 },
        { title: 'Message', id: 4 },
        { title: "Action", id: 5 },
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getDepartmentListAction(currentPage, dataLimit, searchText));
        }, 500),
        [currentPage, dataLimit, searchText, dispatch]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleDeleteDepartmentModal = (id: number) => {
        setShowDeleteModal(true);
        setMessageID(id);
    };

    const getActionButtons = (department: IDepartmentView) => {
        const actions = [];

        if (hasPermission('department.edit')) {
            actions.push({
                element: 'Edit',
                onClick: () => router.push(`/department/edit?id=${department.id}`),
                iconClass: 'pencil'
            });
        }

        if (hasPermission('department.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteDepartmentModal(department.id),
                iconClass: 'trash'
            });
        }

        return actions;
    };

    return (
        <div>
            <PageHeader
                title={'Board Messages'}
                searchPlaceholder={'Search anything...'}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        onClick={() => dispatch(emptyDepartmentInputAction())}
                        href={'/board-messages/create'}
                        element={'New Message'}
                    />
                }
            />

            <PageContentList>
                {isLoading ? (
                    <div className="text-center">
                        <Loading loadingTitle={'Loading Messages...'} />
                    </div>
                ) : (
                    <Table
                        column={columnData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        dataLimit={dataLimit}
                        totalData={departmentPaginationData.total}
                    >
                        {departmentList && departmentList.length > 0 ? (
                            departmentList.map((message: IMessageView, index: number) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={message.id}>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {index + 1}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {message.name}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {message.designation}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {message.message}
                                    </td>
                                    <td className="px-2 py-3 flex gap-1">
                                        <ActionButtons items={getActionButtons(message)} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <NoTableDataFound colSpan={5}>No Messages found! Please create one.</NoTableDataFound>
                        )}
                    </Table>
                )}
            </PageContentList>

            <PermissionModal
                show={showDeleteModal}
                status={"warning"}
                isLoading={isDeleting}
                loadingText={`Deleting Message`}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={() => {
                    if (messageID) {
                        dispatch(deleteMessage(messageID, () => setShowDeleteModal(false)));
                    }
                }}
            />
        </div>
    );
}
