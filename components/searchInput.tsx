interface InputProps {
    onChange: (query: string) => void,
    searchId: (query: string) => void
    q: string
}

export default function SearchInput(props: InputProps){
    function handleOnChange(e: any){
        console.log(e)
        props.onChange(e)
    }

    return(
        <div>
            {/* <form onSubmit={props.searchId}> */}
                <input 
                    type="text" 
                    onChange={(e: any) => handleOnChange(e.target.value)}
                />
                {/* <input type="submit" value="Get Id" /> */}
                <button onClick={() => props.searchId(props.q)}>Get Id</button>

            {/* </form> */}
        </div>
    )
}