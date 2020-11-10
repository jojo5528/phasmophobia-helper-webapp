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
                    [20, 5, 5, 5, 5, 10]
                ],
				[
                    'Demon', 0,
                    [30, 5, 5, 5, 5, 5]],
				[
                    'Jinn', 0,
                    [15, 5, 15, 5, 20, 5]],
				[
                    'Mare', 0,
                    [15, 5, 5, 5, 15, 15]],
				[
                    'Oni', 0,
                    [15, 5, 5, 5, 15, 5]],
				[
                    'Phantom', 0,
                    [10, 15, 5, 5, 5, 15]],
				[
                    'Poltergeist', 0,
                    [15, 15, 5, 5, 20, 10]],
				[
                    'Revenant', 0,
                    [10, 5, 20, 5, 5, 15]],
				[
                    'Shade', 0,
                    [10, 5, 5, 5, 5, 25]],
				[
                    'Spirit', 0,
                    [10, 5, 10, 5, 5, 15]],
				[
                    'Wraith', 0,
                    [15, 5, 10, -999, 10, 10]],
				[
                    'Yurei', 0,
                    [15, 20, 5, 5, 10, 15]
                ],
            ],
            descData : [
                [
                    1,
                    "การออกล่าบ่อย มีความเป็นไปได้สูงว่าจะเป็น <b>DEMON, BANSHEE</b> ทั้งนี้ขึ้นอยู่กับค่า <b>Sanity</b> ยิ่งค่า Sanity ต่ำเท่าไร ทฤษฎีนี้ก็ยิ่งไม่สามารถใช้ได้",
                    "As Frequent Hunt, its possibly be <b>DEMON, BANSHEE</b>. By the way its depends on your <b>Sanity</b>, if your sanity's low, you can't believe this theory.",
                    `คำแนะนำ: ค่า Sanity สำหรับทฤษฎีนี้ที่เชื่อถือได้คือ มากกว่า <b class="red--text">70</b>
                    <br>
                    อัตราตัวคูณการออกล่า: ทั่วไป 1x, Demon (1.75 หรือ 3 ไม่แน่ใจ)x, Banshee: 100% ถ้าเป้าหมายอยู่คนเดียว`,
                    `Note: Recommend Sanity for use this theory is greater equal than <b class="red--text">70</b>
                    <br>
                    Hunt Rate Multiplier: General 1x, Demon (1.75 or 3 not sure)x, Banshee: 100% if target alone`
                ],
                [
                    2,
                    "การที่ลดค่า Sanity เยอะๆ มีความเป็นไปได้สูงว่าจะเป็น <b>Phantom, Yurei, Poltergeist</b>. อาจพิจารณาได้จากวิธีการที่เจอเหตุการณ์ เช่น หากไปยืนในห้องผีแล้วไม่โดนหลอกใดๆ ก็มีสิทธิที่จะเป็น Phantom, Yurei ได้ แต่หากมีการเล่นสิ่งของต่างๆ ก็อาจตีความได้ว่าเป็น Poltergeist",
                    "When your Sanity decreased too much, its possibly be <b>Phantom, Yurei, Poltergeist</b>. You can determine by how you meet the ghost's event, For example: stand in ghost room without ghost's event, its possibly be Phantom, Yurei. But if ghost actions with items, etc and your sanity decreased, its possibly be Poltergeist",
                    `คำแนะนำ: การตรวจค่า Sanity ในกรณีนี้ ควรแยกดูเป็นรายบุคคล หากอยู่ด้วยกันตลอดแล้วลดไปพร้อมๆกันจะทำให้ทฤษฎีนี้อาจผิดพลาดได้`,
                    `Note: This way should be used by person, if you stay together this theory will be false`,
                ],
                [
                    3,
                    "การที่ผีวิ่งเร็ว มีความเป็นไปได้ว่าจะเป็น Jinn, Revenant โดยการอ้างอิง wiki ระบุว่า Jinn จะวิ่งเร็วขึ้นหากคุณเปิดคัทเอาท์ไฟไว้, และ Revenant จะวิ่งเร็วที่สุดในขณะที่พบเป้าหมายและไล่ล่า. อย่างไรก้ตามทาง wiki เขียนไว้ว่า Spirit จะวิ่งเร็วขึ้นหลังจากที่มันเริ่มวิ่ง (เหมือนกับการเร่งเครื่อง) แต่โดยส่วนตัวที่เล่นมาก็ไม่ได้เห็นผลชัดแบบ Jinn, Revenant",
                    "when ghost's running too fast, its possibly be <b>Jinn, Revenant</b>. The game's wiki describe that Jinn will be faster when you turned on Circuit Breaker, and Revenant will fastest when targeting. By the way they wrote that Spirit will be faster and faster after its started run (Acceleration) but by my play's experience its not clearly tho.",
                ],
                [
                    4,
                    "รอยเท้านั้นไม่สามารถบอกอะไรได้ นอกจาก การที่มีการเหยียบเกลือ แต่ไม่พบรอยเท้า จะชี้ชัดได้ว่าเป็น Wraith, แต่ถ้าหากพบรอยเท้า ก็สามารถตัด Wraith ออกจากตัวเลือกน่าสงสัยได้เช่นเดียวกัน",
                    "The footprints can't tell anything, except if ghost step on it and you dont see any footprint, its clearly Wraith. But if you found footprints, you can remove Wraith from Suspicious list too"
                ],
                [
                    5,
                    "การเล่นกับสิ่งของบ่อยๆ มีความเป็นไปได้ว่าจะเป็น <b>Jinn, Poltergeist</b> อย่างไรก็ตามทฤษฎีนี้ใช้ในการคาดเดาประกอบหลักฐานเท่านั้น ไม่สามารถใช้เดาสุ่มๆได้ เนื่องจากผีทุกตัวสามารถเล่นกับสิ่งของได้หมดเหมือนกัน",
                    "As action with items, its possibly be <b>Jinn, Poltergeist</b>. By the way this theory used combine with proof, this can't use for randomly accuse, because all of ghost can action with items too",
                ],
                [
                    6,
                    "การไม่ตอบสนอง มีความเป็นไปได้ว่าจะเป็น <b>Shade</b> และการตอบสนองที่มากเกินไป (ตอบเร็ว, ออกอาการเร็ว, แอคทีฟ) มีความเป็นไปได้ว่าจะเป็น Oni อย่างไรก็ตามทฤษฎีนี้ไม่สามารถใช้ได้ในกรณีที่คุณเล่นระดับ Professional (เนื่องจากมีการสุ่มพฤติกรรมของผีที่ซับซ้อน)",
                    "As non-response behavior, its possibly be <b>Shade</b> and if too much response(fast reply, very active) its possibly be <b>Oni</b>. By the way this theory can't be used when you play in Professional Level (cause Ghost's behavior random system is too complex)",
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
                }else if(tempGhost[1]>=0){
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
