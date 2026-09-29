const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, 'public')));

const NAIPES = ['♣', '♥', '♠', '♦'];
const VALORES = ['4','5','6','7','Q','J','K','A','2','3'];
const PASSOS_TRUCO = [1, 3, 6, 12];

function criarBaralho() {
  let b = [];
  for (let v of VALORES)
    for (let n of NAIPES)
      b.push({valor:v, naipe:n, carta:v+n});
  return b.sort(() => Math.random() - 0.5);
}

function forcaCarta(carta, vira) {
  const idxVira = VALORES.indexOf(vira.valor);
  const manilha = VALORES[(idxVira + 1) % 10];
  if (carta.valor === manilha) {
    const ordem = {'♦':11, '♠':12, '♥':13, '♣':14};
    return ordem[carta.naipe];
  }
  return VALORES.indexOf(carta.valor);
}
