interface resultData {
    id: string
}

export default function Result(props: resultData){
    return(
        <div>
            {props.id}
        </div>
    )
}