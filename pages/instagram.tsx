
import axios from 'axios'
import { useState } from "react";
import TagManager from 'react-gtm-module';
import Result from "../components/result"
import SearchInput from "../components/searchInput";

export default function Instagram(){
    const [id, setId] = useState<string>('');
    const [query, setQuery] = useState<string>('')

    function handleOnChange(q: string){
        setQuery(q)
        console.log(query)
    }

    async function getId(){
        console.log('buscar: ', query)
        TagManager.dataLayer({
            dataLayer: {
                event: 'instagramSearchID',
                username: query   
            }
        })
        const idRequest = await axios.post(`/api/instagram`, {username: query})
        console.log(idRequest)
        setId(idRequest.data.id)
        console.log(id)
    }
    return (
        <div className="flex flex-col items-center text-3xl font-bold p-8">
            <h1>INSTAGRAM ID LOOKUP</h1>
            <div className="m-16">
                <SearchInput onChange={handleOnChange} searchId={getId} q={''} placeholder="instagram username"/>
                <Result id={id}/>
            </div>
        </div>
    )
}