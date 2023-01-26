import axios from 'axios'

export let api = axios.create({
    baseURL: 'https://id-lookup.nichijou.club/api'
    // baseURL: 'http://localhost:3000/api'
}) 