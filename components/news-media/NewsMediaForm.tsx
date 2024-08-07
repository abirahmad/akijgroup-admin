import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import { debounce } from 'lodash';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { useCallback, useEffect, useState } from 'react';
import { createNewsMedia, getNewsMediaDetails, updateNewsMedia, changeInputValue } from '@/redux/actions/newsmedia-action';
import TextEditor from '../textEditor';

interface INewsMediaForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
}

export default function NewsMediaForm({ id, pageType }: INewsMediaForm) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { newsmediaInput, isSubmitting, isLoadingDetails } = useSelector((state: RootState) => state.newsmedia);
    const [errors, setErrors] = useState({});

    const handleChangeTextInput = async (name: string, value: any, e: any) => {
        dispatch(changeInputValue(name, value, e));
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (id > 0) {
                dispatch(getNewsMediaDetails(id));
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
            ...newsmediaInput,
        }

        if (pageType === 'create') {
            dispatch(createNewsMedia(formattedInputObject, router));
        } else {
            dispatch(updateNewsMedia(formattedInputObject, router, pageType));
        }
    }

    const getMainPageTitle = () => {
        return 'News & Media';
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

                {isLoadingDetails === false && typeof newsmediaInput !== "undefined" && newsmediaInput !== null && (
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-1">

                            <div className='md:ml-4 col-span-4'>
                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Input
                                        label="Title"
                                        name="title"
                                        placeholder='Title'
                                        value={newsmediaInput.title}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Short Description"
                                        name="short_description"
                                        placeholder='Short Description'
                                        value={newsmediaInput.short_description}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                </div>

                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    {/* <Input
                                        label="Long Description"
                                        name="long_description"
                                        placeholder='Logn description'
                                        value={newsmediaInput.long_description}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    /> */}

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