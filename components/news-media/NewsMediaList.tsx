import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState, AppDispatch } from '@/redux/store'; // Ensure AppDispatch is defined correctly in your store
import { PageContentList } from '@/components/layouts/PageContentList';
import { hasPermission } from '@/utils/permission';
import PermissionModal from '../permissionModal';
import { deleteNewsMedia, emptyNewsMediaInputAction, getNewsMediaListAction } from '@/redux/actions/newsmedia-action';

const NewsmediaList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [messageID, setMessageID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');

    const { NewsmediaList, newsmediaPaginationData, isLoading, isDeleting } = useSelector((state: RootState) => state.newsmedia);

    const columnData = [
        { title: "SL", id: 1 },
        { title: 'Title', id: 2 },
        { title: 'Short Description', id: 3 },
        { title: 'Long Description', id: 4 },
        { title: 'Action', id: 5 },
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getNewsMediaListAction(currentPage, dataLimit, searchText));
        }, 500),
        [currentPage, dataLimit, searchText, dispatch]
    );

    useEffect(() => {
        debouncedDispatch();
        // Clean up debounce on unmount
        return () => {
            debouncedDispatch.cancel();
        };
    }, [debouncedDispatch]);

    const handleDeleteDepartmentModal = (id: number) => {
        setShowDeleteModal(true);
        setMessageID(id);
    };

    const getActionButtons = (newsmedia: any) => {
        const actions = [];

        if (hasPermission('department.edit')) {
            actions.push({
                element: 'Edit',
                onClick: () => router.push(`/news-media/edit?id=${newsmedia.id}`),
                iconClass: 'pencil'
            });
        }

        if (hasPermission('department.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteDepartmentModal(newsmedia.id),
                iconClass: 'trash'
            });
        }

        return actions;
    };

    return (
        <div>
            <PageHeader
                title={'News & Media'}
                searchPlaceholder={'Search anything...'}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        onClick={() => dispatch(emptyNewsMediaInputAction())}
                        href={'/news-media/create'}
                        element={'New News'}
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
                        totalData={newsmediaPaginationData.total}
                    >
                        {NewsmediaList && NewsmediaList.length > 0 ? (
                            NewsmediaList.map((newmedia: any, index: number) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={newmedia.id}>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {index + 1}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {newmedia.title}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {newmedia.short_description}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {newmedia.long_description}
                                    </td>
                                    <td className="px-2 py-3 flex gap-1">
                                        <ActionButtons items={getActionButtons(newmedia)} />
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
                        dispatch(deleteNewsMedia(messageID, () => setShowDeleteModal(false)));
                    }
                }}
            />
        </div>
    );
}

export default NewsmediaList;
