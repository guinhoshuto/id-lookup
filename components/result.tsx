interface resultData {
    id: string
}

export default function Result(props: resultData){
    return(
        <div className="text-center m-8">
            {props.id}
        </div>
    )
}