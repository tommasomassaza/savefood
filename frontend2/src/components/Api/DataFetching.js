import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetching(){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8080/api/boxes")
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return (
        <div>

        </div>
    )
}

export default DataFetching