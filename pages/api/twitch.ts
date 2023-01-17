// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const url = 'https://api.twitch.tv/helix/users?login=';

export const headers = {
  headers: {
    Authorization: process.env.TWITCH_TOKEN,
    'Client-Id': process.env.TWITCH_CLIENT_ID,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'POST'){
    const username = await axios.get(url + req.body.username, headers)
    res.status(200).json( username.data.data[0] )
  } else {
    res.status(405).json({ msg: 'VISH' })
  }

}