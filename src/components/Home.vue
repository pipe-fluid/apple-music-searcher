<template>
	<v-container class="mx-auto" data-app>
		<h1>{{ msg }}</h1>
		<div>
			<multiselect
				v-model="selectedInput"
				id="ajax"
				label="name"
				@change="stopLoading"
				track-by="code"
				placeholder="Type to search"
				open-direction="bottom"
				:options="data"
				:multiple="true"
				:searchable="true"
				:loading="isLoading"
				:internal-search="false"
				:clear-on-select="false"
				:close-on-select="false"
				:options-limit="9"
				:limit="1"
				:limit-text="limitText"
				:max-height="600"
				:show-no-results="false"
				:hide-selected="true"
				@search-change="asyncFind"
			>
				<template slot="tag" slot-scope="{ option, remove }"
					><span class="custom__tag"
						><span>{{ option.collectionName }}</span
						><span
							class="custom__remove"
							@click="
								remove(option);
								stopLoading();
							"
						>
							❌</span
						></span
					></template
				>
				<template slot="clear" slot-scope="props">
					<div
						class="multiselect__clear"
						v-if="selectedInput.length"
						@mousedown.prevent.stop="clearAll(props.search)"
					></div> </template
				><span slot="noResult"
					>Oops! No elements found. Consider changing the search query.</span
				>
			</multiselect>
			<pre class="language-json"><code><v-row dense>
			<v-col>
				<v-card v-for="(item, i) in selectedInput" :key="i" cols="12" color="blue">
					<v-col>
						<v-avatar class="ma-3" size="125" tile>
							<v-img :src="item.artworkUrl100"></v-img>
						</v-avatar>
					</v-col>
					<v-col>
						<div class="d-flex flex-no-wrap justify-space-between">
							<div>
								<v-card-title class="text-h5" v-text="item.artistName"></v-card-title>
								<v-card-text
									style="display: flex; justify-content: left"
									v-text="item.collectionName"
								></v-card-text>

								<v-card-actions>
									<v-btn
										:href="item.collectionViewUrl"
										class="ml-2 mt-5"
										outlined
										rounded
										small
									>
										Go to iTunes
									</v-btn>
								</v-card-actions>
							</div>
						</div>
					</v-col>
				</v-card>
			</v-col>
		</v-row></code></pre>
		</div>
		<v-row dense>
			<v-col>
				<v-card v-for="(item, i) in data" :key="i" cols="12">
					<v-col>
						<v-avatar class="ma-3" size="125" tile>
							<v-img :src="item.artworkUrl100"></v-img>
						</v-avatar>
					</v-col>
					<v-col>
						<div class="d-flex flex-no-wrap justify-space-between">
							<div>
								<v-card-title
									class="text-h5"
									v-text="item.artistName"
								></v-card-title>
								<v-card-text
									style="display: flex; justify-content: left"
									v-text="item.collectionName"
								></v-card-text>

								<v-card-actions>
									<v-btn
										:href="item.collectionViewUrl"
										class="ml-2 mt-5"
										outlined
										rounded
										small
									>
										Go to iTunes
									</v-btn>
								</v-card-actions>
							</div>
						</div>
					</v-col>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	name: "Home",
	props: {
		msg: String,
	},
	data: () => ({
		value: [],
		options: [],
		selectedInput: [],
		data: [],
		isLoading: false,
	}),
	methods: {
		limitText(count) {
			return `and ${count} other data`;
		},
		asyncFind(query) {
			this.isLoading = true;
			axios
				.get(`https://itunes.apple.com/search?term=${query}&entity=album`)
				.then((response) => {
					this.data = response.data.results;
				});
		},
		clearAll() {
			this.selectedInput = [];
		},
		stopLoading() {
			this.isLoading = false;
		},
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
