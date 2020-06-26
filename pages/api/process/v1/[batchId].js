import microCors from 'micro-cors'

const CACHE_CONTROL_HEADER_VALUE = 'max-age=0, s-maxage=86400, stale-while-revalidate, public'
const cors = microCors()

async function getBatch ({ req, res }) {
  res.setHeader('Cache-Control', CACHE_CONTROL_HEADER_VALUE)

  try {
    const { batchId } = req.query
    // const results = await cpfsituation({ validate: [cpfCnpj] })

    res.statusCode = 200
    res.json({ batchId })
  } catch (err) {
    res.statusCode = 400
    res.json({ message: err.message })
  }
}

async function batch (req, res) {
  if (req.method === 'GET') getBatch({ req, res })
  res.status(405).end() // Method Not Allowed
}

export default cors(batch)
