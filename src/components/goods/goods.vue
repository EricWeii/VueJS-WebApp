<template>
  <div class="goods">
    <section class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current': currentIndex == $index}"
            @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </section><!-- END MENU-WRAPPER -->

    <section class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food, $event)">
              <div class="icon"><img :src="food.icon"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol><!-- END cartcontrol -->
                </div>
              </div>
            </li>
          </ul>

        </li>
      </ul>
    </section><!-- END FOODS-WRAPPER -->

    <shoppingcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice" v-ref:shoppingcart></shoppingcart><!-- END SHOPPINGCART -->
  </div><!-- END GOODS -->

  <food :food="selectedFood" v-ref:food></food><!-- END FOOD -->
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import shoppingcart from 'components/shoppingcart/shoppingcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let currentHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];

          if (this.scrollY >= currentHeight && this.scrollY < nextHeight || !nextHeight) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () { // 请求后台数据
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];

        this.foodsScroll.scrollToElement(el, 300); // 滚动到相应的DOM, 第一个参数是dom，第二参数表动画时间(毫秒)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => { // 监听实时滚动的位置pos
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _drop (target) {
        this.$nextTick(() => { // 优化动画，异步执行下落动画，避免卡顿
          this.$refs.shoppingcart.drop(target);
        });
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    events: {
      'cart.add' (target) {
        this._drop(target);
      }
    },
    components: {
      shoppingcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    display: flex;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          background-color: #fff;
          .text {
            font-weight: 700;
            .border-none;
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          .border-1px(@color7-1);
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-img('decrease_3');
            }
            &.discount {
              .bg-img('discount_3');
            }
            &.guarantee {
              .bg-img('guarantee_3');
            }
            &.invoice {
              .bg-img('invoice_3');
            }
            &.special {
              .bg-img('special_3');
            }
          }
        }

      }
    }
    .foods-wrapper {
      flex: 1;
      .food-list {
        .title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: @color147;
          background-color: #f3f5f7;
        }
        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          .border-1px(@color7-1);
          &:last-child {
            .border-none;
            margin-bottom: 0;
          }
          .icon {
            flex: 0 0 57px;
            width: 57px;
            margin-right: 10px;
            img {
              width: 57px;
            }
          }
          .content {
            flex: 1;
            .name {
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: @color7;
            }
            .desc, .extra {
              font-size: 10px;
              line-height: 10px;
              color: @color147;
            }
            .desc {
              margin-bottom: 8px;
              line-height: 12px;
            }
            .extra {
              .count {
                margin-right: 12px;
              }
            }
            .price {
              font-weight: 700;
              line-height: 24px;
              .now {
                margin-right: 8px;
                line-height: 24px;
                font-size: 14px;
                color: @color240;
              }
              .old {
                text-decoration: line-through;
                font-size: 10px;
                line-height: 24px;
              }
            }
            .cartcontrol-wrapper {
              position: absolute;
              right: 0;
              bottom: 12px;
            }
          }
        }
      }
    }
  }

</style>
