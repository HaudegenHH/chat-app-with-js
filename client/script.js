import { io } from 'socket.io-client'

const joinRoomButton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const form = document.getElementById('form')

// listen to events coming from the server
const socket = io('http://localhost:3000')

socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)
  
  // sending events (any event you want) from client and sends 
  // whatever data you want to the server
  // ..and on the server (server.js) we jst have to listen for that event
  //socket.emit('custom-event', 10, 'Hi', {a: 'aa'})
})

socket.on('receive-msg', msg => {
  displayMessage(msg)
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value
 
  if (message === "") return
  
  displayMessage(message)
  socket.emit('send-msg', message, room)

  messageInput.value = ""
})

joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value
})
 
function displayMessage(message) {
  const div = document.createElement('div')
  div.textContent = message
  document.getElementById('message-container').append(div)
}