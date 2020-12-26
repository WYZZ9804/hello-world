<!-- <template>
  <div>
    <input v-model="xhValue" placeholder="小红说:" type="text" />
    <button @click="send">发送</button>


  </div>
</template>

<script>
  export default{
    comments:{

    },
    data(){
      return{
        xhValue:''
      }
    },
    methods:{
      send(){
        if(!this.xhValue){
          return
        }
        this.$emit('xhSend',{type:'xh',msg:this.xhValue })
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>
 -->