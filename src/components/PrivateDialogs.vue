<template>
  <div class="private_dialogs">
    <div class="private_dialogs__dialog" v-if="privateMessagesOpened == false" @click="openMessages(user)" v-for=" user in testUsers" :key="user.id">
      <div class="user-photo">
        <img :src="user.userPhoto" style="width:80px;border-radius:50%;display:block" />
      </div>
      <div class="user-name">{{user.name}}</div>
    </div>

    <div class="returnToDialogs" v-if="privateMessagesOpened == true">
      <div class style="display:flex; align-items:center">
        <div class style="margin-right:1rem;">
          <img :src="privateMessageOpenedUser.userPhoto" style="width:40px;border-radius:50%;display:block" />
        </div>
        <div class style="color:white;">
          Диалог с пользователем
          <br />
          {{privateMessageOpenedUser.name}}
        </div>
      </div>
      <div class>
        <el-button type="info" @click="returnToDialogs" color="#5972d3">К диалогам</el-button>
      </div>
    </div>

    <!-- <Message v-for="{id, text, userPhotoURL, userName, userId, createdAt} in messages" :key="id" :createdAt="createdAt" :name="userName" :photo-url="userPhotoURL" :sender="userId === user?.uid">{{text}}</Message> -->
    <div class ref="anchor"></div>
  </div>
</template>

<script>
import Message from './Message.vue'
export default {
  data() {
    return {
      privateMessagesOpened: false,
      privateMessageOpenedUser: {},
      //  --- потом убрать ---
      testUsers: [
        {
          id: 'c64ZrhgKOlaiuKRH5PRGnqhH4b32',
          name: 'Maxim Sedov',
          userPhoto:
            'https://lh3.googleusercontent.com/a-/AOh14GghqzmDRMxTc2ojSYeQ5tI6wnBQ5Uq7X6CM0sNm=s96-c',
        },
        {
          id: 'JERDD9mXHVXrB7Y5V3AUWPsuVUI2',
          name: 'Матвей Карасев',
          userPhoto:
            'https://lh3.googleusercontent.com/a-/AOh14Ggzv5KX2sBnoYkr6W-JgIobYTiLOszV357IC8wyDg=s96-c',
        },
      ],
      // ---
    }
  },
  methods: {
    openMessages(user) {
      this.privateMessagesOpened = true
      this.privateMessageOpenedUser = user
      this.$emit('privateMessagesOpened', this.privateMessagesOpened)
    },
    returnToDialogs() {
      this.privateMessagesOpened = false
      this.$emit('privateMessagesOpened', this.privateMessagesOpened)
    },
  },

  components: {
    Message,
  },
}
</script>

<style lang="scss">
.private_dialogs {
  &__dialog {
    display: flex;
    border-radius: 1rem;
    background-color: #212a50;
    padding: 1rem;
    align-items: center;
    margin-bottom: 1rem;
    &:hover {
      cursor: pointer;
      background-color: #32407b;
    }
    .user-name {
      color: white;
      font-size: 1.4rem;
      margin-left: 1rem;
    }
  }
  .returnToDialogs {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>