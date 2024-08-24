const base = 'http://localhost:4000'

export const request = async (url: string, method = 'GET', body = null, auth = true) => {
   try {
      let accessToken: string | null
      if (auth) accessToken = localStorage.getItem('accessToken')
      const response = await fetch(base + url, {
         method: method,
         headers: {
            'Content-Type': 'application/json',
            ...(auth && { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }),
         },
         ...(body ? { body: JSON.stringify(body) } : {}),
      })
      return response
   } catch (error) {
      console.error('Request failed:', error)
   }
}
