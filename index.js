const fs = require("fs");
let os = require("os");
const {
	Client
} = require("discord.js");
const {
	red,
	yellow,
	greenBright,
	yellowBright
} = require("chalk");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});
var colors = require("colors");
const client = new Client();
const {
	token,
} = require("./config.json");

function getRandomLine(filename) {
	var data = fs.readFileSync(filename, "utf8");
	var lines = data.split('\n');
	return lines[Math.floor(Math.random() * lines.length)];
}
var message = getRandomLine('Reqs/frases.txt');
var servidor = getRandomLine('Reqs/servidores.txt');
 
console.log(`


           ██████╗ ██╗██╗   ██╗
           ██╔══██╗██║██║   ██║
           ██║  ██║██║██║   ██║
           ██║  ██║██║╚██╗ ██╔╝
           ██████╔╝██║ ╚████╔╝ 
           ╚═════╝ ╚═╝  ╚═══╝  
            
            


`.magenta);
client.on("ready", () => {
	process.title = `SaiberDiv`;
	client.user.setActivity({
		name: "Good Div",
		type: "STREAMING",
		url: "https://www.twitch.tv/polarlofy"
	});
});
readline.question("            [!] ID do servidor: ".magenta, response => {
	console.log("");
	ids(response).then(() => {
		console.log(greenBright("            [!] Carregando dados".green));
		setTimeout(() => {
			GoodDiv(null, `${message}\n${servidor}`).catch(err => {
				console.log(err);
				setTimeout(() => {
					console.log(yellow("            [!] Aviso: reiniciando.".yellow));
				}, 1000);
				setTimeout(() => {
					process.exit(1);
				}, 2000);
			});
		}, 2000);
	});
});
async function ids(guildID) {
	client.guilds.fetch(guildID).then(guild => {
		const file = "./Reqs/pessoas.json";
		const membros = guild.members.cache.map(users => users.id);
		console.log(yellowBright("            [!] " + membros.length + " ID de usuários anotados".yellow));
		const Data = {
			IDs: membros
		};
		const content = JSON.stringify(Data, null, 2);
		fs.writeFileSync(file, content, err => {
			if(err) return console.log(red("            [X] Erro ao gravar o arquivo: " + err));
			console.log(greenBright("            [V] Arquivo gravado com sucesso ".red + file));
		});
	}).catch(err => {
		console.log(`            [X] Id do servidor esta invalido`.red);
		setTimeout(() => {
			console.log(yellow("            [!] Aviso Reiniciando.".yellow));
		}, 1000);
		setTimeout(() => {
			process.exit(1);
		}, 2000);
	});
}

function GoodDiv(users, msg) {
	return new Promise((resolve, reject) => {
		const scraped = require("./Reqs/pessoas.json");
		users = scraped.IDs;
		for(let i = 0; i <= users.length; i++) {
			client.users.fetch(users[i]).then(u => {
				u.send(msg).then(() => console.log(greenBright("            [R] Mensagem enviada para: ".green + u.tag.yellow))).catch(err => console.log(red("            [X] Erro ao enviar mensagem para: ".red + u.tag.yellow)));
			}).catch(err => console.log(red(`            [X] Verificando problemas no bot.\n            Erro encontrado: ${err}\n`)));
		}
		resolve();
	});
}

client.login(token).catch(err => {("Token Invalido ;-;")});
