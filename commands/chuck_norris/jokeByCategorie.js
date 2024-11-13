const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke_by_categorie')
		.setDescription('Replies with Chuck Norris joke from a specific category.')
		.addStringOption(option => 
			option.setName('category')
				.setDescription('The category of the joke.')
				.addChoices(
					{ name: 'Animal', value: 'animal' },
					{ name: 'Career', value: 'career' },
					{ name: 'Celebrity', value: 'celebrity' },
					{ name: 'Dev', value: 'dev' },
					{ name: 'Explicit', value: 'explicit' },
					{ name: 'Fashion', value: 'fashion' },
					{ name: 'Food', value: 'food' },
					{ name: 'History', value: 'history' },
					{ name: 'Money', value: 'money' },
					{ name: 'Movie', value: 'movie' },
					{ name: 'Music', value: 'music' },
					{ name: 'Political', value: 'political' },
					{ name: 'Religion', value: 'religion' },
					{ name: 'Science', value: 'science' },
					{ name: 'Sport', value: 'sport' },
					{ name: 'Travel', value: 'travel' },
				)),

	async execute(interaction) {
		const category = interaction.options.getString('category');

		const apiUrl = 'https://api.chucknorris.io/jokes/random?category=' + category;
		
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