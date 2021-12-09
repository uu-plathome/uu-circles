// discord.js モジュールのインポート
const Discord = require('discord.js');
const client = new Discord.Client();

// import { Channel, Client } from 'discord.js';
const { exit } = require('process');

/* python-shellモジュールのインポート */
var {PythonShell} = require('python-shell');
var pyshell = new PythonShell('create_text.py', {mode : 'text'})

pyshell.send("");

pyshell.on('message', function(data){
    console.log(data);
})

/* .envの読み込み */
require('dotenv').config();
// bot自体のtoken
const token = process.env.TOKEN;
// 本番チャンネル
// const channel_id = process.env.;
// testチャンネル
const test_channel_id = process.env.TEST_CHANNEL_ID;

/* Discordへの接続 */
client.login(token);

/* 起動時の処理 */
client.on('ready', () => {
    // 起動するとconsoleにready...と表示される
    console.log('ready...');
    // チャンネルにメッセージを送信
    client.channels.cache.get(process.env.TEST_CHANNEL_ID).send('!');
});

