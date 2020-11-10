<template>
	<v-row>
		<v-col cols="12">
			<v-card>
                <v-card-title>ERROR 404 Page Not Found</v-card-title>
                <v-card-text>
                    <p>
                        Sorry! your requested page is not exist
                    </p>

                    <hr class="my-5">

                    <p>
                        ขออภัย! หน้าที่คุณเรียกไม่มีอยู่
                    </p>
                </v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'Error404',
}
</script>
