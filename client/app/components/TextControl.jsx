import { handleChange } from '../helpers/formFunctions'

export default function TextControl({
   id,
   errMsg,
   value,
   formData,
   setFormData,
}) {
   const capitalize = str => {
      if (str.startsWith('new-')) str = str.slice(4)
      return str.charAt(0).toUpperCase() + str.slice(1)
   }

   const type = id => {
      if (id == 'username') return 'text'
      return id
   }

   return (
      <div>
         <label htmlFor={id}>{errMsg}</label>
         <input
            id={id}
            name={id}
            value={value}
            autoComplete={id}
            type={type(id)}
            placeholder={capitalize(id)}
            onChange={e => handleChange(e, formData, setFormData)}
         />
      </div>
   )
}
