const Giphy = function (props) {
  let data = props.data
  let originalsRex = /https:\/\/giphy.com\/clips\/originals-(\w*)/
  let regex =/https:\/\/media.giphy.com\/media\/(\w*)\/giphy.gif/ 
  let regs = [originalsRex, regex]
  for (let r of regs) {
    let regInfo = data.match(r)
    if (regInfo && regInfo[1].length <= 20) {
      data = regInfo[1]
      break
    } else if (regInfo && regInfo[1].length > 20) {
      console.log(regInfo)
      console.error('Reg ex is greater than 20 characters')
    }
  }
  if (data.includes('https')) {
    console.error(data)
  }
  return (<img
    className="message-chain-giphy"
    src={`https://media.giphy.com/media/${data}/giphy.gif`}
  />)
}

export default Giphy
