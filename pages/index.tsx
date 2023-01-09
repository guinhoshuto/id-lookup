import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='p-8'>
      <h1 className="text-4xl">ID LOOKUP</h1>
    </div>
  )
}
