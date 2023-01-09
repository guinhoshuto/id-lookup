interface resultData {
    id: string
}

export default function Result(props: resultData){
    return(
        <div className="text-center m-8">
            121212442
            {props.id}
        </div>
    )
}