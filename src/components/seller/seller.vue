<template>
  <div class="seller" v-el:seller>
    <div class="seller-content">
      <section class="overview">
        <h1 class="title">{{seller.name}}</h1>

        <div class="desc border-1px">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>

        <ul class="remark">
          <li class="block">
            <h2 class="desc-title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="desc-title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="desc-title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>

        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </section><!-- END overview -->
      <split></split><!-- END split -->
      <section class="bulletin">
        <h1 class="title">公告与活动</h1>

        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>

        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span>
          </li>
        </ul><!-- END supports -->
      </section><!-- END bulletin -->
      <section class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" v-el:pic-wrapper>
          <ul class="pic-list" v-el:pic-list>
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </section><!-- END pics -->
      <split></split><!-- END split -->
      <section class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </section>
    </div><!-- END SELLER-CONTENT -->

    <shoppingcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice" v-ref:shoppingcart></shoppingcart><!-- END SHOPPINGCART -->
  </div><!-- END SELLER -->
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import { saveToLocal, loadFromLocal } from 'common/js/favoritestore';
  import shoppingcart from 'components/shoppingcart/shoppingcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initSellerScroll();
          this._initPics();
        });
      }
    },
    ready () { // 初始化BScroll,优先于watch执行,DOM未渲染
      this.$nextTick(() => {
        this._initSellerScroll();
        this._initPics();
      });
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      _initSellerScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let ulWidth = (picWidth + margin) * this.seller.pics.length - margin;
          this.$els.picList.style.width = ulWidth + 'px';
        }
        // 初始化BScroll横向滚动
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$els.picWrapper, {
              scrollX: true, // 横向滚动
              eventPassthrough: 'vertical' // 横向滚动的同时，允许外部垂直滚动
            });
          } else {
            this.picScroll.refresh();
          }
        });
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    components: {
      BScroll,
      star,
      split,
      shoppingcart,
      cartcontrol
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .seller {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    left: 0;
    overflow: hidden;
    .seller-content {
      .overview {
        position: relative;
        padding: 18px;
        .title {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
          color: @color7;
        }
        .desc {
          padding-bottom: 18px;
          font-size: 0;
          .border-1px(@color7-1);
          .star {
            display: inline-block;
            margin-right: 8px;
            vertical-align: top;
          }
          .text {
            display: inline-block;
            margin-right: 12px;
            vertical-align: top;
            font-size: 10px;
            line-height: 18px;
            color: @color77;
          }
        }
        .remark {
          display: flex;
          padding-top: 18px;
          text-align: center;
          .block {
            flex: 1;
            border-right: 1px solid @color7-1;
            &:last-child {
              border: none;
            }
            .desc-title {
              margin-bottom: 4px;
              font-size: 10px;
              line-height: 10px;
              color: @color147;
            }
            .content {
              font-size: 10px;
              .stress {
                font-size: 24px;
                font-weight: 200;
                color: @color7;
                line-height: 24px;
              }
            }
          }
        }
        .favorite {
          position: absolute;
          top: 18px;
          right: 18px;
          text-align: center;
          width: 30px;
          font-size: 0;
          .icon-favorite {
            margin-bottom: 4px;
            display: block;
            font-size: 24px;
            line-height: 24px;
            color: #d4d6d9;
            &.active {
              color: @color240;
            }
          }
          .text {
            font-size: 10px;
            line-height: 10px;
            color: @color77;
          }
        }
      }
      .bulletin {
        padding: 18px 18px 0 18px;
        .title {
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
          color: @color7;
        }
        .content-wrapper {
          padding: 0 12px 16px 12px;
          .border-1px(@color7-1);
          .content {
            line-height: 24px;
            font-size: 12px;
            font-weight: 200;
            color: @color240;
          }
        }
        .supports {
          .support-item {
            padding: 16px 12px;
            font-size: 0;
            .border-1px(@color7-1);
            &:last-child {
              .border-none;
            }
            .icon {
              display: inline-block;
              vertical-align: top;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                .bg-img('decrease_4');
              }
              &.discount {
                .bg-img('discount_4');
              }
              &.guarantee {
                .bg-img('guarantee_4');
              }
              &.invoice {
                .bg-img('invoice_4');
              }
              &.special {
                .bg-img('special_4');
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
              font-weight: 200;
              color: @color7;
            }
          }
        }
      }
      .pics {
        padding: 18px;
        .title {
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
          color: @color7;
        }
        .pic-wrapper {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          .pic-list {
            font-size: 0;
            .pic-item {
              display: inline-block;
              margin-right: 6px;
              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
      .info {
        padding: 18px 18px 0 18px;
        color: @color7;
        .title {
          padding-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          line-height: 14px;
          .border-1px(@color7-1);
        }
        .info-item {
          padding: 16px 12px;
          line-height: 16px;
          font-size: 12px;
          font-weight:200;
          .border-1px(@color7-1);
          &:last-child {
            .border-none;
          }
        }
      }
    }
  }

</style>
