import type { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
var _ = require("lodash")

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
          let tempSizes = i.sizes
          console.log(tempSizes)
          let sortedArray = _.orderBy(tempSizes, "height", "desc")
          console.log(sortedArray)
          tempPhotos.push({ ...i, sizes: [sortedArray[0]] })
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
        &nbsp;
        {user ? user.last_name : null}
        <div className={styles.album}>
          {photos
            ? photos.map((i: any, index: number) => (
                <img
                  src={i.sizes[0].url}
                  className={styles.photo}
                  height={
                    i.sizes[0].height > 400
                      ? i.sizes[0].height / 4
                      : i.sizes[0].height
                  }
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
