import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const [user, setUser] = useState<any>()
  const [photos, setPhotos] = useState<any>()
  const router = useRouter()

  useEffect(() => {
    VK.init({
      apiId: 8056179,
    })
  }, [])

  const getPhotos = () => {
    VK.Api.call("photos.getAlbums", { ownerId: user.id, v: "5.131" }, (res) =>
      console.log(res)
    )
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
        <button onClick={getPhotos}>Вк апи</button>
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
