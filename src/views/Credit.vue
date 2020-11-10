<template>
	<v-row>
        <v-col cols="12">
			<v-card>
                <v-card-title>Notes</v-card-title>
                <v-card-text>
                    <v-treeview open-all :items="noteDataTH"></v-treeview>
                    <v-treeview open-all :items="noteDataEN"></v-treeview>
                </v-card-text>
			</v-card>
		</v-col>

		<v-col cols="12">
			<v-card>
                <v-card-title>Credits</v-card-title>
                <v-card-text>
                    <p>
                        You can download release of this app via github: <a href="https://github.com/jojo5528/phasmophobia-helper-webapp" target="_blank">https://github.com/jojo5528/phasmophobia-helper-webapp</a>
                    </p>
                    <v-treeview open-all :items="creditData"></v-treeview>
                </v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
    name: 'Credit',
    data(){
        return{
            noteDataTH: [
                { id: 1, name: 'ข้อมูลเมนูต่างๆ :',
                    children: [
                        { id: 2, name: 'Evidence: ตัวช่วยในการจัดการหลักฐาน จะช่วยในการระบุหลักฐานของผีชนิดต่างๆ' },
                        { id: 3, name: 'Guess: ตัวช่วยการคาดเดา อ้างอิงข้อมูลจาก wiki และประสบการณ์การเล่นที่ได้เล่นมา' },
                        { id: 4, name: 'Guess(Funny): ตัวช่วยการคาดเดา จะช่วยคุณในการเดาผี โดยอ้างอิงข้อมูลจาก สถิติการวิเคราะห์ของคนใน discord เซิฟไทย ฮ่าๆ (ขำๆนะครับ)' },
                    ],
                }
            ],
            noteDataEN: [
                { id: 1, name: 'Menu Information :',
                    children: [
                        { id: 2, name: 'Evidence: Evidence Helper, this can help you to remember & determine the ghost type evidence' },
                        { id: 3, name: 'Guess: Guess Helper, this can help you to guess the ghost type from some behavior information from wiki & played experience' },
                        { id: 4, name: 'Guess(Funny): Guess Helper, this help you to guess the ghost type by information from TH player in discord community experience LOL (this make for joke)' },
                    ],
                }
            ],
            creditData: [
                { id: 1, name: 'Application :',
                    children: [
                        { id: 2, name: 'Developer : Devkurov | jojo5528 (AKA: เชื่อผมเถอะ)' },
                        { id: 3, name: 'Played Experience Information : Arrogant (AKA: ไม่ต้องเชื่อผมก็ได้)' },
                    ],
                },
                { id: 4, name: 'Materials :',
                    children: [
                        { id: 5, name: 'Vuetify' },
                    ],
                },
                { id: 6, name: 'Documents :',
                    children: [
                        { id: 7, name: 'Phasmophobia_Wiki' },
                        { id: 8, name: 'Phamophobia Community [TH] : Discord' },
                    ],
                },
                { id: 9, name: 'Community :',
                    children: [
                        { id: 10, name: 'Phamophobia Community [TH] : Discord' },
                    ],
                },
            ],
        }
    }
}
</script>
