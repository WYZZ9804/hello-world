<!-- <template>
  <div>
    <input v-model="xmValue" placeholder="小明说:" type="text" />
    <button @click="send">发送</button>


  </div>
</template>

<script>
  export default{
    comments:{

    },
    data(){
      return{
        xmValue:''
      }
    },
    methods:{
      send(){
        if(!this.xmValue){
          return
        }
        this.$emit('xmSend',{type:'xm',msg:this.xmValue })
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>
 -->