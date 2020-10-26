const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
require('dotenv').config();

const client = new Discord.Client();

const prefix = '!';

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === 'sum') {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  } else if (command === 'reminder') {
    const job = new CronJob('0 0 19 * * 1', function() {
      message.channel.send('@everyone Guys main yuk!');
    }, null, true, 'Asia/Jakarta');
    job.start();
  }

});

client.login(process.env.BOT_TOKEN);