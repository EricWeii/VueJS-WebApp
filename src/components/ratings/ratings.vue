<template>
  <div class="ratings" v-el:ratings>
    <section class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div><!-- END overview-left -->
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>

          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>

          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div><!-- END overview-right -->
      </div><!-- END overview -->
      <split></split><!-- END split -->
      <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent"
                    :desc="desc"></ratingselect><!-- END ratingselect -->
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </section><!-- END RATINGS-CONTENT -->

    <shoppingcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice" v-ref:shoppingcart></shoppingcart><!-- END SHOPPINGCART -->
  </div><!-- END RATINGS -->
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import { formatDate } from 'common/js/formatdate';
  import shoppingcart from 'components/shoppingcart/shoppingcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingselect from 'components/ratingselect/ratingselect';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true
      };
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      });
    },
    methods: {
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
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
    components: {
      star,
      split,
      BScroll,
      ratingselect,
      shoppingcart,
      cartcontrol
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .ratings {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    left: 0;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
          flex: 0 0 137px;
          width: 137px;
          text-align: center;
          border-right: 1px solid @color7-1;
          @media only screen and (max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .score {
            margin-bottom: 6px;
            font-size: 24px;
            color: @color153;
            line-height: 28px;
          }
          .title {
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 12px;
            color: @color7;
            line-height: 12px;
          }
          .rank {
            margin-bottom: 6px;
            font-size: 10px;
            color: @color147;
            line-height: 10px;
          }
        }
        .overview-right {
          flex: 1;
          padding-left: 24px;
          @media only screen and (max-width: 320px) {
            padding-left: 6px;
          }
          .score-wrapper {
            margin-bottom: 8px;
            font-size: 0;
            .title {
              line-height: 18px;
              font-size: 12px;
              font-weight: 600;
              color: @color7;
            }
            .star {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              vertical-align: top;
              font-size: 12px;
              color: @color153;
              line-height: 18px;
            }
          }
          .delivery-wrapper {
            font-size: 0;
            .title {
              font-size: 12px;
              font-weight: 600;
              line-height: 18px;
              color: @color7;
            }
            .delivery {
              margin: 0 12px;
              font-size: 12px;
              color: @color147;
            }
          }
        }
      }

      .rating-wrapper {
        padding: 0 18px;

        .rating-item {
          display: flex;
          padding: 18px 0;
          .border-1px(@color7-1);

          .avatar {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img {
              border-radius: 50%;
            }
          }

          .content {
            flex: 1;
            position: relative;

            .name {
              margin-bottom: 4px;
              font-size: 10px;
              color: @color7;
              line-height: 12px;
            }

            .star-wrapper {
              margin-bottom: 6px;
              font-size: 0;
              .star {
                margin-right: 6px;
                display: inline-block;
                vertical-align: top;
              }

              .delivery {
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                font-weight: 200;
                color: @color147;
                line-height: 12px;
              }
            }

            .text {
              margin-bottom: 8px;
              font-size: 12px;
              color: @color7;
              line-height: 18px;
            }

            .recommend {
              font-size: 0;
              .icon-thumb_up,
              .recommend-item {
                display: inline-block;
                margin: 0 8px 4px 0;
              }
              .icon-thumb_up {
                font-size: 12px;
                color: @color160;
                line-height: 16px;
              }
              .recommend-item {
                padding: 0 6px;
                line-height: 16px;
                font-size: 9px;
                color: @color147;
                background-color: #fff;
                border-radius: 1px;
                border: 1px solid @color7-1;
              }
            }

            .time {
              position: absolute;
              top: 0;
              right: 0;
              font-size: 10px;
              font-weight: 200;
              color: @color147;
              line-height: 12px;
            }
          }
        }
      }

    }
  }
</style>
