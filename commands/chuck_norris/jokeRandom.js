const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke_random')
		.setDescription('Replies with a random Chuck Norris joke!'),

	async execute(interaction) {
		const apiUrl = 'https://api.chucknorris.io/jokes/random';
		
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			const joke = data.value.toString();
			await interaction.reply(joke);
		} catch (error) {
			console.error('Error:', error);
			await interaction.reply('Oops, something went wrong while getting the joke!');
		}
	},
};