export const appHelpers={


     abbreviateThousands : (value) => {
        const num = Number(value)
        const absNum = Math.abs(num)
        const sign = Math.sign(num)
        const numLength = Math.round(absNum).toString().length
        const symbol = ['K', 'M', 'B', 'T', 'Q']
        const symbolIndex = Math.floor((numLength - 1) / 3) - 1
        const abbrv = symbol[symbolIndex] || symbol[symbol.length - 1]
        let divisor = 0
        if (numLength > 15) divisor = 1e15
        else if (numLength > 12) divisor = 1e12
        else if (numLength > 9) divisor = 1e9
        else if (numLength > 6) divisor = 1e6
        else if (numLength > 3) divisor = 1e3
        else return num
        return `${((sign * absNum) / divisor).toFixed(divisor && 1)}${abbrv}`
      }

}