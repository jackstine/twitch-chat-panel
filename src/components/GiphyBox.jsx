import { useCallback, useEffect, useState } from 'react'
import Giphy from './Giphy'
import TwitchBotAPI from '../apis/TwitchBotAPI'

/**
 * 
 * @returns call api to get 1 thing
 * when the time limit cuts off, call again
 * if nothing is returned, change the timelimit to a new time
 */

let MAX_TIME = 1000 * 60 * 5
let INTERVAL_TIME = 1000 * 5
let DEFAULT_GIPHY = process.env.REACT_APP_GIPHY

const GiphyBox = function () {
  const getterFunc =  useCallback((time) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
      TwitchBotAPI.getSpecialGiph().then(resp => {
          res(resp)
      }).catch(rej)
    }, time)
  })
  }, [])
  const [giph, setGiph] = useState(null)
  const [timelimit, setTimelimit] = useState(INTERVAL_TIME)
  const [defaultGiphy, setDefaultGiphy] = useState(DEFAULT_GIPHY)
  useEffect(() => {
    getterFunc(timelimit).then(giph => {
      if (giph.data) {
        if (timelimit === MAX_TIME) {
          setTimelimit(MAX_TIME + 10)
        } else {
          setTimelimit(MAX_TIME)
        }
        setDefaultGiphy('')
      } else {
        if (timelimit === INTERVAL_TIME) {
          setTimelimit(INTERVAL_TIME + 10)
        } else {
          setTimelimit(INTERVAL_TIME)
        }
        setDefaultGiphy(DEFAULT_GIPHY)
      }
      setGiph(giph.data)
    })
  }, [timelimit])
  let selectedGiph = defaultGiphy !== '' ? defaultGiphy : giph?.message
  let render = selectedGiph !== null && selectedGiph !== undefined
  return (render &&
    <div>
      {/* name */}
      <Giphy large={true} data={selectedGiph}/>
    </div>
  )
}

export default GiphyBox