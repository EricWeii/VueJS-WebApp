<template>
  <div class="food" v-show="showFlag==true" transition="move" v-el:food>
    <section class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <!--<div class="back" @click.stop="showFlag=false">
          <i class="icon-arrow_lift"></i>
        </div>-->
      </div><!-- END image-header-->

      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span><span class="applause-rate">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥ {{food.price}}</span>
          <span class="old" v-show="food.oldPrice">¥ {{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count===0" @click="addFirst" transition="fade">加入购物车
        </div>
      </div><!-- END content-->

      <split v-show="food.info"></split><!-- END split-->

      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div><!-- END info-->

      <split></split><!-- END split-->

      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent"
                      :desc="desc"></ratingselect>
      </div><!-- END rating -->

      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-for="rating in food.ratings" class="rating-item border-1px"
              v-show="needShow(rating.rateType, rating.text)">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" :src="rating.avatar" width="12" height="12">
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
            <p class="text">
              <span
                :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
            </p>
          </li>
        </ul>
        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
      </div><!-- END rating-wrapper -->
    </section><!-- END FOOD-CONTENT -->

    <section class="back" @click.stop="showFlag=false">
      <i class="icon-arrow_lift"></i>
    </section><!-- END BACK -->
  </div><!-- END FOOD -->
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import split from 'components/split/split';
  import {formatDate} from 'common/js/formatdate';
  import ratingselect from 'components/ratingselect/ratingselect';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  const ALL = 2;

  export default {
    data () {
      return {
        showFlag: {
          type: Boolean,
          default: false
        },
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      addFirst (event) {
        console.log(this.food);
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        this.$dispatch('cart.add', event.target);
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    events: {
      'ratingtype.select' (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle' (onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      BScroll,
      split,
      cartcontrol,
      ratingselect
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .food {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    z-index: 30;
    background-color: #fff;
    transition: all .2s ease-out;
    &.move-transition {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    &.move-enter, &.move-leave {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      /* .back {
         position: absolute;
         top: 10px;
         left: 9px;
         border-radius: 50%;
         background-color: @color255-2;
         .icon-arrow_lift {
           display: block;
           padding: 8px;
           font-size: 16px;
           color: #fff;
         }
       }*/
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: @color7;
        line-height: 14px;
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        .sell-count, .applause-rate {
          font-size: 10px;
          color: @color147;
          line-height: 10px;
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-size: 0;
        .now {
          margin-right: 8px;
          font-size: 14px;
          font-weight: 700;
          color: @color240;
          line-height: 24px;
        }
        .old {
          font-size: 10px;
          font-weight: 700;
          color: @color147;
          line-height: 24px;
          text-decoration: line-through;
        }
      }
      .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        box-sizing: border-box;
        height: 24px;
        line-height: 26px;
        padding: 0 12px;
        color: #fff;
        font-size: 10px;
        border-radius: 12px;
        background-color: @color160;
        transition: all .2s linear;
        &.fade-transition {
          opacity: 1;
        }
        &.fade-enter, &.fade-leave {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        margin-bottom: 6px;
        line-height: 14px;
        font-size: 14px;
        color: @color7;
      }
      .text {
        text-indent: 24px;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 200;
        color: @color77;
        line-height: 24px;
      }
    }
    .rating {
      padding: 18px 0;
      .title {
        margin-left: 18px;
        line-height: 14px;
        font-size: 14px;
        color: @color7;
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        position: relative;
        padding: 16px 0;
        .border-1px(@color7-1);
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: @color147;
      }
      .user {
        position: absolute;
        right: 0;
        top: 16px;
        line-height: 12px;
        font-size: 0;
        .name {
          display: inline-block;
          margin-right: 6px;
          vertical-align: top;
          font-size: 10px;
          color: @color147;
        }
        .avatar {
          border-radius: 50%;
        }
      }
      .time {
        margin-bottom: 6px;
        font-size: 10px;
        color: @color147;
        line-height: 12px;
      }
      .text {
        line-height: 16px;
        font-size: 12px;
        color: @color7;
        .icon-thumb_up, .icon-thumb_down {
          margin-right: 4px;
          font-size: 12px;
          line-height: 16px;
        }
        .icon-thumb_up {
          color: @color160;
        }
        .icon-thumb_down {
          color: @color147;
        }

      }
    }

    /* BEGIN: BACK */
    .back {
      position: absolute;
      top: 10px;
      left: 9px;
      border-radius: 50%;
      background-color: @color255-2;
      .icon-arrow_lift {
        display: block;
        padding: 8px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>
