<template>
  <div style="height:100%">
    <div class="chat-block">
      <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
        <el-tab-pane label="Общий чат" name="first">
          <Message
            v-for="{id, text, userPhotoURL, userName, userId, createdAt} in messages"
            :key="id"
            :createdAt="createdAt"
            :name="userName"
            :photo-url="userPhotoURL"
            :sender="userId === user?.uid"
          >{{text}}</Message>
          <div class ref="anchor"></div>
        </el-tab-pane>

        <el-tab-pane label="Диалоги" name="second">
          <PrivateDialogs />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class v-if="isLogin" style="height:5%">
      <div class="form">
        <form action @submit.prevent="send">
          <div class style="width:100%;height:100%; display:flex;justify-content: space-between;align-items: center;">
            <el-input style="width:80%" v-model="message" placeholder="Напишите здесь..." required />
            <el-button native-type="submit" :icon="ArrowRightBold" v-if="message != ''"></el-button>
          </div>
        </form>
      </div>
    </div>
    <div style="height:5%;background-color: #082032;" class v-else></div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'
import Message from './Message.vue'
import PrivateDialogs from './PrivateDialogs.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
export default {
  components: { Message, PrivateDialogs },
  setup() {
    const activeName = ref('first')
    const { user, isLogin } = useAuth()
    const { messages, sendMessage } = useChat()
    const anchor = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          anchor.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )
    const message = ref('')
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }

    return {
      user,
      isLogin,
      messages,
      anchor,
      message,
      send,
      ArrowRightBold,
      activeName,
    }
  },
}
</script>

<style lang="scss">
.chat-block {
  background-color: #082032;
  padding: 0.5rem;
  box-sizing: border-box;
  height: 95%;
  .el-tabs {
    height: 100%;
    &__header {
      height: 5%;
    }
    &__content {
      height: 95%;
      overflow: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
    &__item {
      font-size: 1.2rem;
      font-weight: bold;
      color: white;
    }
    &__item.is-active {
      color: #5972d3;
    }
    &__active-bar {
      background-color: #5972d3;
    }
  }
}
.form {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: #32407b;
  height: 100%;
  form {
    display: flex;
    align-items: center;
    height: 100%;
  }
  input {
    display: block;
    line-height: 100%;
    box-sizing: border-box;
    width: 90%;
    background-color: #32407b;
    border: none;
    color: white;
    font-size: 1.2rem;
  }
  button {
    width: 20%;
    box-sizing: border-box;
    //padding: 1.5rem 0;
    background-color: #32407b;
    border: none;
    justify-content: flex-end;
    padding: 0;
    &:hover {
      background-color: #32407b;
    }
  }
  .el-icon {
    height: 2rem !important;
    width: 2rem;
    color: #eeeeee;
    &:hover {
      color: white;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>