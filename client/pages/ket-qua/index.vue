<template>
	<el-row>
		<el-col :span="20" :offset="2">
			<el-row>
				<el-col justify="right">
					Danh sách kết quả quét THÀNH CÔNG {{count}} kết quả !

					<el-popconfirm title="Giữ lại dữ liệu sau khi tải xuống?" @onCancel="onCancel" @onConfirm="onConfirm" confirmButtonText='Đồng ý' cancelButtonText='Xóa' icon="el-icon-info" iconColor="red">

						<el-button slot="reference" style="float:right" justify="right" type="" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Tải về {{count}} Email</el-button>
					</el-popconfirm>
					<el-dropdown @command="filterDomain" style="float:right;margin-right: 10px" split-button type="" size="small" >
						{{title}}
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="all">Tất Cả</el-dropdown-item>
							<el-dropdown-item command="@hotmail.com">@hotmail.com</el-dropdown-item>
							<el-dropdown-item command="@hotmail.es">@hotmail.es</el-dropdown-item>
							
							<el-dropdown-item command="@hotmail.fr">@hotmail.fr</el-dropdown-item>

							<el-dropdown-item command="@hotmail.co.uk">@hotmail.co.uk</el-dropdown-item>
							<el-dropdown-item command="@hotmail.ca">@hotmail.ca</el-dropdown-item>
							<el-dropdown-item command="@outlook.com">@outlook.com</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					
					
				</el-col>
			</el-row>
			
			<Result :data="data"/>
			<br>
			<el-pagination @current-change="loadMore" :total="count" :page-size="30" :pager-count="11" prev-text="" next-text="" :hide-on-single-page="false" background layout="prev, pager, next"></el-pagination>
			
		</el-col>
	</el-row>
</template>
<script>
	import Result from '~/components/Result.vue';
	export default {
		components:{Result},
		data(){
			return {
				data:[],
				count:0,
				command:'',
				title:'Phân Loại',
				hold:true
			}
		},
		created:async function(){
			await this.loadData();
			await this.loadFull();

		},
		methods:{
			async filterDomain(command){
				if(command === 'all') {
					this.title = 'Phân Loại';
					this.command = command = '';
					
				}else{
					this.title = command;
					this.command = command;
				}
				await this.loadFull(command);
				await this.loadData();
			},
			loadFull:async function(command = ''){
				let {data} = await this.$axios.get('http://www.vutienanh.cf/api/result?limit=10000000000&where={"email":{"contains":"'+command+'"}}');
				return this.count = data.length;
			},
			loadData:async function(pagination = 1){

				let {data} = await this.$axios.get('http://www.vutienanh.cf/api/result?limit=30&where={"email":{"contains":"'+this.command+'"}}&skip='+(30*(pagination-1)));
				return this.data = data;
			},
			
			async onCancel(){
				this.download(false);
				this.data = [];
			},
			async onConfirm(){
				this.download(true)
			},
			async loadMore(index){
				await this.loadData(parseInt(index));
			},
			




			forceFileDownload(response){
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url;
				link.setAttribute('download', 'file.txt') //or any other extension
				document.body.appendChild(link)
				link.click()
			},


			download(hold){
				this.$axios({
					method: 'post',
					url: 'http://www.vutienanh.cf/api/email/download',
					data:{domain:this.command,hold},
					responseType: 'arraybuffer'
				})
				.then(response => {

					this.forceFileDownload(response)

				})
			}
		}






		}
	</script>
	<style scoped>

</style>