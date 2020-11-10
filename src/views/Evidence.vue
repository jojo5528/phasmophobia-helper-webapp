<template>
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-text class="pt-0">
					<v-row>
						<v-col cols="6" md="4" v-for="evd in evidenceData" :key="evd.id">
							<v-checkbox
								v-model="proofSelect"
								:label="evd.text"
								:value="evd.id"
								hide-details
							></v-checkbox>
						</v-col>
					</v-row>

					<hr class="my-5">

					<v-simple-table>
						<template>
							<thead>
								<tr>
									<th class="text-center">Ghost Name</th>
									<th class="text-center black--text font-weight-black text-subtitle-1"
										v-for="evd in evidenceCompute" :key="evd.id">
										{{ evd.text }}
									</th>
								</tr>
							</thead>
							<tbody class="text-center">
								<tr v-if="!ghostCompute.length">
									<td colspan="7" class="text-center red--text">
										<h3>ERROR: NO DATA</h3>
										<hr>
										<h3>ผิดพลาด: ไม่มีข้อมูล</h3>
									</td>
								</tr>

								<tr v-for="([ghost, evidence], idx) in ghostCompute" :key="idx">
									<td class="text-left text-uppercase black--text font-weight-black text-subtitle-1">{{ ghost }}</td>
									<td v-for="evd in evidenceCompute" :key="evd.id">
										<v-icon v-if="evidence.includes(evd.id)" large color="green darken-2">mdi-check-bold</v-icon>
										<v-icon v-else x-small>mdi-minus</v-icon>
									</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>

				</v-card-text>

			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'Evidence',
	data(){
		return{
			proofSelect: [],
			evidenceData: [
				{id: 1, text: 'EMF-5'},
				{id: 2, text: 'Ghost Writing'},
				{id: 3, text: 'Fingerprints'},
				{id: 4, text: 'Spirit Box'},
				{id: 5, text: 'Freezing Temperatures'},
				{id: 6, text: 'Ghost Orb'},
			],
			ghostData: [
				['Banshee', [1, 3, 5]],
				['Demon', [2, 4, 5]],
				['Jinn', [1, 4, 6]],
				['Mare', [4, 5, 6]],
				['Oni', [1, 2, 4]],
				['Phantom', [1, 5, 6]],
				['Poltergeist', [3, 4, 6]],
				['Revenant', [1, 2, 3]],
				['Shade', [1, 2, 6]],
				['Spirit', [2, 3, 4]],
				['Wraith', [3, 4, 5]],
				['Yurei', [2, 5, 6]],
			],
		}
	},
	computed:{
		evidenceCompute(){
			const evidenceData = this.evidenceData;
			const proofSelect = this.proofSelect;
			const ghostCompute = this.ghostCompute;
			let data = [], emptyEvidence = [];

			if(!proofSelect.length) return evidenceData;

			evidenceData.map(evd => {
				/*
				if(!proofSelect.includes(evd.id)){
					var tempEvd = Object.assign({}, evd);
					tempEvd.noGhost = 0;
					data.push(tempEvd);
				}
				*/
				var tempEvd = Object.assign({}, evd);
				tempEvd.noGhost = 0;
				data.push(tempEvd);
			});

			if(ghostCompute.length){
				ghostCompute.map(([ghost, ghostEvd]) => {
					data.map(evd => {
						if(!ghostEvd.includes(evd.id)){
							evd.noGhost++;
						}
					})
				});
				for(var i=(data.length-1); i>=0; i--){
					if(data[i].noGhost===ghostCompute.length){
						data.splice(i, 1);
					}
				}
			}

			return data;
		},
		ghostCompute(){
			const ghostData = this.ghostData;
			const proofSelect = this.proofSelect;
			let data = [];

			if(!proofSelect.length) return ghostData;

			ghostData.map(([ghost, ghostEvd], idx) => {

				var success = 0, fail = 0;
				proofSelect.map(proof => {
					if(ghostEvd.includes(proof)){
						success++;
					}else if(!ghostEvd.includes(proof)){
						fail++;
					}
				});
				if(success>0 && success<4 && fail<1){
					data.push(ghostData[idx]);
				}
			});

			return data;
		},
	},
	methods:{
		evidenceText(id){
			const data = this.evidenceData;
			for(var i=0; i!=data.length; i++){
				if(data[i].id === id){
					return data[i].text;
				}
			}
			return "ERROR";
		},
	},
}
</script>
