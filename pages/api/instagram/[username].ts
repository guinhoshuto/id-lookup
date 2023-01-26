// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const url = 'https://graph.facebook.com/v15.0/' + process.env.FACEBOOK_ID;

//  "fields=business_discovery.username(alok)%7Bid%2Cprofile_picture_url%2Cname%2Cwebsite%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cmedia.fields(like_count%2Ccomments_count%2Cmedia_url%2Cmedia_type%2Ctimestamp)%7D&access_token="

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    console.log(req.query.username)
    const response = await axios.get(`${url}?fields=business_discovery.username(${req.query.username})%7Bid%2Cprofile_picture_url%2Cname%2Cwebsite%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cmedia.fields(like_count%2Ccomments_count%2Cmedia_url%2Cmedia_type%2Ctimestamp)%7D&access_token=${process.env.FACEBOOK_TOKEN}`)
    console.log(response.data)
    res.status(200).json(response.data)
}