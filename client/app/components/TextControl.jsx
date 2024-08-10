export default function TextControl({
   id,
   errorMessage,
   type,
   placeholder,
   value,
   auto,
   handleChange,
   formData,
   setFormData,
}) {
   return (
      <div>
         <label htmlFor={id}>{errorMessage}</label>
         <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            autoComplete={auto}
            onChange={e => handleChange(e, formData, setFormData)}
         />
      </div>
   )
}
