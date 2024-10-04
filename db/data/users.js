const bcrypt = require('bcryptjs')

module.exports = [
    { username: "admin", password: bcrypt.hashSync("pass")},
    { username: "VaporWaveVibe", password: bcrypt.hashSync("TokyoDreams1") },
    { username: "ChromeRonin", password: bcrypt.hashSync("ShibuyaSecrets") },
    { username: "KyotoKicks", password: bcrypt.hashSync("SneakerHead91") },
    { username: "SilkShadow", password: bcrypt.hashSync("SakuraFlow22") },
    { username: "NeoSteel", password: bcrypt.hashSync("KawaiiForce9") },
    { username: "HypeBeastHana", password: bcrypt.hashSync("BapeLife2023") },
    { username: "DigitalPhantom", password: bcrypt.hashSync("CyberZen9") },
    { username: "VelvetVandal", password: bcrypt.hashSync("NightNinja8") },
    { username: "ZenZero", password: bcrypt.hashSync("UrbanWave19") },
];

