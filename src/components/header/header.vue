<template>
  <div class="header">
    <section class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div><!-- END avatar -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div><!-- END title -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div><!-- END description -->
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div><!-- END supports -->
      </div><!-- END content -->
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </section><!-- END CONTENT-WRAPPER -->

    <section class="bulletin-wrapper" @click="detailShow=true">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </section><!-- END BULLETIN-WRAPPER -->

    <section class="background">
      <img :src="seller.avatar">
    </section><!-- END BACKGROUND -->

    <section v-show="detailShow" class="detail" @click="detailShow=false" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div><!-- END detail-wrapper -->
      <div class="detail-close" @click="detailShow=false">
        <i class="icon-close"></i>
      </div><!-- END detail-close -->
    </section><!-- END DETAIL -->
  </div><!-- END HEADER -->
</template>

<script type='text/ecmascript-6'>
  import star from 'components/star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";
  @import "../../common/less/base";

  .header {
    position: relative;
    color: #fff;
    overflow: hidden;
    background: @color7-5;
    .content-wrapper {
      position: relative;
      font-size: 0;
      padding: 24px 12px 18px 24px;
      .avatar {
        vertical-align: top;
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            .bg-img('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
          font-weight: 200;
        }
        .supports {
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-img('decrease_1');
            }
            &.discount {
              .bg-img('discount_1');
            }
            &.guarantee {
              .bg-img('guarantee_1');
            }
            &.invoice {
              .bg-img('invoice_1');
            }
            &.special {
              .bg-img('special_1');
            }
          }
          .text {
            line-height: 13px;
            font-size: 10px;
            font-weight: 200;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 16px;
        padding: 7px 8px;
        background: rgba(0, 0, 0, .2);
        border-radius: 14px;
        font-weight: 200;
        .count {
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          margin-left: 2px;
        }
      }
    }
    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 30px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
      background: @color7-2;
      .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        margin-top: 8px;
        vertical-align: top;
        .bg-img(bulletin);
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
        font-weight: 200;
        margin: 0 4px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        right: 12px;
        top: 10px;
        font-size: 10px;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: all .2s ease-out;
      backdrop-filter: blur(10px);
      &.fade-transition {
        opacity: 1;
        background-color: @color7-8;
      }
      &.fade-enter, &.fade-leave {
        opacity: 0;
        background-color: transparent;
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line {
              flex: 1;
              position: relative;
              top: -7px;
              border-bottom: 1px solid rgba(255, 255, 255, .5);
            }
            .text {
              padding: 0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  .bg-img('decrease_2');
                }
                &.discount {
                  .bg-img('discount_2');
                }
                &.guarantee {
                  .bg-img('guarantee_2');
                }
                &.invoice {
                  .bg-img('invoice_2');
                }
                &.special {
                  .bg-img('special_2');
                }
              }
              .text {
                font-size: 12px;
                font-weight: 200;
                line-height: 16px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
              padding: 0 12px;
              font-size: 12px;
              line-height: 24px;
              font-weight: 200;
            }

          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
