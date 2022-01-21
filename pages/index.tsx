import type { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Cookies from "js-cookie"
var _ = require("lodash")

const Home: NextPage = () => {
  const [user, setUser] = useState<any>(
    JSON.parse(Cookies.get("user")!) || undefined
  )
  const [photos, setPhotos] = useState<any>()

  useEffect(() => {
    VK.init({
      apiId: 8056179,
    })
  }, [])

  const getPhotos = () => {
    VK.Api.call(
      "photos.getAll",
      {
        owner_id: user.id,
        access_token:
          "e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0",
        v: "5.131",
      },
      (res) => {
        console.log(res)
        let tempPhotos: any = []
        res.response.items.map((i: any) => {
          let sortedArray = _.orderBy(i.sizes, "height", "desc")
          tempPhotos.push({ ...i, sizes: sortedArray })
        })
        console.log(tempPhotos)
        setPhotos(tempPhotos)
      }
    )
  }

  const logIn = () => {
    VK.Auth.login((status) => {
      console.log(status)
      setUser(status.session.user)
      Cookies.set("user", JSON.stringify(status.session.user), {
        expires: status.session.expire,
      })
    }, 4)
  }

  return (
    <>
      <div className={styles.container}>
        <button onClick={getPhotos}>Вк апи</button>
        <button onClick={logIn}>Войти через вк</button>
        {user ? user.first_name : null}
        &nbsp;
        {user ? user.last_name : null}
        <div className={styles.album}>
          {photos
            ? photos.map((i: any, index: number) => (
                <img
                  src={i.sizes.find((e: any) => e.type == "r").url}
                  className={styles.photo}
                  width={i.sizes.find((e: any) => e.type == "r").width}
                  key={index}
                />
              ))
            : null}
        </div>
      </div>
    </>
  )
}

export default Home
