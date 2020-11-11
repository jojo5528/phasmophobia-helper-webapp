<template>
	<v-row>
        <v-col cols="12">
            <v-alert text outlined color="blue" icon="mdi-code-greater-than">
                <p>อัพเดทล่าสุด: 11 พ.ย. | v.1.0.1</p>
                <p>Last Update: Nov 11st | v.1.0.1</p>
            </v-alert>
        </v-col>

        <v-col cols="12">
			<v-card>
                <v-card-title>Change Log TH</v-card-title>
                <v-card-text>
                    <v-treeview :items="changeLogTH" open-all></v-treeview>
                </v-card-text>
			</v-card>
		</v-col>

        <v-col cols="12">
			<v-card>
                <v-card-title>Change Log EN</v-card-title>
                <v-card-text>
                    <v-treeview :items="changeLogEN" open-all></v-treeview>
                </v-card-text>
			</v-card>
		</v-col>

	</v-row>
</template>

<script>
export default {
    name: 'ChangeLog',
    data(){
        return{
            changeLogTH: [
                { name: 'v1.0.0',
                    children: [
                        { name: 'Evidence: ตัวช่วยในการจัดการหลักฐาน จะช่วยในการระบุหลักฐานของผีชนิดต่างๆ' },
                        { name: 'Guess: ช่วยในการคาดเดาผี จากพฤติกรรมของผีในเกม' },
                        { name: 'Guess(Funny): ช่วยในการคาดเดาผี จากพฤติกรรมและแนวคิดของผู้คนในดิสคอร์ด (ขำๆ)' },
                    ],
                },
                { name: 'v1.0.1',
                    children: [
                        { name: 'ลบ: Guess, Guess (Funny)' },
                        { name: 'เพิ่ม: Ghost Analyze' },
                        { name: 'แก้ไข: UI, Fonts' },
                    ],
                },
            ],
            changeLogEN: [
                { name: 'v1.0.0',
                    children: [
                        { name: 'Evidence: evidence helper, help you manage the evidence for determine ghosts type' },
                        { name: 'Guess: ghost type guessing helper, guess ghost type by behavior' },
                        { name: 'Guess(Funny): ghost type guessing helper, guess ghost type by behavior and thailand community player thinking (for joke)' },
                    ],
                },
                { name: 'v1.0.1',
                    children: [
                        { name: 'Remove: Guess, Guess (Funny)' },
                        { name: 'Add: Ghost Analyze' },
                        { name: 'Modify: UI, Fonts' },
                    ],
                },
            ],
        }
    }
}
</script>
