import type { NextPage } from "next"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const tryRequest = () => {
    let request = fetch(
      "https://api.vk.com/method/users.get?user_ids=yareyaredazze&fields=bdate&access_token=9Kzcs7NW8vQIOQVatZkJ&v=5.131"
    )
    console.log(request)
  }

  return (
    <div className={styles.container}>
      <button onClick={tryRequest}>Вк апи</button>
    </div>
  )
}

export default Home
