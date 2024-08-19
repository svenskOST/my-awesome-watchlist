export function handleChange(e, formData, setFormData) {
   const { name, value } = e.target
   setFormData({ ...formData, [name]: value })
}

export function fieldValidation(field, message, formData, setErrorMessages) {
   if (!formData[field]) {
      setErrorMessages(previousErrorMessages => ({ ...previousErrorMessages, [field]: message }))
   } else {
      setErrorMessages(previousErrorMessages => ({ ...previousErrorMessages, [field]: '' }))
   }
}

export function feedback(field, response, setErrorMessages) {
   setErrorMessages(previousErrorMessages => ({
      ...previousErrorMessages,
      [field]: typeof response === 'string' ? response : response.error,
   }))
}

export function clear(setErrorMessages, empty) {
   setErrorMessages(empty)
}
