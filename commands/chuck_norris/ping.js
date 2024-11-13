const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the latency and a Chuck Norris joke!'),
    async execute(interaction) {
        const start = Date.now();
        const apiUrl = 'https://api.chucknorris.io/jokes/random';
        let latency
        try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
            latency = Date.now() - start;
		} catch (error) {
			console.error('Error:', error);
			await interaction.reply('Oops, something went wrong while getting the joke!');
		}

        // Send the latency and the joke
        await interaction.reply(`Pong! Latency: ${latency}ms`);
    },
};