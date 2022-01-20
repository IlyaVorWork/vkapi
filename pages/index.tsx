import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const router = useRouter()

  VK.init({
    apiId: 8056179,
  })

  const tryRequest = () => {
    let request = fetch(
      "https://api.vk.com/method/users.get?user_ids=yareyaredazze&fields=bdate&access_token=e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0&v=5.131"
    )
    console.log(request)
  }

  const logIn = () => {
    VK.Auth.login((status) => console.log(status), 1)
  }

  return (
    <>
      <div className={styles.container}>
        <button onClick={tryRequest}>Вк апи</button>
        <button onClick={logIn}>Войти через вк</button>
      </div>
    </>
  )
}

export default Home
