<template>
	<el-row>
	    <el-col :span="12" :offset="6">
	    	<el-switch @change="turn" v-model="turnon"></el-switch>
	    	
	    	<ScanRandom :listEmailRandom="listEmail"/>
		</el-col>
	</el-row>
</template>
<script>
	import ScanRandom from '~/components/ScanRandom.vue';
	export default {
		components:{ScanRandom},
		data(){
			return {
				turnon:false
			}
		},
		created:async function(){
			let {data} = await this.$axios.get('http://www.vutienanh.cf/api/status');
			return this.turnon = data[0].status;
		},
		mounted:async function(){
			let _ = this;
			setInterval(async function(){
				let {data} = await _.$axios.get('http://www.vutienanh.cf/api/scan');
				_.listEmail = data;
			},1000)
		},
		methods:{
			async turn(){
			    await this.$axios.post('http://www.vutienanh.cf/api/email/autoscan',{turnon:this.turnon});	
			}
		},
		async asyncData({$axios}){
			let {data} = await $axios.get('http://www.vutienanh.cf/api/scan');
			return {
				listEmail:data
			}
		}
	}
</script>