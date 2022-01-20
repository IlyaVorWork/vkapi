import type { NextPage } from "next"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const tryRequest = () => {
    let request = fetch(
      "https://api.vk.com/method/users.get?user_ids=yareyaredazzle&fields=bdate&access_token=e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0&v=5.131"
    )
    console.log(request)
  }

  return (
    <div className={styles.container}>
      <button onClick={() => tryRequest}>Вк апи</button>
    </div>
  )
}

export default Home
