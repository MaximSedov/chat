<template>
  <div class="message">
    <div class="flex" :class="sender ? 'flex-row-reverse' : 'flex-row-default'">
      <div class="message-box">
        <div :class="sender ? 'active-bg' : 'default-bg'">
          <div v-if="!sender" class="author">
            <span>{{ name }}</span>
            <br />
          </div>
          <slot />
          <div class="timestamp">{{timeConverter}}</div>
          
        </div>
        <img :src="photoUrl" style="width:35px;border-radius:50%;display:block" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false },
    createdAt: { type: Object, default: {} },
  },

  data() {
    return {
      converteredTime: '',
    }
  },
  computed: {
    timeConverter() {
      if (this.createdAt != null) {
        var a = new Date(this.createdAt.seconds * 1000)
      var months = [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ]
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      var sec = a.getSeconds()
      var time =
        date + ' ' + month + ' ' + hour + ':' + min
      return (this.converteredTime = time)
      }
      else {
        return (this.converteredTime = null)
      }
      
    },
  },
}
</script>
<style lang="scss">
.flex {
  display: flex;
  margin-bottom: 1rem;
  box-sizing: border-box;
  &-row-reverse {
    justify-content: right;
    .message-box {
      display: flex;
      align-items: flex-end;
      .active-bg {
        background-color: #0f4c75;
        padding: 1rem;
        border-radius: 1rem;
        margin-right: 0.5rem;
        color: #eeeeee;
        .author {
          text-align: right;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .timestamp{
          margin-top: 0.4rem;
          font-size: 0.8rem;
          text-align: right;
          color: #1d84c9;
        }
      }
    }
  }

  &-row-default {
    .message-box {
      display: flex;
      align-items: flex-end;
      flex-direction: row-reverse;
      .default-bg {
        background-color: #32407b;
        padding: 1rem;
        border-radius: 1rem;
        margin-left: 0.5rem;
        color: #eeeeee;
        .author {
          text-align: left;
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .timestamp{
          margin-top: 0.4rem;
          font-size: 0.8rem;
          text-align: left;
          color: #5972d3;
        }
      }
    }
  }
}
</style>