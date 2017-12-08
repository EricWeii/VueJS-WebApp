<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="food.count--" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div><!-- END CART-DECREASE -->

    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div><!-- END CART-COUNT -->

    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div><!-- END CART-ADD -->
  </div><!-- END CARTCONTROL -->
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }

        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$dispatch('cart.add', event.target);
      }
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/var";

  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.2s linear;
      &.move-transition {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner {
          transform: rotate(0deg);
        }
      }
      &.move-enter, &.move-leave {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(270deg);
        }
      }
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: @color160;
        transition: all 0.2s ease-in;
      }
    }
    .cart-count {
      display: inline-block;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      vertical-align: top;
      width: 12px;
      font-size: 10px;
      color: @color147;

    }
    .cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: @color160;
    }
  }
</style>
