import React from "react";

export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg
        outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white transition peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white transition 
        peer-focus:text-primary self-start"
      >
        {label}
      </label>
    </div>
  );
}