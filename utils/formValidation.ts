import { FormEvent, isValidElement } from 'react';
import Select, { ValueType } from 'react-select';

interface FormElement extends HTMLInputElement, HTMLSelectElement {
    tagName: string;
}

export const formValidation = (event: FormEvent<HTMLFormElement>): { errors: { [key: string]: string }; isValid: boolean } => {
    event.preventDefault();
    const errors: { [key: string]: string } = {};
    let isValid: boolean = true;
    const formElements = event.currentTarget.elements as HTMLFormControlsCollection;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as FormElement | typeof Select;
        if (element.required) {
            let value = '';
            if (element.tagName.toLowerCase() === 'select') {
                value = (element as HTMLSelectElement).value;
            } else if (isValidElement(element) && element.type === Select) {
                value = (element.props.value && (element.props.value as ValueType<{ value: string, label: string }>).value) || '';
            } else {
                value = (element as HTMLInputElement).value || '';
            }

            if (!value.trim()) {
                let errorMessage;
                if (element.placeholder !== "") {
                    errorMessage = `${element.placeholder} is required`
                } else {
                    errorMessage = `${element.name} is required`
                }
                let replaceUnderscore = errorMessage.split("_");
                replaceUnderscore[0] = replaceUnderscore[0].charAt(0).toUpperCase() + replaceUnderscore[0].slice(1);
                errors[element.name] = replaceUnderscore.join(" ");
                isValid = false;
            }
        }
    }
    return { errors, isValid };
};

export const formValidationOnInput = (form): { errors: { [key: string]: string }; isValid: boolean } => {
    const errors: { [key: string]: string } = {};
    let isValid: boolean = true;
    const formElements = form.elements as HTMLFormControlsCollection;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as FormElement | typeof Select;
        if (element.required) {
            let value = '';
            if (element.tagName.toLowerCase() === 'select') {
                value = (element as HTMLSelectElement).value;
            } else if (isValidElement(element) && element.type === Select) {
                value = (element.props.value && (element.props.value as ValueType<{ value: string, label: string }>).value) || '';
            } else {
                value = (element as HTMLInputElement).value || '';
            }

            value = value.trim() + '';

            if (value.length === 0) {
                let errorMessage = element.placeholder !== "" ?
                    `${element.placeholder} is required` :
                    `${element.name} is required`;

                let replaceUnderscore = errorMessage.split("_");
                replaceUnderscore[0] = replaceUnderscore[0].charAt(0).toUpperCase() + replaceUnderscore[0].slice(1);
                errors[element.name] = replaceUnderscore.join(" ");
                isValid = false;
            }
        }
    }
    return { errors, isValid };
};
