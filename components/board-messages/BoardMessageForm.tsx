import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store'; // Import the correct types from your store
import Loading from '@/components/loading';
import Button from '@/components/button';
import { debounce } from 'lodash';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { useCallback, useEffect } from 'react';
import { getMessageDetails, changeInputValue, createMessage, updateMessage } from '@/redux/actions/message-action';

interface IBoardMessageForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
}

export default function BoardMessageForm({ id, pageType }: IBoardMessageForm) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { messageInput, isSubmitting, isLoadingDetails } = useSelector((state: RootState) => state.message);

    // Adjusted handleChangeTextInput function with two arguments
    const handleChangeTextInput = (name: string, value: string | number | boolean) => {
        dispatch(changeInputValue(name, value));
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (id > 0) {
                dispatch(getMessageDetails(id));
            }
        }, 500),
        [id, dispatch]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formattedInputObject = {
            ...messageInput,
        };

        if (pageType === 'create') {
            dispatch(createMessage(formattedInputObject, router));
        } else {
            dispatch(updateMessage(formattedInputObject, router, pageType));
        }
    };

    const getMainPageTitle = () => {
        return 'Board Message';
    };

    const getPageTitle = () => {
        let title = '';
        if (pageType === 'create') {
            title += 'New ';
        } else if (pageType === 'edit') {
            title += 'Edit ';
        }

        title += getMainPageTitle();

        return title;
    };

    return (
        <>
            <PageHeader title={getPageTitle()} hasSearch={false} />
            <PageContent>
                {isLoadingDetails ? (
                    <div className="text-center">
                        <Loading loadingTitle={`${getMainPageTitle()} Details...`} />
                    </div>
                ) : (
                    messageInput && (
                        <form method="post" autoComplete="off" encType="multipart/form-data">
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-1">
                                <div className="md:ml-4 col-span-4">
                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                        <Input
                                            label="Name"
                                            name="name"
                                            placeholder="Department Name"
                                            value={messageInput.name}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                        <Input
                                            label="Designation"
                                            name="designation"
                                            placeholder="Designation"
                                            value={messageInput.designation}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                    </div>

                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                        <Input
                                            label="Message"
                                            name="message"
                                            placeholder="Write Message"
                                            value={messageInput.message}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                title="Save"
                                loadingTitle="Saving..."
                                onClick={(e:any) => onSubmit(e)}
                                loading={isSubmitting}
                            />
                        </form>
                    )
                )}
            </PageContent>
        </>
    );
}
