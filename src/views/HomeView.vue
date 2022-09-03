<template>
  <section
    class="border-2 max-h-96 border-gray-500 overflow-hidden box-sizing mb-8"
  >
    <img src="@\assets\hero.png" />
  </section>
  <section class="box-sizing">
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <li v-for="(section, index) in artData" :key="section.name + index">
        <ArtLink
          :folder="section.name"
          :title="section.displayName"
          :image="getImage(section)"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import ArtLink from "@/components/ArtLink.vue";
import ArtJson from "../art.json";
export default {
  name: "HomeView",
  components: { ArtLink },
  data() {
    return {
      artData: [],
    };
  },

  mounted() {
    this.artData = ArtJson;
  },

  methods: {
    getImage(section) {
      // returns the first image
      let res = section.children.find((element) => {
        return (
          element.name.includes(".jpg") ||
          element.name.includes(".png") ||
          element.name.includes(".jpeg")
        );
      });

      // if no image return the first grandchild
      if (!res && section.children[0].type === "folder") {
        res = section.children[0].name;
      }

      return res.name;
    },
  },
};
</script>
