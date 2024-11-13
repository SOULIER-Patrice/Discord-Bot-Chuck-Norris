const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke_by_id')
		.setDescription('Return the Chuck Norris joke for a given Id.')
		.addStringOption(option => 
			option.setName('id')
				.setDescription('The Id of the joke.')),

	async execute(interaction) {
		const id = interaction.options.getString('id');

		const apiUrl = 'https://api.chucknorris.io/jokes/' + id;
		
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			const joke = data.value.toString();
			console.log(joke)
			await interaction.reply(joke);
		} catch (error) {
			console.error('Error:', error);
			await interaction.reply('Oops, something went wrong while getting the joke!');
		}
	},
};