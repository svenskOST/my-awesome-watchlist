export const authenticateToken = async () => {
   try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:4000/auth', {
         method: 'POST',
         headers: { Authorization: `Bearer ${accessToken}` },
      })

      // Return true if authentication is successful, otherwise false
      return response.ok
   } catch (error) {
      console.error('Token authentication failed:', error)
      return false
   }
}
