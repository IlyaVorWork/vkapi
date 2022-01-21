import clsx from "clsx"
import type { NextPage } from "next"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const [user, setUser] = useState<any>()
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
          i.sizes.map((el: any) => {
            if (el.type == "w") {
              tempPhotos.push({ ...i, sizes: [el] })
              return
            } else if (el.type == "z") {
              tempPhotos.push({ ...i, sizes: [el] })
            }
          })
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
    }, 4)
  }

  return (
    <>
      <div className={styles.container}>
        <button onClick={getPhotos}>Вк апи</button>
        <button onClick={logIn}>Войти через вк</button>
        {user ? user.first_name : null}
        <br />
        {user ? user.last_name : null}
        <div className={styles.album}>
          {photos
            ? photos.map((i: any, index: number) => (
                <Image
                  src={i.sizes[0].url}
                  className={styles.photo}
                  height={i.sizes[0].height / 4}
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
