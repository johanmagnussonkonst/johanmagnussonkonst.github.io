<template>
  <div class="h-full w-full max-w-7xl mx-auto text-gray-700 relative">
    <nav
      class="flex px-4 py-2 justify-between mx-auto w-full flex-wrap bg-white drop-shadow-sm relative sticky top-0 z-50"
    >
      <div
        style="background-color: #7a1f00"
        class="w-2 h-full -ml-4 -mt-2 absolute"
      ></div>

      <router-link to="/">
        <h1
          class="mr-4 box-content text-3xl md:text-4xl uppercase transition-all"
        >
          Johan Magnusson
        </h1>
      </router-link>
      <div class="flex items-end text-2xl gap-4">
        <router-link class="terra-link" to="/">VERK</router-link> |
        <router-link class="terra-link" to="/about">OM MIG</router-link> |
        <InstagramLink />
      </div>
    </nav>

    <div class="h-full w-full p-4 box-sizing overflow-auto">
      <router-view />
    </div>
  </div>
</template>
<script>
import InstagramLink from "@/components/InstagramLink.vue";

export default {
  name: "HomeView",
  components: {
    InstagramLink,
  },
};
</script>
