import type { NextPage } from "next"
import { useRouter } from "next/router"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const router = useRouter()

  const tryRequest = () => {
    let request = fetch(
      "https://api.vk.com/method/users.get?user_ids=yareyaredazze&fields=bdate&access_token=e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0&v=5.131"
    )
    console.log(request)
  }

  const logIn = () => {
    router.push(
      "https://oauth.vk.com/authorize?client_id=8056179&redirect_uri=https://vkapi.vercel.app/callback&scope=12&display=popup"
    )
  }

  return (
    <div className={styles.container}>
      <button onClick={tryRequest}>Вк апи</button>
      <button onClick={logIn}>Войти через вк</button>
    </div>
  )
}

export default Home
