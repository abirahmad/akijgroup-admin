import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import { debounce } from 'lodash';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { changeInputValue, createNewsMedia, getNewsMediaDetails, updateNewsMedia } from '@/redux/actions/newsmedia-action';
import { useCallback, useEffect } from 'react';
import { AppDispatch } from '@/redux/store'; // Import AppDispatch if you have defined it in store
import TextEditor from '../textEditor';

interface INewsMediaForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
}

export default function NewsMediaForm({ id, pageType }: INewsMediaForm) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { newsmediaInput, isSubmitting, isLoadingDetails } = useSelector((state: RootState) => state.newsmedia);

    const handleChangeTextInput = (name: string, value: any, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeInputValue(name, value, e));
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (id > 0) {
                dispatch(getNewsMediaDetails(id));
            }
        }, 500),
        [id, dispatch]
    );

    useEffect(() => {
        debouncedDispatch();
        return () => debouncedDispatch.cancel();
    }, [debouncedDispatch]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedInputObject = {
            ...newsmediaInput,
        };

        if (pageType === 'create') {
            dispatch(createNewsMedia(formattedInputObject, router));
        } else {
            dispatch(updateNewsMedia(formattedInputObject, router, pageType));
        }
    };

    const getMainPageTitle = () => {
        return 'News Media';
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

                {isLoadingDetails === false && newsmediaInput && (
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                        onSubmit={onSubmit} // Moved onSubmit to the form tag
                    >
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-1">
                            <div className='md:ml-4 col-span-4'>
                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Input
                                        label="Name"
                                        name="name"
                                        placeholder='News Name'
                                        value={newsmediaInput.name}
                                        isRequired={true}
                                        inputChange={(e) => handleChangeTextInput}
                                    />
                                    <Input
                                        label="short_description"
                                        name="code"
                                        placeholder='Code'
                                        value={newsmediaInput.code}
                                        isRequired={true}
                                        inputChange={(e) => handleChangeTextInput}
                                    />

                                    <TextEditor
                                        label="Long Description"
                                        name="long_description"
                                        placeholder="Long Desctription..."
                                        value={newsmediaInput?.long_description}
                                        isRequired={true}
                                        // errors={errors}
                                        inputChange={handleChangeTextInput}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            title='Save'
                            loadingTitle="Saving..."
                            onClick={(e: any) => onSubmit(e as any)} // Type casting to any if needed
                            loading={isSubmitting}
                        />
                    </form>
                )}
            </PageContent>
        </>
    );
}
