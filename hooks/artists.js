import { useState, useEffect } from 'react'
import { getToken } from './auth'

const api = ['get', 'post'].reduce((api, method) => {
  api[method] = async (url) => {
    const token = await getToken()

    if (!token) return null

    const uri = url.startsWith('/') ? `https://api.spotify.com${url}` : url

    const res = await fetch(uri, {
      credentials: 'omit',
      cache: 'force-cache',
      method: method.toUpperCase(),
      headers: { Authorization: `Bearer ${token}` }
    })

    return res.json()
  }

  return api
}, {})

const getImage = (artist) => {
  const img = artist.images.find(
    ({ width, height }) => width === height && width <= 500
  )
  return img && img.url
}

export const getArtists = () => {
  const [artists, setArtists] = useState(null)

  // GET all the paginated results
  const get = async (uri, items = []) => {
    const body = await api.get(uri)
    if (!body) return null
    if (body.artists.items) items.push(...body.artists.items)
    return body.artists.next ? get(body.artists.next, items) : items
  }

  // batched GET
  const batchRelated = async (ids, cb, batchSize = 10) => {
    const current = ids.slice(0, batchSize)
    const next = ids.slice(batchSize - 1)

    const results = await Promise.all(
      current.map((id) =>
        api.get(`/v1/artists/${id}/related-artists`).then((result) => ({
          id,
          ...result
        }))
      )
    )

    results.forEach(cb)

    if (next.length > 0) return batchRelated(next, cb, batchSize)
  }

  const load = async () => {
    const results = await get('/v1/me/following?type=artist&limit=50')
    if (!results) return null

    const ids = []

    const nodeSize = 2
    const nodes = results.map((artist) => {
      ids.push(artist.id)
      return {
        id: artist.id,
        size: nodeSize + nodeSize * 2 * (artist.popularity / 100),
        label: artist.name,
        image: getImage(artist),
        result: artist
      }
    })

    const edges = []

    await batchRelated(ids, ({ id, artists }) => {
      artists.forEach((artist) => {
        if (!ids.includes(artist.id)) return
        edges.push({
          id: `${id}-${artist.id}`,
          source: id,
          target: artist.id
        })
      })
    })

    setArtists({ nodes, edges })
  }

  useEffect(() => {
    load()
  }, [])

  return artists
}
