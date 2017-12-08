<template>
  <div class="ratingselect">
    <section class="rating-type border-1px">
      <span class="block positive" :class="{'active':selectType===2}" @click="select(2, $event)">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':selectType===0}" @click="select(0, $event)">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':selectType===1}" @click="select(1, $event)">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </section><!-- END RATING-TYPE -->

    <section class="switch border-1px" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </section><!-- END SWITCH -->
  </div><!-- END RATINGSELECT -->
</template>

<script type='text/ecmascript-6'>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$dispatch('ratingtype.select', type); // 子组件和父组件之间通信，子组件给父组件派发事件的方式传递数据
      },
      toggleContent (event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$dispatch('content.toggle', this.onlyContent); // 子组件和父组件之间通信，子组件给父组件派发事件的方式传递数据
      }
    }
  };
</script>

<style lang='less' rel='stylesheet'>
  @import "../../common/less/mixin";
  @import "../../common/less/var";

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(@color7-1);
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        font-size: 12px;
        line-height: 16px;
        color: @color77;
        border-radius: 1px;
        background-color: @color160-2;
        .count {
          font-size: 8px;
          margin-left: 4px;
        }
      }
      .positive {
        &.active {
          color: #fff;
          background-color: @color160;
        }
      }
      .negative {
        background-color: @color77-2;
        &.active {
          color: #fff;
          background-color: @color77;
        }
      }
    }
    .switch {
      padding: 12px 18px;
      font-size: 0;
      line-height: 24px;
      border-bottom: 1px solid @color7-1;
      color: @color147;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }

</style>
