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
    VK.Api.call(
      "photos.getAlbums",
      {
        owner_id: user.id,
        access_token:
          "e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0",
        v: "5.131",
      },
      (res) => console.log(res)
    )
  }

  const logIn = () => {
    VK.Auth.login((status) => {
      console.log(status)
      setUser(status.session.user)
    }, 4)
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
