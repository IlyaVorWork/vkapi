import type { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Cookies from "js-cookie"
var _ = require("lodash")

const Home: NextPage = () => {
  const [user, setUser] = useState<any>(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : undefined
  )
  const [photos, setPhotos] = useState<any>()

  useEffect(() => {
    VK.init({
      apiId: 8056179,
    })
  }, [])

  useEffect(() => {
    if (user && !user.avatar) {
      VK.Api.call(
        "users.get",
        {
          user_ids: user.id,
          fields: "photo_400_orig",
          access_token:
            "e7811478e7811478e781147863e7fbf90bee781e781147886680247f29066391477cac0",
          v: "5.131",
        },
        (response) => {
          console.log(response)
          setUser({ ...user, avatar: response.response[0].photo_400_orig })
        }
      )
    }
  }, [user])

  const getPhotos = () => {
    VK.Api.call(
      "photos.getAll",
      {
        owner_id: "cvetochek_luchistyj",
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
    let tempUser = {}
    VK.Auth.login((status) => {
      console.log(status)
      tempUser = status.session.user
      setUser(status.session.user)
      Cookies.set("user", JSON.stringify(status.session.user), {
        expires: 1 / 12,
      })
    }, 4)
  }

  const logOut = () => {
    VK.Auth.logout((status) => {
      console.log(status)
      setUser(null)
      setPhotos(null)
      Cookies.remove("user")
    })
  }

  return (
    <>
      <div className={styles.container}>
        <button onClick={getPhotos}>Вк апи</button>
        <button onClick={logIn}>Войти через вк</button>
        <button onClick={logOut}>Выйти</button>
        {user?.avatar ? (
          <img src={user.avatar} className={styles.avatar} />
        ) : null}
        &nbsp;
        {user ? user.first_name : null}
        &nbsp;
        {user ? user.last_name : null}
        <div className={styles.album}>
          {photos
            ? photos.map((i: any, index: number) => (
                <img
                  src={i.sizes.find((e: any) => e.type == "r").url}
                  className={styles.photo}
                  width={i.sizes.find((e: any) => e.type == "r").width * 0.75}
                  height={
                    i.sizes.find((e: any) => e.type == "r").height < 510
                      ? i.sizes.find((e: any) => e.type == "r").height * 0.75
                      : 510 * 0.75
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
