// discord.js モジュールのインポート
// const Discord = require('discord.js');
import { Client } from 'discord.js';
const { exit } = require('process');


// python-shellモジュールのインポート
// var {PythonShell} = require('python-shell');

// .envの読み込み
require('dotenv').config();
const token = process.env.TOKEN;
// const channel_id = process.env.;
const test_channel_id = process.env.TEST_CHANNEL_ID;

// const {CHANNEL_ID} = process.env;


// Discord Clientのインスタンス作成
// const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const client = new Client();
// const message = new Discord.Message();

// // トークンの用意
// const TOKEN = '';
// const test_channel_id = '';

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

// Discordへの接続
client.login(token);
console.log(client.channels.cache.get(test_channel_id));

// client.channels.cache.get(test_channel_id);
// client.on('message', message => {
//     console.log(message.content);
// });

client.on('messageCreate', async msg => {
    if (msg.content === '!ping') {
        msg.channel.send('Pong!')
    }
})

