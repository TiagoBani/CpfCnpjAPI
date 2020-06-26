import microCors from 'micro-cors'
import { cpfsituation } from '@tiagobani/cpfsituation'

const cors = microCors()

async function postBatch ({ req, res }) {
  try {
    const { validate } = req.body
    const results = await cpfsituation({ validate })

    res.statusCode = 200
    res.json(results)
  } catch (err) {
    res.statusCode = 400
    res.json({ message: err.message })
  }
}

async function batch (req, res) {
  if (req.method === 'POST') await postBatch({ req, res })
  res.status(405).end() // Method Not Allowed
}

export default cors(batch)
