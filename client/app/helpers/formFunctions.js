export function handleChange(e, formData, setFormData) {
   const { name, value } = e.target
   setFormData({
      ...formData,
      [name]: value,
   })
}

export function fieldValidation(field, msg, formData, setErrMsgs) {
   if (!formData[field]) {
      setErrMsgs(prevErrMsgs => ({
         ...prevErrMsgs,
         [field]: msg,
      }))
   } else {
      setErrMsgs(prevErrMsgs => ({
         ...prevErrMsgs,
         [field]: '',
      }))
   }
}

export function feedback(field, res, setErrMsgs) {
   setErrMsgs(prevErrMsgs => ({
      ...prevErrMsgs,
      [field]: res.err,
   }))
}

export function clear(setErrMsgs, empty) {
   setErrMsgs(empty)
}
