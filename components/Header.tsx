import Link from "next/link"

export default function Header(){
    return(
        <div className="w-full h-8 flex justify-between py-8 px-12 mb-32">
            <div>
                ID LOOKUP
            </div>
            <div className="flex gap-6">
                <Link href="/twitch">Twitch ID</Link>
                <Link href="/instagram">Instagram ID</Link>
            </div>
        </div>
    )
}