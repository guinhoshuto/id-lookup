import { Inter } from '@next/font/google'
import Twitch from './twitch'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Twitch />
  )
}
