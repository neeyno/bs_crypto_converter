<template>
  <header>
    <img src="" />
    <ul class="home-tabs">
      <li
        v-for="(tab, i) in Tabs"
        :key="tab"
        :class="{ active: tabIndex === i }"
        @click="changeTab(i)"
      >
        <span>{{ tab }}</span>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    tabIndex: 0,
    Tabs: ["Converter", "Dashboard"]
  }),
  methods: {
    changeTab(index) {
      if (index != this.tabIndex) {
        this.tabIndex = index;
        this.$emit("changePath", index);
      }
    }
  },
  created() {
    if (this.$router.currentRoute.path === "/dashboard") {
      this.tabIndex = 1;
    } else {
      this.tabIndex = 0;
    }
  }
};

//<Button v-show="homePage" :text="showAddTask ? 'Close' : 'Add task'" :color="showAddTask ? 'red' : 'green'" />
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 10px;
  margin-bottom: 15px;

  /* border-bottom: 1px solid black; */
  color: #090030;
  background-color: #fbfcfc;

  -webkit-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
  -moz-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
  box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
}

.home-tabs {
  color: var(--main-color);
  display: flex;
  font-size: 14px;
  font-weight: 100;
  letter-spacing: 0.15em;
  height: 40px;
  justify-content: space-between;
  line-height: 16px;
  list-style-type: none;
  margin: 0;
  max-width: 400px;
  padding: 0px 20px;
  padding-top: 10px;
  text-align: center;
  width: 40%;
  min-width: 240px;
}

.home-tabs li {
  /* border-bottom: solid 1px #0c0040; */
  cursor: pointer;
  opacity: 0.6;
  padding-top: 10px;

  text-transform: uppercase;
  width: 100%;
}

.home-tabs li:hover {
  color: #d89b00;
  opacity: 0.7;
  transition: 0.2s;
}

.home-tabs li.active {
  border-bottom: solid 2px #090030;
  margin-top: -2px;
  opacity: 1;
  transform: scale(1.02);
  transition: 0.2s;
  /* 
    -webkit-box-shadow: 0px 5px 5px -5px rgba(9, 0, 48, 0.6);
    -moz-box-shadow: 0px 5px 5px -5px rgba(9, 0, 48, 0.6);
    box-shadow: 0px 5px 5px -5px rgba(9, 0, 48, 0.6); */
}
</style>
