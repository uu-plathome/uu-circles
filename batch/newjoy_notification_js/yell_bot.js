// discord.js モジュールのインポート
const Discord = require('discord.js');
const { exit } = require('process');

// python-shellモジュールのインポート
// var {PythonShell} = require('python-shell');

// .envの読み込み
// require('dotenv').config();
// const {TOKEN} = process.env;
// const {CHANNEL_ID} = process.env;
// const {TEST_CHANNEL_ID} = process.env;

// const {CHANNEL_ID} = process.env;


// Discord Clientのインスタンス作成
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
// const message = new Discord.Message();

// トークンの用意
const token = 'ODE5MTc2MDM2NjY2MTc5NjM1.YEizIg.PTeHvrW8XWp8O0tb0cGopBVbrPg';
const test_channel_id = '819800457555738654';

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

// Discordへの接続
client.login(token);
console.log(client.channels.cache.get(test_channel_id));

client.channels.cache.get(test_channel_id);
client.on('message', message => {
    console.log(message.content);
});

