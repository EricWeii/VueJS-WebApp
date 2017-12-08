<template>
  <div class="shoppingcart">
    <section class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div><!-- END logo-wrapper -->
        <div class="price" :class="{'highlight': totalPrice > 0}">¥ {{totalPrice}}</div><!-- END price -->
        <div class="desc">另需配送费¥ {{deliveryPrice}}元</div><!-- END desc -->
      </div><!-- END content-left -->
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="{'payClass': payDesc == '去结算'}">{{payDesc}}</div>
      </div><!-- END content-right -->
    </section><!-- END CONTENT -->

    <section class="ball-container">
      <div class="ball" v-for="ball in balls" v-show="ball.show" transition="drop">
        <div class="inner inner-hook"></div>
      </div>
    </section><!-- END BALL-CONTAINER -->

    <section class="shoppingcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div><!-- END list-header -->
      <div class="list-content" v-el:list-content>
        <ul>
          <li class="food border-1px" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price"><span>¥ {{food.price * food.count}}</span></div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div><!-- END list-content -->
    </section><!-- END SHOPPINGCART-LIST -->
  </div><!-- END SHOPPINGCART -->
  <div class="list-mask" v-show="listShow" transition="fade" @click="fold=true"></div><!-- END LIST-MASK -->
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥ ${this.minPrice}起送`;
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          return `还差¥ ${this.minPrice - this.totalPrice}起送`;
        } else if (this.totalPrice) {
          return '去结算';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
        return show;
      }
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`您需支付${this.totalPrice}元`);
      }
    },
    transitions: {
      drop: {
        beforeEnter (el) { // el是要执行动画的DOM元素，在此处即为transition="drop" 属性所在的DOM元素
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 38;
              let y = -(window.innerHeight - rect.top - 23);
              el.style.display = '';
//              设置每个ball的初始位置
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter (el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)';
            el.style.transform = 'translate3d(0, 0, 0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0, 0, 0)';
            inner.style.transform = 'translate3d(0, 0, 0)';
          });
        },
        afterEnter (el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }
      }
    },
    components: {
      BScroll,
      cartcontrol
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .shoppingcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      font-size: 0;
      .content-left {
        flex: 1;
        background-color: #141d27;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          margin: 0 18px;
          padding: 6px;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background-color: @color43;
            &.highlight {
              background-color: @color160;
              .icon-shopping_cart {
                color: #fff;
              }
            }
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              vertical-align: top;
              padding-top: 12px;
              color: @color255-4;
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 9px;
            font-weight: 700;
            border-radius: 16px;
            color: #fff;
            background-color: @color240;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price,
        .desc {
          margin-top: 12px;
          color: #919396;
        }
        .price {
          display: inline-block;
          vertical-align: top;
          padding-right: 12px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          box-sizing: border-box;
          border-right: 1px solid @color255-1;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 12px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          background-color: @color43;
          font-size: 12px;
          color: @color255-4;
          font-weight: 700;
          &.payClass {
            background-color: #00AD2C;
            color: #fff;
          }
        }

      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 38px;
        bottom: 23px;
        z-index: 200;
        &.drop-transition {
          transition: all .4s cubic-bezier(.39, -0.39, .68, .68);
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: @color160;
            transition: all .4s linear;
          }
        }
      }
    }
    .shoppingcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transition: all .2s ease-out;
      &.fold-transition {
        transform: translate3d(0, -100%, 0);
      }
      &.fold-enter, &.fold-leave {
        transform: translate3d(0, 0, 0);
      }

      .list-header {
        height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid @color7-1;
        .title {
          float: left;
          font-size: 14px;
          font-weight: 200;
          color: @color7;
          line-height: 40px;
        }
        .empty {
          font-size: 12px;
          color: @color160;
          line-height: 40px;
          float: right;
        }
      }

      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background-color: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(@color7-1);
          .name {
            line-height: 24px;
            font-size: 14px;
            color: @color7;
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            color: @color240;
            font-weight: 700;
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    -webkit-backdrop-filter: blur(10px);
    transition: all .1s ease-in;
    &.fade-transition {
      opacity: 1;
      background-color: @color7-6;
    }
    &.fade-enter, &.fade-leave {
      opacity: 0;
      background-color: transparent;
    }
  }
</style>
