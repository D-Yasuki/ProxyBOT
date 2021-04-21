module.exports = (bot) => {
let prompt = process.openStdin()
prompt.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
        bot.channels.cache.get("706378512499605524").send(x.join(" "));
    });
}