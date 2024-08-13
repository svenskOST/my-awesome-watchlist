import { handleChange } from '../helpers/formFunctions'

export default function TextControl({
   id,
   type,
   errMsg,
   value,
   formData,
   setFormData,
}) {
   const capitalize = str => {
      if (str.startsWith('new-')) str = str.slice(4)
      return str.charAt(0).toUpperCase() + str.slice(1)
   }

   return (
      <div>
         <label htmlFor={id}>{errMsg}</label>
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
