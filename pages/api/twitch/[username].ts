// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const url = 'https://api.twitch.tv/helix/users?login=';
export let twitchReq = axios.create({
  headers: {
    Authorization: process.env.TWITCH_TOKEN,
    'Client-Id': process.env.TWITCH_CLIENT_ID
  },
}) 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // console.log(req.body.username)
  // if(req.method === 'POST'){
  //   try {
  //     const username = await twitchReq.get(url + req.body.username)
  //     console.log(username.data)
  //     res.status(200).json( username.data.data[0])
  //   } catch(e) {
  //     console.log(e)
  //     res.status(500).json({'msg': e})
  //   }
  // } else {
    const query = req.query
    console.log(query)
    try {
      // const username = await axios.get(url+query.username, headers)
      // console.log(headers.headers)
      const username = await twitchReq.get(url+query.username)
      // const username = await axios.get('https://api.feras.club/team/search/' + query.username)
      console.log(username.data.data[0])
      console.log(url+query.username)
      res.status(200).json( username.data.data[0])
    // res.status(405).json({ msg: req.method })
    } catch(e){
      console.log(e)
      res.status(500).json({'msg': e})
    }
  // }

}