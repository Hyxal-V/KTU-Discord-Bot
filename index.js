import { Client, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv';
import getData from './modules/headless.js'
import storage from 'node-persist'
storage.init();
dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, readyClient => {
  const guild = client.guilds.cache.first(); 
  if(!guild){
	console.log(`bot not in any server`);
    
  }
  else{
    const channel = guild.channels.cache.find(ch => ch.name === process.env.CHANNEL); 
    console.log(channel)
    if(channel){
         setInterval(()=>{
    getData().then(data =>{
      if(data){
        for (var i=data.length-1;i>=0;i--){
          channel.send(`**${data[i]}**`)
        }
      }
      
    })
    },100000)

    }

  }
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);