const { exec } = require('child_process')

function batmon()
{
    exec('pmset -g batt', (err, stdout) => {
        if (err) {
            console.log("Error pmseg: ", err)
            return
        }

        var myRegexp = /\d+(?:\.\d+)?%/g
        var match = myRegexp.exec(stdout) //ex.: -InternalBattery-0 (id=6619235)	53%;

        var level = -1
        
        if (match.length > 0) 
        {
            var levelStr = match[0].replace('%','')

            if (!isNaN(levelStr)) level = Number(levelStr)
        }
        
        if (level === -1)
        {
            console.log('couldnt read batt level')
            return
        }

        if (level > 65)
            exec('afplay /System/Library/Sounds/Hero.aiff')
    })
    setTimeout(checkLevel, 60 * 1000) //every minute
}

batmon()