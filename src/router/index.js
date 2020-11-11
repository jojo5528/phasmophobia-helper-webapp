import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Evidence = () => import(/* webpackChunkName: "Evidence" */ '../views/Evidence.vue')
//const Guess = () => import(/* webpackChunkName: "Guess" */ '../views/Guess.vue')
//const GuessFunny = () => import(/* webpackChunkName: "GuessFunny" */ '../views/GuessFunny.vue')
const Credit = () => import(/* webpackChunkName: "Credit" */ '../views/Credit.vue')

const ChangeLog = () => import(/* webpackChunkName: "ChangeLog" */ '../views/ChangeLog.vue')
const GhostAnalyze = () => import(/* webpackChunkName: "GhostAnalyze" */ '../views/GhostAnalyze.vue')

const E404 = () => import(/* webpackChunkName: "404" */ '../views/404.vue')

const routes = [
	{
		path: '/',
		name: 'Evidence',
		component: Evidence
	},
	{
		path: '/ghost-analyze',
		name: 'GhostAnalyze',
		component: GhostAnalyze
	},
	{
		path: '/changelog',
		name: 'ChangeLog',
		component: ChangeLog
	},
	{
		path: '/credit',
		name: 'Credit',
		component: Credit
	},
	{
		path: '*',
		name: 'Error',
		component: E404,
	},
]

const router = new VueRouter({
	routes
})

export default router
