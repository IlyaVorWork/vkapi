import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const [user, setUser] = useState<any>()
  const router = useRouter()

  useEffect(() => {
    VK.init({
      apiId: 8056179,
    })
  }, [])

  const tryRequest = () => {
    let request = fetch(
      "https://api.vk.com/method/users.get?user_ids=yareyaredazze&fields=bdate&access_token=e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0&v=5.131"
    )
    console.log(request)
  }

  const logIn = () => {
    VK.Auth.login((status) => {
      console.log(status)
      setUser(status.session.user)
    }, 2)
  }

  return (
    <>
      <div className={styles.container}>
        <button onClick={tryRequest}>Вк апи</button>
        <button onClick={logIn}>Войти через вк</button>
        {user ? user.id : null}
        {user ? user.domain : null}
        {user ? user.href : null}
        {user ? user.first_name : null}
        {user ? user.last_name : null}
      </div>
    </>
  )
}

export default Home
