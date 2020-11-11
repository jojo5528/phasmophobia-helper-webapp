<template>
	<v-row>
        <v-col cols="12">
            <v-card>
                <v-card-text>
                    <v-radio-group v-model="language" row>
                        <v-radio
                            v-for="(lang,idx) in languageData" :key="idx"
                            :label="lang" :value="lang"></v-radio>
                    </v-radio-group>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3 class="black--text">{{ language==='TH' ? 'พฤติกรรมผี' : 'Ghost Behavior' }}</h3>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6" lg="4" v-for="(behavior, idx) in behaviorCompute" :key="idx" class="ma-0 py-0">
                            <v-subheader>{{ language==='TH' ? 'ชนิด' : 'Type' }}: {{ behavior.type }} | {{ behavior.text }}</v-subheader>
                            
                            <v-select
                                v-model="behaviorSelect[idx]"
                                :items="behavior.data"
                                :label="behavior.text"
                                :hint="behavior.text"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h3 class="black--text">{{ language==='TH' ? 'วิเคราะห์ชนิดผี' : 'Ghost Analyze' }}</h3>
                </v-card-title>
                <v-card-text>
                    <p>
                        <v-btn color="pink" dark x-large @click="resetGhost"><v-icon left>mdi-sync</v-icon> RE-ANALYZE</v-btn>
                    </p>
                    <p class="text-uppercase">
                        {{ language==='TH' ? 'ชนิดผี' : 'Ghost Type' }}
                        <v-chip class="ma-2" color="green darken-4" label text-color="white" close @click:close="removeGhost(ghost.name)" large v-for="(ghost, idx) in ghostAnalyzeCompute" :key="idx">
                            <v-icon left>mdi-ghost</v-icon>
                            {{ ghost.name }}
                        </v-chip>
                    </p>
                    <hr class="my-3 blue light-4">
                    <div v-for="(item, idx) in descCompute" :key="idx">
                        <p class="font-weight-bold text-h6 indigo--text ma-0">{{ item.caption }} : {{ item.text }}</p>
                        <p v-html="item.desc"></p>
                        <hr v-if="item.desc" class="my-3">
                    </div>
                </v-card-text>
            </v-card>
        </v-col>

	</v-row>
</template>

