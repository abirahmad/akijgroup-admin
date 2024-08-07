import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

interface IInput {
    name?: string;
    value?: any;
    inputChange?: void | any;
    handleBlur?: void | any;
    placeholder?: string;
    label?: string;
    type?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    errors?: any;
    minValue?: any;
    maxValue?: any;
    minLength?: any;
    maxLength?: any;
    areaClassNames?: string;
    hintText?: string;
    rows?: number;
    checked?: boolean;
    isCapitalize?: boolean;
}

const TextEditor = ({
    name = "text",
    value,
    inputChange,
    placeholder = "Type Here",
    label = "Label",
    type = "text",
    isRequired = false,
    isDisabled = false,
    errors,
    isCapitalize = true,
}: IInput) => {

    const hasInputError = typeof errors !== "undefined" && errors !== null && errors[name];

    const getInputClasses = () => {
        return `shadow-sm 
        border-[1px] 
        ${hasInputError ? 'bg-red-50 border border-red-500 text-red-900' :
                'border-gray-300 text-gray-900 '}
        sm:text-sm 
        rounded-md 
        focus:ring-0 
        focus:border-[#017437] 
        block 
        w-full 
        p-2 
        my-2 
        ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}
        `;
    };

    const handleQuillChange = (content:any) => {
        if (inputChange) {
            inputChange(name, content);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-2">
                {label} {isRequired && <span className="text-red-600 text-base"> * </span>}
            </label>

            <ReactQuill
                id={name}
                value={value}
                theme="snow"
                readOnly={isDisabled}
                className={getInputClasses()}
                placeholder={placeholder}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                    ],
                }}
                formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                style={{
                    height: '400px', // Set minimum height
                }}
                onChange={handleQuillChange}
            />
        </div>
    );
};

export default TextEditor;
