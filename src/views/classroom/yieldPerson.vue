<template>
  <div class="box_community">
    <!-- 头部 -->
    <!-- <div class="top"></div>
    <div class="top_search">
      <img src="/static/img/fanhui@2x.png" style="width:8px;height:14px" />
      <span class="title">社区概况</span>
      <img src="/static/img/shenglue@2x.png" style="width:18.5px;height:3.5px" />
    </div> -->

    <div class="blocklist" style="margin-top:0px">
      <div class="title2">
        <span class="title1">订单时间</span>
        <span class="title1">订单号</span>
        <span class="title1">成交数量</span>
        <span class="title1">返利数量</span>
      </div>
      <div class="tableCell" v-for="(item,index) in data1" :key="index">
        <div class="items">
          <span class="content">{{item.orderTime}}</span>
          <span class="content">{{item.orderNum}}</span>
          <span class="content">{{item.amount}}</span>
          <span class="content">{{item.tradeAmount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footers from "../../components/Footers.vue";
import Vue from "vue";
import MintUI from "mint-ui";
import { InfiniteScroll, Toast, Navbar, TabItem, Indicator } from "mint-ui";
Vue.use(MintUI, InfiniteScroll, Toast, Navbar, TabItem, Indicator);
export default {
  name: "yieldPerson",
  data() {
    return {
      data1: [],
      page: 1,
      pageSize: 10,
      loading: false,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      console.log(this.page)
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.$axios.post("/api/community/instantRebates", form).then(res => {
        console.log(res);
        this.data1 = this.data1.concat(res.data.data.records);
        ++this.page;
        if(res.data.data.records.length<this.pageSize){
          this.loading = true;
        }else{
          this.loading = false;
        }
        Indicator.close();
      })
    },
    loadMore() {
      this.getData();
    }
  },
  components: { Footers },
  mounted() {
    this.getData();
    Indicator.open({
      text:'加载中...',
      spinnerType: "fading-circle"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "src/common/css/mixin";
$background: #6eb35c;
html,
body {
  height: 100%;
}
.box_community {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.top {
  height: Rem(20);
  background: #4d99ff;
}
.top_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: Rem(12.5) Rem(17) 0;
}
.title {
  height: Rem(43);
  font-size: Rem(20);
  font-weight: bold;
}
.blocklist {
  background: #f1f1f1;
  width: 100%;
}
.title2 {
  width: 100%;
  box-sizing: border-box;
  //   padding: 0 Rem(37) 0 Rem(37);
  height: Rem(43);
  font-size: Rem(13);
  color: #ffffff;
  background: #0737b7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(#0737b7, #418ffc);
  margin-bottom: Rem(8);
}
.title2 .title1 {
  width: 30%;
  text-align: center;
}

.tableCell {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  //   padding: 0 Rem(17) 0 Rem(18.5);
}
.tableCell .items {
  width: 100%;
  height: Rem(31);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  //   padding: 0 Rem(44.5) 0 Rem(7.5);
  box-sizing: border-box;
}
.tableCell .items .content {
  color: #333333;
  font-size: Rem(12);
  width: 30%;
  text-align: center;
}
</style>
