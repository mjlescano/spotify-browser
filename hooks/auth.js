import qs from 'query-string'
import { useState, useEffect } from 'react'
import localforage from 'localforage'
import Router from 'next/router'

const tokenStore = localforage.createInstance({
  name: 'token'
})

export const getToken = async () => {
  const token = await tokenStore.getItem('token')
  if (!token) Router.replace('/authorize')
  return token
}

export const requireToken = () => {
  const [token, setToken] = useState(null)

  const load = async () => {
    const value = await getToken()
    if (value) setToken(value)
  }

  useEffect(() => {
    load()
  })

  return token
}

export const loadTokenFromHash = () => {
  const [isLoading, setLoading] = useState(true)

  const loadToken = async () => {
    if (typeof window === 'undefined') return
    if (!window.location.hash) return setLoading(false)

    const query = qs.parse(window.location.hash)

    if (query.error) {
      console.error(query) // eslint-disable-line no-console

      if (query.error === 'access_denied') {
        alert('You have to grant permissions to use Spotify Browser')
      }

      return Router.replace('/authorize')
    }

    if (query.access_token) {
      await tokenStore.setItem('token', query.access_token)
      return Router.replace('/')
    }
  }

  useEffect(() => {
    loadToken()
  })

  return isLoading
}
