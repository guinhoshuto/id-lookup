import axios from 'axios'
import { useState } from "react";
import Result from "../components/result"
import SearchInput from "../components/searchInput";

export default function Twitch(){
    const [id, setId] = useState<string>('');
    const [query, setQuery] = useState<string>('')

    function handleOnChange(q: string){
        setQuery(q)
        console.log(query)
    }

    async function getId(){
        console.log('buscar: ', query)
        const idRequest = await axios.post(`http://localhost:3000/api/twitch`, {username: query})
        console.log(idRequest)
        setId(idRequest.data.id)
        console.log(id)
    }
    return (
        <div className="mx-10">
            <SearchInput onChange={handleOnChange} searchId={getId} q={''}/>
            <Result id={id}/>
        </div>
    )
}