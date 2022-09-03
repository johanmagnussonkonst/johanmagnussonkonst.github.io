<template>
  <div class="bg-white mx-auto" v-if="showModal">
    <div class="mx-auto text-right text-4xl font-bold cursor-pointer">
      <span @click="closeModal"> ✕ </span>
    </div>
    <img
      class="mx-auto max-h-full max-w-full object-cover"
      :src="require(`../assets/art/` + folderName + activeImage.name + '')"
    />
  </div>
  <div v-else class="px-4">
    <h2 class="text-2xl md:text-3xl">
      {{ $route.params.id2 || $route.params.id }}
    </h2>
    <p class="pt-2 pb-8 max-w-3xl">
      {{ description }}
    </p>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <template v-if="images.length">
        <li
          class="flex flex-col justify-end cursor-pointer"
          v-for="(image, index) in images"
          :key="index"
          @click="openModal(image)"
        >
          <img
            class="max-w-auto max-h-72 mx-auto"
            :src="require(`../assets/art/` + folderName + image.name + '')"
          />
          <h3 class="text-xl pt-2 text-center">{{ image.displayName }}</h3>
        </li>
      </template>
      <template v-if="folders.length">
        <li v-for="(folder, index) in folders" :key="folder.name + index">
          <ArtLink
            :folder="folderName + folder.name"
            :link="folderName + folder.name"
            :title="folder.displayName"
            :image="getImage(folder)"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import ArtJson from "../art.json";
import ArtLink from "@/components/ArtLink.vue";

export default {
  components: {
    ArtLink,
  },

  data() {
    return {
      image: "logo.png",
      description: "",
      images: [],
      folders: [],
      folderName: "",
      showModal: false,
      activeImage: "",
      oldPos: 0,
    };
  },

  watch: {
    "$route.params": {
      handler: function () {
        // clear previous data
        this.images = [];
        this.folders = [];
        this.activeImage = "";
        this.description = "";

        this.onNavigate();
      },
      deep: true,
    },
  },

  created() {
    this.onNavigate();
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    onNavigate() {
      if (!this.$route.params.id) this.returnHome();

      let section = ArtJson.find(
        (section) => section.displayName === this.$route.params.id
      );

      if (!section) this.returnHome();

      // handle nested folders
      if (this.$route.params.id2) {
        let section2 = section.children.find(
          (section2) => section2.displayName === this.$route.params.id2
        );

        this.folderName = section.name + "/" + section2.name + "/";
        this.description = section2.description;

        this.images = section2.children;
      } else {
        this.folderName = section.name + "/";
        this.description = section.description;

        if (section.children.some((element) => element.type === "folder")) {
          this.folders = section.children.filter(
            (element) => element.type === "folder"
          );
        } else {
          this.images = section.children;
        }
      }
    },

    returnHome() {
      // Navigate to landing page if page not found
      this.$router.push({ path: "/" });
    },
    openModal(image) {
      this.showModal = true;
      this.activeImage = image;

      if (window.scrollY) {
        this.oldPos = window.scrollY;
        window.scrollTo(0, 0);
      }
    },
    closeModal() {
      this.showModal = false;

      window.scrollTo(0, this.oldPos);
    },
    getImage(folder) {
      // returns the first image
      return folder.children.find((element) => {
        return (
          element.name.includes(".jpg") ||
          element.name.includes(".png") ||
          element.name.includes(".jpeg")
        );
      }).name;
    },
  },
};
</script>

<style></style>
