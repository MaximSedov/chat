<template>
  <div class="navbar">
    <div class v-if="isLogin">
      <el-button type="danger" @click="signOut">Выйти</el-button>
    </div>

    <div class v-else>
      <el-button type="success" @click="signIn">Войти</el-button>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/firebase'
export default {
  setup() {
    const { user, isLogin, signIn, signOut } = useAuth()
    return { user, isLogin, signIn, signOut }
  },
}
</script>

<style lang="scss">
.navbar {
    padding: 0.5rem;
  background-color: #082032;
  text-align: right;
  height: 100%;
  box-sizing: border-box;
}
</style>