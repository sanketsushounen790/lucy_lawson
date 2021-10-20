import fetch from "node-fetch"

const getPhotosData = (query) => {
    return fetch(`https://api.unsplash.com/search/photos?client_id=9enaZ4xe7ObvO-c3HRr-L7eumXXpzcmpJzrBcOk0nno&query=${query}&per_page=48`)
    .then(res => res.json())
    .then(data => {
        /* console.log(data) */
        let results = data["results"]
        let imageSrcs = []
        
        for(var i=0; i<results.length; i++){
            imageSrcs.push(
                {
                    url: results[i]["urls"]["regular"],
                    title: results[i]["alt_description"]
                }
            )
        }   
        /* console.log(imageSrcs.slice(0, 10)) */
        return imageSrcs.slice(0, 15)
    })
    .catch(error =>{
        console.log(error)
    })
}



export default getPhotosData