<template>
  <div class="box_community">
    <!-- 头部 -->
    <!-- <div class="top"></div>
    <div class="top_search">
      <img src="/static/img/fanhui@2x.png" style="width:8px;height:14px" />
      <span class="title">收益明细</span>
      <img src="/static/img/shenglue@2x.png" style="width:18.5px;height:3.5px" />
    </div> -->

    <div class="blocklist" style="margin-top:0px">
      <div class="cell">
        <table>
          <tr>
            <th></th>
            <th>昨日</th>
            <th>累计</th>
          </tr>
          <tr>
            <td>个人收益 (EUSDT)</td>
            <td>{{allData.personalEarnings}}</td>
            <td>{{allData.sumPersonalEarnings}}</td>
          </tr>
          <tr>
            <td>团队收益 (EUSDT)</td>
            <td>{{allData.teamEarnings}}</td>
            <td>{{allData.sumTeamEarnings}}</td>
          </tr>
          <tr>
            <td>全部收益 (EUSDT)</td>
            <td>{{allData.allEarnings}}</td>
            <td>{{allData.sumAllEarnings}}</td>
          </tr>
        </table>
      </div>
      <div class="title2">
        <span class="title1">日期</span>
        <span class="title1">个人收益</span>
        <span class="title1">团队收益</span>
        <span class="title1">总收益</span>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
        <div class="tableCell" v-for="(item,index) in data1" :key="index">
          <div class="items">
            <span class="date">{{item.ctime}}</span>
            <div class="items1">
              <span class="content">{{item.personalEarnings}}</span>
              <span class="content">{{item.teamEarnings}}</span>
              <span class="content">{{item.allEarnings}}</span>
            </div>
          </div>
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
  name: "yieldDetail",
  data() {
    return {
      data1: [], //明细列表
      tatal: 0, //明细总数
      page: 1,
      pageSize: 10,
      loading: false,
      allData: {
        iPage: {},
        teamEarnings: "0",
        sumPersonalEarnings: "0",
        sumAllEarnings: "0",
        sumTeamEarnings: "0",
        personalEarnings: "0",
        allEarnings: "0"
      }
    };
  },
  methods: {
    getYield() {
      this.loading = true;
      console.log(this.page);
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.$axios.post("/api/community/earningsDetailed", form).then(res => {
        console.log(res);
        Indicator.close();
        if (res.data.code == 100) {
          this.data1 = this.data1.concat(res.data.data.iPage.records);
          this.allData = res.data.data;
          ++this.page;
          if (res.data.data.records.length < this.pageSize) {
            this.loading = true;
          } else {
            this.loading = false;
          }
        } else {
          Indicator.open({
            text: res.data.msg
          });
          setTimeout(()=>{
            Indicator.close();
          },1000)
        }
      });
    },
    loadMore() {
      this.getYield();
    }
  },
  components: { Footers },
  mounted() {
    this.getYield();
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
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
  font-size: Rem(20);
  font-weight: bold;
}
.blocklist {
  background: #f1f1f1;
}
.cell {
  width: 341px;
  height: 184px;
  background: #0737b7;
  background-image: linear-gradient(#0737b7, #418ffc);
  border-radius: 10px;
  margin-top: Rem(12.5);
  margin-left: 17px;
  padding: 24.5px 10.5px 14.5px 0;
  box-sizing: border-box;
  margin-bottom: Rem(10);
}
table,
th,
td {
  font-size: 14px;
  color: #ffffff;
}
table {
  width: 320px;
  height: 166px;
  text-align: center;
}
.title2 {
  width: 100%;
  height: Rem(43);
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 Rem(30) 0 Rem(18.5);
}
.title2 .title1 {
  color: #333333;
  font-size: 13px;
  font-weight: Medium;
  font-size: PingFang-SC-Medium;
}

.tableCell {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 Rem(17) 0 Rem(18.5);
}
.tableCell .items {
  width: 100%;
  height: 27.5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 Rem(28) 0 0;
  box-sizing: border-box;
}
.tableCell .items .date {
  color: #666666;
  font-size: 11px;
  margin-right: 34.5px;
  display: flex;
  flex: 0 0 70px;
}
.tableCell .items .items1 {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.tableCell .items .content {
  color: #333333;
  font-size: 14px;
}
</style>
