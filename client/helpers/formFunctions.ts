export function handleChange(
   e: React.ChangeEvent<HTMLInputElement>,
   formData: FormData,
   setFormData: React.Dispatch<React.SetStateAction<FormData>>
) {
   const { name, value } = e.target
   setFormData({ ...formData, [name]: value })
}

export function fieldValidation(
   field: string,
   message: string,
   formData: FormData,
   setErrorMessages: React.Dispatch<React.SetStateAction<FormData>>
) {
   if (!formData[field]) {
      setErrorMessages(previousErrorMessages => ({ ...previousErrorMessages, [field]: message }))
   } else {
      setErrorMessages(previousErrorMessages => ({ ...previousErrorMessages, [field]: '' }))
   }
}

export function feedback(
   field: string,
   response: string,
   setErrorMessages: React.Dispatch<React.SetStateAction<FormData>>
) {
   setErrorMessages(previousErrorMessages => ({
      ...previousErrorMessages,
      [field]: response,
   }))
}

export function clear(
   setErrorMessages: React.Dispatch<React.SetStateAction<FormData>>,
   empty: FormData
) {
   setErrorMessages(empty)
}
