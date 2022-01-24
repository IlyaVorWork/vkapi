import type { NextPage } from "next"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import Cookies from "js-cookie"
var _ = require("lodash")

type windowWidth = number | undefined

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

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<windowWidth>()

    useEffect(() => {
      if (typeof window !== "undefined") {
        const handleResize = () => {
          setWindowSize(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)
      }
    }, [])
    return windowSize
  }

  const winSize = useWindowSize()
  console.log(winSize)

  let padding: number = 0

  winSize
    ? (padding = (winSize - Math.floor(winSize / 286) * 286 - 40) / 2)
    : null

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
      <div className={styles.navbar}>
        {user ? (
          <>
            <div className={styles.user}>
              {user?.avatar ? (
                <img src={user.avatar} className={styles.avatar} />
              ) : null}
              <span className={styles.name}>
                {user ? `${user.first_name} ` : null}
                {user ? user.last_name : null}
              </span>
            </div>
            <div className={styles.navButtons}>
              <button onClick={getPhotos} className={styles.button}>
                Загрузить фотографии
              </button>
              <button onClick={logOut} className={styles.button}>
                Выйти
              </button>
            </div>
          </>
        ) : (
          <button onClick={logIn} className={styles.button}>
            Войти через вк
          </button>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.album} style={{ paddingLeft: padding }}>
          {photos
            ? photos.map((i: any, index: number) => (
                <img
                  src={i.sizes.find((e: any) => e.type == "r").url}
                  className={styles.photo}
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
