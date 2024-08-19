import { handleChange } from '../helpers/formFunctions'

export default function TextControl({ id, type, errorMessage, value, formData, setFormData }) {
   const capitalize = string => {
      if (string.startsWith('new-')) string = string.slice(4)
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   return (
      <div>
         <label htmlFor={id}>{errorMessage}</label>
         <input
            id={id}
            name={id}
            value={value}
            autoComplete={id}
            type={type}
            placeholder={capitalize(id)}
            onChange={e => handleChange(e, formData, setFormData)}
         />
      </div>
   )
}
