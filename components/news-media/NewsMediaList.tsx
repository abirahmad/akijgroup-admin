import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState } from '@/redux/store';
import { PageContentList } from '@/components/layouts/PageContentList';
import { IDepartmentView, IEmployeeView, IMessageView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import PermissionModal from '../permissionModal';
import { emptyNewsMediaInputAction, getNewsMediaListAction } from '@/redux/actions/newsmedia-action';

export default function NewsMediaList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [messageID, setMessageID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { newsmediaList, newsmediaPaginationData, isLoading, isDeleting } = useSelector((state: RootState) => state.newsmedia);
    const [searchText, setSearchText] = useState<string>('');

    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Title', id: 2 },
        { title: 'Short Description', id: 3 },
        { title: 'Long Description', id: 4 },
        { title: "Action", id: 5 },
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getNewsMediaListAction(currentPage, dataLimit, searchText))
        }, 500),
        [currentPage, dataLimit, searchText]
    );



    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);


    const handleDeleteNewsMediaModal = (id: number) => {
        setShowDeleteModal(true);
        setMessageID(id);
    }

    const getActionButtons = (message: IMessageView) => {
        const actions = [];

        if (hasPermission('department.edit')) {
            actions.push({
                element: 'Edit',
                onClick: () => router.push(
                    `/news-media/edit?id=${message.id}`
                ),
                iconClass: 'pencil'
            });
        }

        if (hasPermission('department.delete')) {
            actions.push({
                element: 'Delete',
                onClick: () => handleDeleteNewsMediaModal(message.id),
                iconClass: 'trash'
            });
        }

        return actions;
    }

    return (
        <div>
            <PageHeader
                title={'News & Media'}
                searchPlaceholder={`Search anything...`}
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
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={'News...'} />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={newsmediaPaginationData.total}
                        >
                            {
                                newsmediaList && newsmediaList.length > 0 && newsmediaList.map((newsmedia: any, index: index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={newsmedia.id}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {newsmedia.title}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {newsmedia.short_description}
                                        </td>

                                        <td className="px-2 py-3 font-normal text-gray-900 break-words"
                                            scope="row"
                                            dangerouslySetInnerHTML={{ __html: newsmedia.long_description }} >

                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <ActionButtons
                                                items={getActionButtons(newsmedia)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                newsmediaList && newsmediaList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No News found ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>

            <PermissionModal
                show={showDeleteModal}
                status={"warning"}
                isLoading={isDeleting}
                loadingText={`Deleting News`}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={() => dispatch(deleteMessage(departmentID, setShowDeleteModal))}
            />
        </div >
    )
}