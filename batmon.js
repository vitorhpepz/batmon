const { exec } = require('child_process')

// TODO test screen and checking logs

function checkLevel()
{
    exec('pmset -g batt', (err, stdout, stderr) => {
        if (err) {
            console.log("Error pmseg: ", err)
            console.log(`stderr pmseg: ${stderr}`)
            return
        }

        var myRegexp = /\d+(?:\.\d+)?%/g
        var match = myRegexp.exec(stdout) //-InternalBattery-0 (id=6619235)	53%;

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

        if (level > 65 || level < 20) //TODO if > 65 and charging or < 20 and discharging
            exec('afplay /System/Library/Sounds/Hero.aiff')
    })
    setTimeout(checkLevel, 60 * 1000)
}

checkLevel()