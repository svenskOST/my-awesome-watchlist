export function handleChange(e, formData, setFormData) {
   const { name, value } = e.target
   setFormData({
      ...formData,
      [name]: value,
   })
}

export function fieldValidation(field, message, formData, setErrorMessages) {
   if (!formData[field]) {
      setErrorMessages(prevErrorMessages => ({
         ...prevErrorMessages,
         [field]: message,
      }))
   } else {
      setErrorMessages(prevErrorMessages => ({
         ...prevErrorMessages,
         [field]: '',
      }))
   }
}

export function feedback(field, data, setErrorMessages) {
   setErrorMessages(prevErrorMessages => ({
      ...prevErrorMessages,
      [field]: data.error,
   }))
}

export function clear(setErrorMessages, empty) {
   setErrorMessages(empty)
}
