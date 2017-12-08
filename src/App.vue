<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { urlParse } from 'common/js/util';
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
//          this.seller = response.data;
          this.seller = Object.assign({}, this.seller, response.data);
          console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="less" rel='stylesheet'>
  @import "./common/less/var";
  @import "./common/less/mixin"; //1px边框

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid @color7-1;
    .border-1px(@color7-1);
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: @color77;
        &.active {
          color: @color240;
        }
      }
    }
  }
</style>
