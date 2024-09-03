import FormProvider from '../../context/FormProvider'

export default function UserLayout({ children }) {
   return <FormProvider>{children}</FormProvider>
}
