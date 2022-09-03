<template>
  <router-link class="h-full w-full flex" :to="'/art/' + (link || title)">
    <div
      class="w-full p-4 box-content hover:bg-slate-50 transition-all relative overflow-hidden"
    >
      <h3 class="capitalize text-2xl my-4 text-center">{{ title }}</h3>
      <img
        class="max-w-full max-h-72 mx-auto"
        :src="require(`../assets/art/` + formattedFolder + image + '')"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    folder: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "logo.png",
    },
  },

  computed: {
    formattedFolder() {
      return this.folder ? this.folder + "/" : this.folder;
    },
  },
};
</script>

<style></style>
