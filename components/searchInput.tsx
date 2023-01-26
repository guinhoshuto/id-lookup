interface InputProps {
    onChange: (query: string) => void,
    searchId: (query: string) => void,
    placeholder: string,
    q: string
}

export default function SearchInput(props: InputProps){
    function handleOnChange(e: any){
        console.log(e)
        props.onChange(e)
    }

    return(
        <div className="flex gap-4">
            {/* <form onSubmit={props.searchId}> */}
                <input 
                    type="text" 
                    onChange={(e: any) => handleOnChange(e.target.value)}
                    placeholder={props.placeholder}
                    className="h-20 px-8 rounded"
                />
                {/* <input type="submit" value="Get Id" /> */}
                <button 
                    onClick={() => props.searchId(props.q)}
                    className="block px-8 bg-ok text-white border-solid border-1 h-20 rounded hover:bg-ok-hover"
                >
                    Get Id
                </button>

            {/* </form> */}
        </div>
    )
}