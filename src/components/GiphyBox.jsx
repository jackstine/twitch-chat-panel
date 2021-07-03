import { useCallback, useEffect, useState } from 'react'
import Giphy from './Giphy'
import TwitchBotAPI from '../apis/TwitchBotAPI'

/**
 * 
 * @returns call api to get 1 thing
 * when the time limit cuts off, call again
 * if nothing is returned, change the timelimit to a new time
 */

let MAX_TIME = 1000 * 60 * 3
let INTERVAL_TIME = 1000 * 5

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
  useEffect(() => {
    getterFunc(timelimit).then(giph => {
      if (giph.data) {
        setTimelimit(MAX_TIME)
      } else {
        if (timelimit === INTERVAL_TIME) {
          setTimelimit(INTERVAL_TIME + 1)
        } else {
          setTimelimit(INTERVAL_TIME)
        }
      } 
      console.log(giph.data)
      setGiph(giph.data)
    })
  }, [timelimit])
  let render = giph !== null
  return (render &&
    <div>
      {/* name */}
      <Giphy large={true} data={giph.message}/>
    </div>
  )
}

export default GiphyBox