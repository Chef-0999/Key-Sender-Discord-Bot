const Discord = require("discord.js");

const client = new Discord.Client();


// Discord Bot Token
const discordToken = "";

// Enter the Name of Role That Gives Permission to Use
const roleName = "";

// Enter the ID of Which The Bot Will Be Operated In
const serverId = "";

// List of Keys the Bot Will Save To While Running
const keys = [];

// Bot Command Prefix
const prefix = "?";

client.on("ready", () => {
  console.log(`Online`);
});

client.on("message", (message) => {
  let input = message.content;
  input = input.slice(prefix.length).trim().split(/ +/g);

  switch (input[0]) {
    case "add":
      if (message.guild == null) {
        message.reply("Please use this command in a server");
      } else {
        if (message.member.roles.cache.find((r) => r.name === roleName)) {
          let keysToAdd = input;
          keysToAdd.splice(0, 1);
          keysToAdd.forEach((key) => {
            keys.push(key);
            message.reply(`Key ${key} Added.`);
          });
        } else {
          message.reply("You don't have permission to use that command!");
        }
      }
      break;
    case "remove":
      if (message.guild == null) {
        message.reply("Please use this command in a server");
      } else {
        if (message.member.roles.cache.find((r) => r.name === roleName)) {
          let keyPosition = keys.findIndex((key) => input[0] === key);
          keys.splice(keyPosition, 1);
          message.reply(`Key ${input[1]} Removed.`);
        } else {
          message.reply("You don't have permission to use that command!");
        }
      }
      break;
    case "removeall":
      if (message.guild == null) {
        message.reply("Please use this command in a server");
      } else {
        keys.splice(0, keys.length);
        message.reply("All keys have been removed.");
      }
      break;
    case "dmkey":
      if (message.guild == null) {
        message.reply("Please use this command in a server");
      } else {
        if (message.member.roles.cache.find((r) => r.name === roleName)) {
          if (keys.length > 0) {
            let usersToSend = input;
            usersToSend.splice(0, 1);
            usersToSend.forEach(async (user) => {
              let keyNumber = randomNumber(0, keys.length - 1);
              try {
                let lp = await client.users.fetch(user)
                lp.send(`Your Stoke Bot key is: ${keys[keyNumber]}`);
                message.reply(`Key: ${keys[keyNumber]} sent successfully to ${lp.username}`)
              } catch (err) {
                message.reply("Failed to send key to user");
                console.log(err);
              }
            });
          } else {
            message.reply("please add a key first using ?add");
          }
        } else {
          message.reply("You don't have permission to use that command!");
        }
      }
      break;
  }
});

function randomNumber(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
client.login(discordToken);
