import axios from 'axios'
import { useState } from "react";
import TagManager from 'react-gtm-module';
import Header from '../components/Header';
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
        TagManager.dataLayer({
            dataLayer: {
                event: 'twitchSearchID',
                username: query   
            }
        })
        await fetch(`/api/twitch/${query}`)
        .then(response => response.json())
        .then(data => {
            setId(data.id)
            console.log(id)
        })
    }
    return (
        <div>
            <Header />
            <div className="flex flex-col items-center text-3xl font-bold p-8">
                <h1>TWITCH ID LOOKUP</h1>
                <h2 className="text-[#A8A29E] text-base">Find any Twitch Account ID by username</h2>
                <div className="m-16">
                    <SearchInput onChange={handleOnChange} searchId={getId} q={''} placeholder="twitch username"/>
                    <Result id={id}/>
                </div>
            </div>
        </div>
    )
}