<template>
  <div class="home">
    <el-row justify="center" style="height:5%;">
      <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10">
        <Navbar />
      </el-col>
    </el-row>
    <el-row justify="center" style="height:95%;">
      <el-col :xs="24" :sm="12" :md="10" :lg="10" :xl="10" style="position:relative;height:100%;">
        <ChatWindow />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Navbar from '@/components/Navbar.vue' // @ is an alias to /src
import ChatWindow from '@/components/ChatWindow.vue' // @ is an alias to /src

@Options({
  components: {
    Navbar,
    ChatWindow,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
