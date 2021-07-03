const Giphy = function (props) {
  let data = props.data
  // the regexes are stashed at https://regex101.com/r/iLZO9Z/1
  let urlRegex = /https{0,1}:\/\/.*[\/-]{1}(\w{6,20})([\/]|$)/
  let regInfo = data.match(urlRegex)
  if (regInfo && regInfo[1].length <= 20) {
    data = regInfo[1]
  } else if (regInfo && regInfo[1].length > 20) {
    console.log(regInfo)
    console.error('Reg ex is greater than 20 characters')
  }
  if (data.includes('https')) {
    console.error(data)
  }
  let c = props.large ? "message-chain-giphy-large" : "message-chain-giphy"
  return (<img
    className={c}
    src={`https://media.giphy.com/media/${data}/giphy.gif`}
  />)
}

export default Giphy
