const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke_categories')
		.setDescription('Return all categories of Chuck Norris jokes.'),

	async execute(interaction) {
		const apiUrl = 'https://api.chucknorris.io/jokes/categories';
	
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
			    throw new Error('Network response was not ok');
			}
			const data = await response.json();
			const categories = data.join(', '); // Convert data array to a comma-separated string
            await interaction.reply(`The available Chuck Norris joke categories are:\n${categories}`);
		} catch (error) {
			console.error('Error:', error);
			await interaction.reply('Oops, something went wrong while getting the jokes categories!');
		}
	},
};