import axios from "axios"

const vietnamese = "vn_VN"

const getLolChampionData = async (championName) => {
    const championInfo = 
    await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.21.1/data/${vietnamese}/champion/${championName}.json`)
    .then(result =>{
        const champData = result.data.data
        const champion = Object.entries(champData)

       return champion[0][1] //an object
        
    })
    .catch(err=> {
        console.log(err)
    })

    return championInfo
}

export default getLolChampionData