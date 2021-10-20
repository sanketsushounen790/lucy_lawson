import getCountriesData from "../../actions/fetch_apis/getCountriesData.js"

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const nuoc = {
    name: "nuoc",
    topic: "others_genesis",
    commandFormat : "`!nuoc [tên quốc gia] :`",
    description: `*Bot đưa thông tin cơ bản của nước cần tìm.*`,
    args: true,
    authorized: "user",
    execute(message, args) {
        const countryName = args[0].toLowerCase()

        getCountriesData(countryName).then(result => {
            console.log(result)
            const countryInfo = result[0]
            const flagIcon = `:flag_${result[0]["alpha2Code"].toLowerCase()}:`


            const countryDataEmbed = {
                color: 0x009ff,
                title: `${countryInfo["name"]["vn"]} ${flagIcon}`,
                url: 'https://discord.js.org',
                /* author: {
                  name: 'Some name',
                  icon_url: "",
                  url: 'https://discord.js.org',
                }, */
                description: 'Some description here',
                /* thumbnail: {
                  url: 'https://i.imgur.com/wSTFkRM.png',
                }, */
                fields: [
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false,
                    },
                    {
                        name: "Thủ đô:",
                        value: `${countryInfo["capital"]}`,
                        inline: true
                    },
                    {
                        name: "Dân số:",
                        value: `${numberWithCommas(countryInfo["population"])}`,
                        inline: true
                    },
                    {
                        name: "Diện tích:",
                        value: `${numberWithCommas(countryInfo["area"])} km²`,
                        inline: true
                    },
                    {
                        name: "Châu lục:",
                        value: `${countryInfo["region"]}`,
                        inline: true
                    },
                    {
                        name: "Khu vực:",
                        value: `${countryInfo["subregion"]}`,
                        inline: true
                    },
                    {
                        name: "Tiền tệ:",
                        value: `${countryInfo["currencies"][0]["symbol"]} - ${countryInfo["currencies"][0]["code"]}`,
                        inline: true
                    },
                    {
                        name: "Top tên miền:",
                        value: `${countryInfo["topLevelDomain"][0]}`,
                        inline: true
                    },
                ],
                image: {
                    url: 'https://i.imgur.com/wSTFkRM.png',
                },
                timestamp: new Date(),
                footer: {
                    text: 'Some footer text here',
                    icon_url: 'https://i.imgur.com/wSTFkRM.png',
                },
            };

            message.channel.send({ embed: countryDataEmbed })


        })
            .catch(err => {
                console.log(err)
                message.channel.send("Sai cú pháp hoặc nhập không chính xác tên nước rồi !")
            })
    },
}

export default nuoc