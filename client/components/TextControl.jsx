import { handleChange } from '../helpers/formFunctions'

export default function TextControl(props) {
   const capitalize = string => {
      if (string.startsWith('new-')) string = string.slice(4)
      return string.charAt(0).toUpperCase() + string.slice(1)
   }

   return (
      <div>
         <label htmlFor={props.id}>{props.errorMessage}</label>
         <input
            id={props.id}
            name={props.id}
            value={props.value}
            autoComplete={props.id}
            type={props.type}
            placeholder={capitalize(props.id)}
            onChange={e => handleChange(e, props.formData, props.setFormData)}
         />
      </div>
   )
}
