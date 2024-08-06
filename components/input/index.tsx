import DatePicker from "react-datepicker";
import ValidationMessage from "../validationMessage";
import { format } from "date-fns";
import { ChangeEvent, FocusEvent } from "react";

interface IInput {
  name?: string;
  value?: string | number | Date | null; // Updated value type
  inputChange?: (name: string, value: string | number | boolean) => void; // Updated type
  handleBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  errors?: Record<string, string>; // Updated type
  minValue?: Date | string; // Updated type
  maxValue?: Date | string; // Updated type
  minLength?: number;
  maxLength?: number;
  areaClassNames?: string;
  hintText?: string;
  rows?: number;
  checked?: boolean;
}

export default function Input({
  name = "text",
  value,
  inputChange,
  placeholder = "Type Here",
  label = "Label",
  type = "text",
  isRequired = false,
  isDisabled = false,
  errors,
  minValue,
  maxValue,
  areaClassNames = '',
  hintText = '',
  rows = 3,
  checked = false,
  minLength,
  maxLength
}: IInput) {

  const hasInputError = errors && errors[name];

  const getInputClasses = () => {
    return `shadow-sm 
      border 
      ${hasInputError ? 'bg-red-50 border border-red-500 text-red-900' :
        'border-gray-300 text-gray-900 '}
      sm:text-sm 
      rounded-md 
      focus:ring-cyan-600 
      focus:border-cyan-600 
      block 
      w-full 
      p-2 
      my-2 
      ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}
      `;
  }

  const handleDateChange = (date: Date | null) => {
    if (inputChange && date) {
      inputChange(name || '', format(date, 'yyyy-MM-dd'));
    }
  }

  return (
    <div className={areaClassNames}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {label}{" "}
        {isRequired && <span className="text-red-600 text-base"> * </span>}
      </label>

      {
        type === 'textarea' &&
        <textarea
          id={name}
          name={name}
          value={value as string}
          disabled={isDisabled}
          required={isRequired}
          className={getInputClasses()}
          placeholder={placeholder}
          onChange={inputChange && ((e: ChangeEvent<HTMLTextAreaElement>) => inputChange(name || '', e.target.value))}
          rows={rows}
        ></textarea>
      }

      {
        type !== 'textarea' && type !== 'checkbox' && type !== 'date' &&
        <input
          id={name}
          type={type}
          name={name}
          value={value as string | number}
          disabled={isDisabled}
          required={isRequired}
          min={minValue && minValue}
          max={maxValue && maxValue}
          className={getInputClasses()}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={inputChange && ((e: ChangeEvent<HTMLInputElement>) => inputChange(name || '', e.target.value))}
        />
      }

      {
        type === 'checkbox' &&
        <input
          id={name}
          type={type}
          name={name}
          disabled={isDisabled}
          required={isRequired}
          className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
          placeholder={placeholder}
          checked={checked}
          onChange={inputChange && ((e: ChangeEvent<HTMLInputElement>) => inputChange(name || '', e.target.checked ? 1 : 0))}
        />
      }

      {
        type === 'date' &&
        <DatePicker
          id={name}
          dateFormat="dd/MM/yyyy"
          selected={value ? new Date(value as string) : new Date()}
          onChange={handleDateChange}
          className={`${getInputClasses()} mt-0`}
          maxDate={maxValue ? new Date(maxValue as string) : undefined}
          minDate={minValue ? new Date(minValue as string) : undefined}
          disabled={isDisabled}
          required={isRequired}
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={100}
          scrollableYearDropdown
        />
      }

      {
        hasInputError && (
          <ValidationMessage message={errors[name]} />
        )
      }

      {
        hintText !== '' &&
        <p className="text-gray-500 mt-1 text-xs">{hintText}</p>
      }
    </div>
  );
}
