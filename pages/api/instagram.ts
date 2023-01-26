// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const url = 'https://graph.facebook.com/v15.0/' + process.env.FACEBOOK_ID;

//  "fields=business_discovery.username(alok)%7Bid%2Cprofile_picture_url%2Cname%2Cwebsite%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cmedia.fields(like_count%2Ccomments_count%2Cmedia_url%2Cmedia_type%2Ctimestamp)%7D&access_token="

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'POST'){
    try{ 
      console.log('entrou')
      const response = await axios.get(`${url}?fields=business_discovery.username(${req.body.params})%7Bid%2Cprofile_picture_url%2Cname%2Cwebsite%2Cfollowers_count%2Cfollows_count%2Cmedia_count%2Cmedia.fields(like_count%2Ccomments_count%2Cmedia_url%2Cmedia_type%2Ctimestamp)%7D&access_token=${process.env.FACEBOOK_TOKEN}`)
      console.log(response)
      res.status(200).json(response.data)
    } catch(e){
      res.status(500).json(e)
    }
  } else {
    res.status(405).json({ 'method': req.method })
  }
  
}