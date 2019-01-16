let fs=require('fs')
function writeToText(data) {
    let newStr =data.changeMoney+'|'+data.money+'|'+data.type+'|'+data.rate+'|'+data.title+'|'+data.name+'|'+data.phone+'|'+data.email+'|'+data.date+'|'+data.address
    let str =fs.readFileSync('./message.txt', 'utf8') +'\n' +newStr;

    fs.writeFileSync('./message.txt',str);
}

module.exports = {
    writeToText
}