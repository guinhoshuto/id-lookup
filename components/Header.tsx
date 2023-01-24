export default function Header(){
    return(
        <div className="w-full h-8 flex justify-between py-8 px-12 mb-8 ">
            <div>
                ID LOOKUP
            </div>
            <div className="flex gap-6">
                <a href="/twitch">Twitch ID</a>
                <a href="/instagram">Instagram ID</a>
            </div>
        </div>
    )
}