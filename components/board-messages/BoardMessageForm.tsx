import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import { debounce } from 'lodash';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { useCallback, useEffect } from 'react';
import { getMessageDetails,changeInputValue, createMessage, updateMessage } from '@/redux/actions/message-action';

interface IBoardMessageForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
}

export default function BoardMessageForm({ id, pageType}: IBoardMessageForm) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { messageInput, isSubmitting, isLoadingDetails } = useSelector((state: RootState) => state.message);


    const handleChangeTextInput = async (name: string, value: any) => {
         dispatch(changeInputValue(name, value));
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (id > 0) {
                dispatch(getMessageDetails(id));
            }
        }, 500),
        [id]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formattedInputObject = {
            ...messageInput,
        }

        if (pageType === 'create') {
            dispatch(createMessage(formattedInputObject, router));
        } else {
            dispatch(updateMessage(formattedInputObject, router, pageType));
        }
    }

    const getMainPageTitle = () => {
        return 'Board Message';
    }

    const getPageTitle = () => {
        let title = '';
        if (pageType === 'create') {
            title += 'New ';
        } else if (pageType === 'edit') {
            title += 'Edit ';
        }

        title += getMainPageTitle();

        return title;
    }

    return (
        <>
            <PageHeader
                title={getPageTitle()}
                hasSearch={false}
            />
            <PageContent>
                {
                    isLoadingDetails &&
                    <div className="text-center">
                        <Loading
                            loadingTitle={`${getMainPageTitle()} Details...`}
                        />
                    </div>
                }

                {isLoadingDetails === false && typeof messageInput !== "undefined" && messageInput !== null && (
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-1">

                            <div className='md:ml-4 col-span-4'>
                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Input
                                        label="Name"
                                        name="name"
                                        placeholder='Department Name'
                                        value={messageInput.name}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Designation"
                                        name="designation"
                                        placeholder='Designation'
                                        value={messageInput.designation}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                </div>

                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Input
                                        label="Message"
                                        name="message"
                                        placeholder='Write Message'
                                        value={messageInput.message}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                </div>
                            </div>

                        </div>

                        <Button
                            title='Save'
                            loadingTitle="Saving..."
                            onClick={(e) => onSubmit(e)}
                            loading={isSubmitting}
                        />
                    </form>
                )
                }
            </PageContent>
        </>
    )
}