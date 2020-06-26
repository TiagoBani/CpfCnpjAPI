import microCors from 'micro-cors'
import { cpfsituation } from '@tiagobani/cpfsituation'

const CACHE_CONTROL_HEADER_VALUE = 'max-age=0, s-maxage=86400, stale-while-revalidate, public'
const cors = microCors()

async function getCptCnpj ({ req, res }) {
  res.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE)
  try {
    const { cpfCnpj } = req.query
    const results = await cpfsituation({ validate: [cpfCnpj] })

    res.statusCode = 200
    res.json({ ...results[0] || {} })
  } catch (err) {
    res.statusCode = 400
    res.json({ message: err.message })
  }
}

async function cptCnpj (req, res) {
  if (req.method === 'GET') await getCptCnpj({ req, res })
  res.status(405).end() // Method Not Allowed
}

export default cors(cptCnpj)
