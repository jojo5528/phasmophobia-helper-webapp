<template>
	<v-row>
		<v-expansion-panels accordion>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <h3 class="black--text">Ghost's Behavior | พฤติกรรมผี</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="6" lg="4" v-for="behavior in behaviorData" :key="behavior.id">
                            <v-checkbox
                                v-model="behaviorSelect"
                                :label="behavior.text"
                                :value="behavior.id"
                                hide-details
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>
                    <h3 class="black--text">Ghost's Filter | คัดกรองผี</h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="6" lg="4" v-for="([ghost], idx) in chanceGhost" :key="idx">
                            <v-checkbox
                                v-model="ghostSelect"
                                :label="ghost"
                                :value="ghost"
                                hide-details
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-col cols="12">
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="6" sm="4" md="3" class="text-center" v-for="([ghost,  val], idx) in chanceGhostCompute" :key="idx">
                            <v-progress-circular :rotate="0" :size="120" :width="20" :value="val" color="teal darken-1">
                                <p class="text-uppercase font-weight-medium">
                                    {{ ghost }}<br>
                                    <span class="font-weight-black text-h5">{{ val }}%</span>
                                </p>
                            </v-progress-circular>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" v-for="[id, txtTH, txtEN, noteTH, noteEN] in descCompute" :key="id">
            <v-card color="blue lighten-4">
                <v-card-title>{{ behaviorText(id) }}</v-card-title>
                <v-card-text>
                    <p v-html="txtTH" class="text-body-1"></p>
                    <p v-html="noteTH" class="text-body-1 font-weight-medium"></p>

                    <hr class="my-5 blue">

                    <p v-html="txtEN" class="text-body-1"></p>
                    <p v-html="noteEN" class="text-body-1 font-weight-medium"></p>
                </v-card-text>
            </v-card>
        </v-col>

	</v-row>
</template>

<script>
export default {
	name: 'Guess',
	data(){
		return{
            behaviorSelect: [],
            ghostSelect: [],
			behaviorData: [
				{id: 1, text: 'Frequent Hunt | ออกล่าบ่อย'},
				{id: 2, text: 'Eat Sanity | Sanity ลดเยอะ ลดเร็ว'},
				{id: 3, text: 'Run fast | วิ่งเร็ว'},
				{id: 4, text: 'Foot print | รอยเท้า'},
				{id: 5, text: 'Action with Items | เล่นสิ่งของ ไฟ ฯลฯ'},
				{id: 6, text: 'Idle, AFK, NO-Response | ไม่ตอบสนอง ไม่มีปฏิกริยา'},
            ],
            chanceGhost: [
                [
                    'Banshee', 0,
                    [0, 0, 0, -999, 0, 0]
                ],
				[
                    'Demon', 0,
                    [100, 0, 0, 10, 0, 0]],
				[
                    'Jinn', 0,
                    [0, 0, 50, 10, 80, 0]],
				[
                    'Mare', 0,
                    [0, 0, 0, 10, 0, 0]],
				[
                    'Oni', 0,
                    [0, 0, 0, 10, 0, 0]],
				[
                    'Phantom', 0,
                    [0, 80, 0, 10, 0, 0]],
				[
                    'Poltergeist', 0,
                    [0, 0, 0, 10, 80, 0]],
				[
                    'Revenant', 0,
                    [0, 0, 100, 10, 0, 0]],
				[
                    'Shade', 0,
                    [0, 0, 0, 10, 0, 100]],
				[
                    'Spirit', 0,
                    [0, 0, 0, 10, 0, 0]],
				[
                    'Wraith', 0,
                    [0, 0, 50, -999, 0, 0]],
				[
                    'Yurei', 0,
                    [0, 80, 0, 10, 0, 0]
                ],
            ],
            descData : [
                [
                    1,
                    "การออกล่าบ่อย มันจะต้องเป็น <b>DEMON</b> แน่นอน !",
                    "As frequent hunt, It must be a <b>DEMON</b> for sure!",
                ],
                [
                    2,
                    "การลด Sanity มันจะต้องเป็น <b>Phantom, Yurei</b>. แน่นอน!",
                    "As Sanity decreased too much, It must be a <b>Phantom, Yurei</b>. for sure!",
                ],
                [
                    3,
                    "มันวิ่งเร็ว จะต้องเป็น <b>Revenant</b> แน่นอน! / เปิดไฟแล้ววิ่งเร็วมันต้องเป็น <b>Jinn</b> / ตายหน้าประตู ทะลุกำแพงต้องเป็น <b>Wraith</b> แน่นอน !",
                    "Its fast, must be <b>Revenant</b> for sure! / Its fast when light is on, so must be <b>Jinn</b>! / Die behind door or in-room, It must be <b>Wraith</b>!",
                ],
                [
                    4,
                    "มีรอยเท้า ตัด <b>Wraith</b> กับ <b>Banshee</b> ออกเลย มันเป็นผีบิน !",
                    "Have footprints, remove <b>Wraith</b>,<b>Banshee</b> from choices cause it can fly !",
                ],
                [
                    5,
                    "เล่นไฟ, เครื่องใช้ไฟฟ้า มันจะต้องเป็น <b>Jinn</b> แน่นอน ! / เล่นของ โยนของ มันต้องเป็น <b>Poltergeist</b> !",
                    "It trigger electrical items so it must be <b>Jinn</b>! / WTF triggered items, its <b>Poltergeist</b> !",
                ],
                [
                    6,
                    "มันไม่ตอบ ไม่เขียน เงียบเลย Shade แน่นอน !",
                    "Its nothing, no response, no write, quiet. this must be <b>Shade</b> !",
                ],
            ],
		}
    },
    computed:{
        descCompute(){
            const descData = this.descData;
            const behaviorSelect = this.behaviorSelect;
            let data = [];

            if(!behaviorSelect.length) return data;

            descData.map(([id, txtTH, txtEN, noteTH, noteEN], idx) => {
                if(behaviorSelect.includes(id)) data.push(descData[idx]);
            });

            return data;
        },
        chanceGhostCompute(){
            const chanceGhost = this.chanceGhost;
            const behaviorSelect = this.behaviorSelect;
            const ghostSelect = this.ghostSelect;
            let data = [];

            chanceGhost.map(([ghost, chance, beh], idx) => {
                var tempGhost = Object.assign({}, chanceGhost[idx]);

                behaviorSelect.map(bSelect => {
                    if(bSelect){
                        tempGhost[1] += beh[bSelect-1];
                    }
                });

                if(ghostSelect.length){
                    if(ghostSelect.includes(tempGhost[0])){
                        data.push(tempGhost);
                    }
                }else if(tempGhost[1]>0){
                    data.push(tempGhost);
                }
            });

            return data;
        },
    },
	methods:{
		behaviorText(id){
			const data = this.behaviorData;
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
