<template>
	<div id="app">

		<v-app :dark="darkMode" :light="!darkMode">
			<v-system-bar height="80" :color="darkMode ? 'blue darken-3' : 'blue accent-2'" app :dark="darkMode">
				<v-btn :color="darkMode ? 'black' : 'blue lighten-2'" rounded x-large @click="navToggle=!navToggle">
					<v-icon x-large>mdi-menu</v-icon> MENU
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn :color="darkMode ? 'black' : 'blue lighten-2'" rounded x-large link href="https://discord.gg/8jR7rV86Kj" target="_blank">
					<v-icon large color="white">mdi-discord</v-icon> Group [TH]
				</v-btn>
			</v-system-bar>

			<v-navigation-drawer v-model="navToggle" app :dark="darkMode">
				<v-sheet :color="darkMode ? 'grey darken-3' : 'grey lighten-4'" class="pa-4">
					<v-avatar class="mb-4" color="grey darken-1" size="64">
						<img src="https://devkurov.in.th/manifest/android-icon-192x192.png" alt="John">
					</v-avatar>
					<p>
						Powered by DEVKUROV<br>
						<pre
							class="rounded pa-2 font-weight-bold"
							:class="darkMode ? 'blue darken-3' : 'blue accent-2'"
						><v-icon large class="mr-3" dark>mdi-discord</v-icon>DevKurov#9108</pre>
					</p>

					<hr class="my-3">

					<p class="text-caption">
						{{ VersionText }}<br>
						{{ GameText }}<br>
						{{ GameDevText }}<br>
						<a :href="GithubURL" target="_blank" class="blue--text">
							Github Release
						</a>
					</p>
				</v-sheet>

				<v-divider></v-divider>

				<v-list>
					<v-list-item @click="toggleDark">
						<v-list-item-icon>
							<v-icon large>{{ darkMode ? 'mdi-eye-circle-outline' : 'mdi-eye-circle' }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>Switch to {{ darkMode ? 'LIGHT' : 'DARK' }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
						<v-list-item-icon>
							<v-icon large>{{ icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>

			<v-main>
				<v-container class="py-8 px-6" fluid>
					<router-view/>
				</v-container>
			</v-main>
		</v-app>

	</div>
</template>

<script>
import './sass/variables.scss';
export default {
	data(){
		return{
			navToggle: null,
			darkMode: true,
			links: [
				['mdi-home-search', 'Evidence', '/'],
				['mdi-brain', 'Ghost Analyze', '/ghost-analyze'],
				['mdi-code-array', 'Change Log', '/changelog'],
				['mdi-information', 'Credit', '/credit'],
			],
			VersionText: 'App v.1.0.2 | Nov 12nd dev',
			GameText : 'Phasmophobia EA v.0.176.39',
			GameDevText: 'November 4th Update',
			GithubURL: 'https://github.com/jojo5528/phasmophobia-helper-webapp',
		}
	},
	methods:{
		toggleDark(){
			this.darkMode = !this.darkMode;
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		},
	},
	mounted(){
		this.$vuetify.theme.dark = this.darkMode;
	},
}
</script>