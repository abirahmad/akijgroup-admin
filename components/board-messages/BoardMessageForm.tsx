import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store"; // Import the correct types from your store
import Loading from "@/components/loading";
import Button from "@/components/button";
import { debounce } from "lodash";
import Input from "@/components/input";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";
import { useCallback, useEffect } from "react";
import {
  getMessageDetails,
  changeInputValue,
  createMessage,
  updateMessage,
} from "@/redux/actions/message-action";
import { getBase64 } from "@/utils/file-helper";

interface IBoardMessageForm {
  id: number;
  pageType: "create" | "edit" | "profile";
}

export default function BoardMessageForm({ id, pageType }: IBoardMessageForm) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { messageInput, isSubmitting, isLoadingDetails } = useSelector(
    (state: RootState) => state.message
  );

  // Adjusted handleChangeTextInput function with two arguments
  const handleChangeTextInput = async (
    name: string,
    value: string | number | boolean
  ) => {
    if (name === "image") {
      await getBase64(value, (result: any) => {
        dispatch(changeInputValue(name, result));
      });
    } else {
      dispatch(changeInputValue(name, value));
    }

    // dispatch(changeInputValue(name, value));
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

    if (pageType === "create") {
      dispatch(createMessage(formattedInputObject, router));
    } else {
      dispatch(updateMessage(formattedInputObject, router, pageType));
    }
  };

  const getMainPageTitle = () => {
    return "Board Message";
  };

  const getPageTitle = () => {
    let title = "";
    if (pageType === "create") {
      title += "New ";
    } else if (pageType === "edit") {
      title += "Edit ";
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
            <form
              method="post"
              autoComplete="off"
              encType="multipart/form-data"
            >
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
                  <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                    <label
                      htmlFor={""}
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Photo
                    </label>
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <img
                          src={messageInput.image}
                          alt={messageInput.first_name}
                          className=" w-36"
                        />

                        {pageType == "edit" ? (
                          <img
                            src={
                              `${process.env.NEXT_PUBLIC_URL_API}/storage/message/` +
                              messageInput.image
                            }
                            alt={messageInput.first_name}
                            className=" w-36"
                          />
                        ) : (
                          <></>
                        )}

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG or JPG (MAX. 1MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        name="image"
                        type="file"
                        onChange={(e: any) =>
                          handleChangeTextInput("image", e.target.files[0], e)
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Button
                title="Save"
                loadingTitle="Saving..."
                onClick={(e: any) => onSubmit(e)}
                loading={isSubmitting}
              />
            </form>
          )
        )}
      </PageContent>
    </>
  );
}
