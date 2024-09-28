import { ButtonLogout } from '@/components/button-logout'
import { authOptions } from '@/helpers/auth-options'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <h1>Hello, world! </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <ButtonLogout>Logout</ButtonLogout>
    </>
  )
}
