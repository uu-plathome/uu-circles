import Pusher from 'pusher-js'

const PUSHER_KEY = 'a9b069e2da6cbb2a3766'
const channelName = 'page-position-channel'

export const pusher = new Pusher(PUSHER_KEY, {
  cluster: 'ap3',
})

export const pagePositionChannel = pusher.subscribe(channelName)
