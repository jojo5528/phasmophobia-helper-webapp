<template>
	<div id="app">

		<v-app>
			<v-system-bar height="80" color="blue accent-2" dark app>
				<v-btn color="primary" rounded dark x-large @click="navToggle=!navToggle">
					<v-icon x-large dark>mdi-menu</v-icon> MENU
				</v-btn>

				<v-spacer></v-spacer>
				<v-btn color="primary" rounded dark x-large link href="https://discord.gg/8jR7rV86Kj" target="_blank">
					<v-icon large color="white">mdi-discord</v-icon> Group [TH]
				</v-btn>
			</v-system-bar>

			<v-navigation-drawer v-model="navToggle" app>
				<v-sheet color="grey lighten-4" class="pa-4">
					<v-avatar class="mb-4" color="grey darken-1" size="64">
						<img src="https://devkurov.in.th/manifest/android-icon-192x192.png" alt="John">
					</v-avatar>
					<p>
						Powered by DEVKUROV<br>
						<pre class="rounded pa-2 light-blue darken-4 white--text"><v-icon dark>mdi-discord</v-icon> DevKurov#9108</pre>
					</p>

					<hr class="my-3">

					<p class="text-caption">
						App v.1.0.1 | Nov 11st dev<br>
						Phasmophobia EA v.0.176.39<br>
						November 4th Update<br>
						<a href="https://github.com/jojo5528/phasmophobia-helper-webapp" target="_blank">
							Github Release
						</a>
					</p>
				</v-sheet>

				<v-divider></v-divider>

				<v-list>
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
			links: [
				['mdi-home-search', 'Evidence', '/'],
				['mdi-brain', 'Ghost Analyze', '/ghost-analyze'],
				['mdi-code-array', 'Change Log', '/changelog'],
				['mdi-information', 'Credit', '/credit'],
			],
		}
	},
}
</script>