<script>
export default {
	name: 'GhostAnalyze',
	data(){
		return{
            language: 'TH',
            languageData: ['TH', 'EN'],
            ghostIgnore: [],
            behaviorSelect: [0, 0, 0, 0, 0, 0],
            ghostData: [
                { name: 'Banshee', hunt: [1, 1, 1], sanity: [0, -1, -1], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [0, 0, 0] },
                { name: 'Demon', hunt: [1, 1, 1], sanity: [0, -1, -1], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [0, 0, 0] },
                { name: 'Jinn', hunt: [1, 0, -5], sanity: [0, 0, 0], run: [0, 1], foot: [0, 0], action: [0, 1, -1], response: [0, 1, 0] },
                { name: 'Mare', hunt: [1, 1, -5], sanity: [0, -1, -1], run: [0, 0], foot: [0, 0], action: [0, 0, 0], response: [0, 0, 0] },
                { name: 'Oni', hunt: [1, 1, -5], sanity: [0, -1, 0], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [0, 1, -1] },
                { name: 'Phantom', hunt: [1, 0, -5], sanity: [-1, 1, 1], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [0, -1, 1] },
                { name: 'Poltergeist', hunt: [1, 1, -5], sanity: [-1, 1, 1], run: [0, -1], foot: [0, 0], action: [0, -1, 1], response: [0, 0, 0] },
                { name: 'Revenant', hunt: [1, 0, -5], sanity: [0, -1, -1], run: [-1, 1], foot: [0, 0], action: [0, 0, 0], response: [0, 1, -1] },
                { name: 'Shade', hunt: [1, 0, -5], sanity: [0, -1, -1], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [-1, -5, 1] },
                { name: 'Spirit', hunt: [1, 0, -5], sanity: [0, -1, -1], run: [0, 0], foot: [0, 0], action: [0, 0, 0], response: [0, 0, 0] },
                { name: 'Wraith', hunt: [1, 0, -5], sanity: [0, -1, -1], run: [0, 0], foot: [0, -999], action: [0, 0, 0], response: [0, 0, 0] },
                { name: 'Yurei', hunt: [1, 1, -5], sanity: [0, 1, 1], run: [0, -1], foot: [0, 0], action: [0, 0, 0], response: [0, 0, 1] },
			],
			behaviorDataEN: [
                { type: 1, text: 'Hunting', data: [
                    { id: 0,  text: 'Normal Hunt', value: 0, desc: '' },
                    { id: 1, text: 'Frequent Hunt', value: 1, desc: `Frequent Hunt, the ghost could be <b>BANSHEE, DEMON</b>.<br>Check your sanity carefully & check some lights, it might be <b>MARE, POLTERGEIST, YUREI</b> too.` },
                    { id: 2, text: 'Fast Hunt (Sanity 70+)', value: 2, desc: `Fast Hunt when sanity 90+ is confirmed <b>BANSHEE</b>.<br>But if your sanity around 70-80+ it might be <b>DEMON</b> too, due to his hunting multiplier rate from wiki` },
                ]},
                { type: 2, text: 'Sanity', data: [
                    { id: 0, text: 'Normal', value: 0, desc: '' },
                    { id: 1, text: 'by Ghost Event (met, show himself)', value: 1, desc: `Ghost Event drop sanity, the ghost could be <b>PHANTOM, YUREI</b>.<br>due to his ability skill from wiki` },
                    { id: 2, text: 'by Ghost Action (items, etc)', value: 2, desc: `Ghost Action with items drop sanity, the ghost could be <b>POLTERGEIST, YUREI</b>.<br>due to his ability skill from wiki` },
                ]},
                { type: 3, text: 'Running', data: [
                    { id: 0, text: 'Normal run', value: 0, desc: '' },
                    { id: 1, text: 'Fast run', value: 1, desc: `Ghost running fast, the ghost could be <b>JINN, REVENANT</b>. Try to check on circuit breaker if hes jinn, or listen his footsteps for revenant.<br>However <b>BANSHEE</b> can teleport and kill target if target isnt stay inside-room, while <b>WRAITH</b> can go around walk through the wall.` },
                ]},
                { type: 4, text: 'Footprints', data: [
                    { id: 0, text: 'No Footprints', value: 0, desc: '' },
                    { id: 1, text: 'Yes, he has footprints', value: 1, desc: `If he has footprints, you can remove <b>WRAITH</b> from choices.<br>Wiki says he can't be detected by footprints, try to check it by Salt + Glow Stick(he can step on salt, but no footprints)` },
                ]},
                { type: 5, text: 'Actions', data: [
                    { id: 0, text: 'Normal actions', value: 0, desc: '' },
                    { id: 1, text: 'Often electrical', value: 1, desc: `Often action with electrical items, he could be <b>JINN, MARE, POLTERGEIST</b>.<br>Try to check on light-switch and circuit breaker.` },
                    { id: 2, text: 'Often items', value: 2, desc: `Often action with items, he could be <b>POLTERGEIST</b>.<br>but beware if hes very active type, he could be anything such as Oni` },
                ]},
                { type: 6, text: 'Response', data: [
                    { id: 0, text: 'Normal', value: 0 },
                    { id: 1, text: 'Very active | easy reply', value: 1, desc: `Very active ghost, he could be <b>ONI, JINN, POLTERGEIST, REVENANT</b>.<br>These ghost type can be easy for detect cause hes very active.` },
                    { id: 2, text: 'Mostly idle | Non-active', value: 2, desc: `AFK ghost, he could be <b>PHANTOM, SHADE, YUREI</b>.<br>These ghost type hard for collect evidences.` },
                ]},
            ],
            behaviorDataTH: [
                { type: 1, text: 'การออกล่า', data: [
                    { id: 0,  text: 'ปกติ', value: 0, desc: '' },
                    { id: 1, text: 'ออกล่าบ่อย', value: 1, desc: `การออกล่าบ่อย, ผีอาจเป็น <b>BANSHEE, DEMON</b>.<br>ลองเช็ค sanity และเปิดไฟตามทางเดินไว้เพราะบางทีอาจจะเป็น <b>MARE, POLTERGEIST, YUREI</b> ก็ได้` },
                    { id: 2, text: 'ออกล่าเร็ว (Sanity 70+)', value: 2, desc: `การออกล่าเร็วในขณะที่ sanity มากกว่า 90+ ยืนยันได้เลยว่าเป็น <b>BANSHEE</b>.<br>แต่ถ้าหาก sanity อยู่ระหว่าง 70-80+ อาจจะเป็น <b>DEMON</b>, เนื่องจากอัตราการออกล่าสูงกว่าปกติอ้างอิงจากข้อมูล wiki` },
                ]},
                { type: 2, text: 'Sanity', data: [
                    { id: 0, text: 'ปกติ', value: 0, desc: '' },
                    { id: 1, text: 'ลดค่าโดย เหตุการณ์ (เจอผี, มองเห็นผี)', value: 1, desc: `เหตุการณ์ ลด sanity, ผีอาจเป็น <b>PHANTOM, YUREI</b>.<br>เนื่องจากสกิลของผีข้อมูลอ้างอิงจาก wiki` },
                    { id: 2, text: 'ลดค่าโดย การกระทำ (เล่นของและอื่นๆ)', value: 2, desc: `การกระทำ ลด sanity, ผีอาจเป็น <b>POLTERGEIST, YUREI</b>.<br>เนื่องจากสกิลของผีข้อมูลอ้างอิงจาก wiki` },
                ]},
                { type: 3, text: 'การวิ่ง', data: [
                    { id: 0, text: 'วิ่งปกติ', value: 0, desc: '' },
                    { id: 1, text: 'วิ่งเร็ว', value: 1, desc: `ผีวิ่งเร็ว, อาจจะเป็น <b>JINN, REVENANT</b>. ลองเช็คคัทเอาท์ไฟถ้าเป็น JINN, หรือลองฟังเสียงฝีเท้าถ้าเป็น REVENANT.<br>อย่างไรก็ตาม <b>BANSHEE</b> สามารถวาร์ปและฆ่าเป้าหมายได้ ถ้าเป้าหมายไม่ได้อยู่ในห้องที่ปิดประตูแล้ว, ในขณะเดียวกัน <b>WRAITH</b> ก็สามารถเดินทะลุกำแพงต่างๆได้ ทำให้อาจคิดว่าเป็นผีวิ่งเร็ว` },
                ]},
                { type: 4, text: 'รอยเท้า', data: [
                    { id: 0, text: 'ไม่มีรอยเท้า', value: 0, desc: '' },
                    { id: 1, text: 'มีรอยเท้า', value: 1, desc: `ถ้าผีมีรอยเท้า, สามารถตัด <b>WRAITH</b> ออกจากตัวเลือกได้เลย.<br>wiki บอกไว้ว่าเขาไม่มีรอยเท้า, ลองตรวจดูโดยใช้ เกลือ + แท่งเรืองแสง (สามารถเหยียบเกลือได้แต่จะไม่มีรอยเท้า)` },
                ]},
                { type: 5, text: 'การกระทำ', data: [
                    { id: 0, text: 'ปกติ', value: 0, desc:'' },
                    { id: 1, text: 'เล่น เครื่องใช้ไฟฟ้า บ่อย', value: 1, desc: `เล่นเครื่องใช้ไฟฟ้าบ่อย, อาจเป็น <b>JINN, MARE, POLTERGEIST</b>.<br>ลองตรวจสวิตช์ไฟ และเบรกเกอร์ไฟ` },
                    { id: 2, text: 'เล่น สิ่งของ บ่อย', value: 2, desc: `เล่นสิ่งของบ่อย, อาจเป็น <b>POLTERGEIST</b>.<br>แต่ระวังหากเป็นผีที่ตอบสนองง่าย, เขาสามารถเป็นอะไรก็ได้เช่น ONI` },
                ]},
                { type: 6, text: 'การตอบสนอง', data: [
                    { id: 0, text: 'ปกติ', value: 0 },
                    { id: 1, text: 'ตอบสนองมาก | ตอบง่าย เร็ว หาหลักฐานง่าย', value: 1, desc: `ผีตอบสนองง่าย, อาจเป็น <b>ONI, JINN, POLTERGEIST, REVENANT</b>.<br>ผีชนิดนี้สามารถระบุได้ง่ายจากนิสัยที่มีการตอบสนองมาก` },
                    { id: 2, text: 'ไม่ค่อยตอบสนอง | เงียบ หาหลักฐานยาก', value: 2, desc: `ผีตอบสนองยาก, อาจเป็น <b>PHANTOM, SHADE, YUREI</b>.<br>ผีชนิดนี้จะยากสำหรับการรวบรวมหลักฐาน` },
                ]},
            ],
		}
    },
    computed:{
        descCompute(){
            const selectData = this.behaviorSelect;
            let data = [], descData = [], behaviorData = [];

            if(this.language==='TH'){
                descData = this.descDataTH;
                behaviorData = this.behaviorDataTH;
            }else{
                descData = this.descDataEN;
                behaviorData = this.behaviorDataEN;
            }

            selectData.map((val, idx) => {
                if(behaviorData[idx].type === (idx+1)){
                    behaviorData[idx].data.map(beh => {
                        if(beh.id === val){
                            var tempBeh = Object.assign({}, beh);
                            tempBeh.caption = behaviorData[idx].text;
                            data.push(tempBeh);
                        }
                    });
                }
            });

            return data;
        },
        behaviorCompute(){
            if(this.language==='TH'){
                return this.behaviorDataTH;
            }
            return this.behaviorDataEN;
        },
        ghostAnalyzeCompute(){
            const selectData = this.behaviorSelect;
            const ghostData = this.ghostData;
            let data = [];

            ghostData.map(ghost => {
                var tempGhost = {};
                tempGhost.name = ghost.name;
                tempGhost.point = 0;
                tempGhost.point += ghost.hunt[selectData[0]];
                tempGhost.point += ghost.sanity[selectData[1]];
                tempGhost.point += ghost.run[selectData[2]];
                tempGhost.point += ghost.foot[selectData[3]];
                tempGhost.point += ghost.action[selectData[4]];
                tempGhost.point += ghost.response[selectData[5]];

                if(tempGhost.point>0 && !this.ghostIgnore.includes(ghost.name)){
                    data.push(tempGhost);
                }
            });

            return data;
        },
    },
	methods:{
        resetGhost(){
            this.ghostIgnore = [];
        },
        removeGhost(ghost){
            return this.ghostIgnore.push(ghost);
        },
	},
}
</script>
