<template>
  <div class="box_community">
    <!-- 头部 -->
    <!-- <div class="top"></div> -->
    <!-- <div class="top_search">
      <img src="/static/img/fanhui@2x.png" style="width:8px;height:14px" />
      <span class="title">社区经纪人</span>
      <img src="/static/img/shenglue@2x.png" style="width:18.5px;height:3.5px" />
    </div> -->

    <div class="blocklist">
      <div class="memberInfo">
        <div class="name">
          <img
            src="static/img/live.png"
            style="width:63px;height:23.5px;margin-right:11px;display:inline-block"
          />
          <span class="member">{{community.identity}}</span>
        </div>

        <div class="liveUp" @click="gotoLiveUp">立即升级</div>
      </div>

      <div class="mingxi">
        <div class="grade">
          <div class="yield1">
            <span style="font-size:12px;color:#FFFFFF">昨日收益 (EUSDT)</span>
            <img
              src="static/img/question.png"
              style="width:12.5px;height:12px;margin-right:40.5px;"
              @click="lookYieldIntroduce"
            />
          </div>
          <div class="yield1">
            <span style="font-size:12px;color:#FFFFFF">累计收益 (EUSDT)</span>
            <img
              src="static/img/question.png"
              style="width:12.5px;height:12px"
              @click="lookYieldIntroduce"
            />
          </div>
        </div>

        <div class="grade">
          <span
            style="font-size:18px;color:#FFFFFF;margin-right:142.5px"
          >{{community.yesterdayEarnings}}</span>
          <span style="font-size:18px;color:#FFFFFF">{{community.accumulatedEarnings}}</span>
        </div>
      </div>
    </div>

    <div class="yield">
      <span style="color:#333333;font-size:17px;margin-left:17px;">收益明细</span>
      <div class="more" @click="gotoYieldDetail">
        <a style="font-size:13px;color:#418FFC;margin-right:8px">查看更多</a>
        <img src="static/img/right.png" style="width:6px;height:10px" />
      </div>
    </div>

    <div class="yield" style="    border-top: 10px solid #f1f1f1;">
      <span style="color:#333333;font-size:17px;margin-left:17px;">个人即时返利</span>
      <div class="more" @click="gotoPersonYeild">
        <a style="font-size:13px;color:#418FFC;margin-right:8px">查看更多</a>
        <img src="static/img/right.png" style="width:6px;height:10px" />
      </div>
    </div>

    <div class="condition">
      <div class="miaoshu">
        <span style="color:#333333;font-size:17px;margin-left:17px;">社区概况</span>
        <div class="more" @click="gotoCommunitySurvey">
          <a style="font-size:13px;color:#418FFC;margin-right:8px">查看更多</a>
          <img src="static/img/right.png" style="width:6px;height:10px" />
        </div>
      </div>
      <div class="items">
        <div class="item" style="margin-left:17px;margin-right:11px;">
          <span style="font-size:15px;color:#666666;margin-left:15px">我的直推</span>
          <span style="font-size:20px;color:#333333;margin-left:15px">{{community.lowerNumber}}</span>
        </div>
        <div class="item">
          <span style="font-size:15px;color:#666666;margin-left:15px">团队总人数</span>
          <span style="font-size:20px;color:#333333;margin-left:15px">{{community.totalTeamNumber}}</span>
        </div>
        <div class="item" style="margin-left:17px;margin-top:11px">
          <span style="font-size:15px;color:#666666;margin-left:15px">我的节点</span>
          <span style="font-size:20px;color:#333333;margin-left:15px">{{community.nodeNumber}}</span>
        </div>
      </div>

      <Button
        style="width:340.5px;height:33px;background: #0737b7;
            background-image: linear-gradient(#0737b7, #418ffc);border-radius:5px;margin-top:63.5px"
      >
        <span style="font-size:17px;color:#FFFFFF">去分享</span>
      </Button>
    </div>
    <!-- <Footers></Footers> -->
    <!-- 收益说明 -->
    <div id="explain" v-if="explain">
      <div id="kuang">
        <div style>
          <h1 style="text-align:center">收益说明</h1>
          <p>团队流水返利每天结算一次，次日统一发放</p>
        </div>
        <div style>
          <h2>昨日收益:</h2>
          <p>您昨天的团队流水返利</p>
        </div>
        <div>
          <h2>累计收益:</h2>
          <p>历史累计的您的团队流水返利总额</p>
        </div>
        <Button
          @click="IKnew"
          style="width:301px;height:33px; background: #0737b7;
            background-image: linear-gradient(#0737b7, #418ffc);
            border-radius:5px;margin-left:20px"
        >
          <span style="color:#FFFFFF;font-size:17px">我知道了</span>
        </Button>
      </div>
    </div>
    <!-- 代理信息 -->
    <div id="agency" v-if="agency">
      <div id="kuang1">
        <div class="agency1">
          <span style="margin-right:87px">代理商级别</span>
          <span>代理费</span>
        </div>
        <div
          class="agency2"
          @click="getagenctail(item)"
          v-for="(item,index) in agenctail"
          :key="index"
        >
          <div class="agentName">
            <img :src="item.checked?'static/img/choiced.png':'static/img/notChoice.png'" id="imgs" />
            <span>{{item.agentName}}</span>
          </div>
          <div class="agentCost">
            <p>{{item.agentCost}}EUSDT</p>
          </div>
        </div>
        <Button
          @click="liveUp"
          style="width:131px;height:30px; background: #2355DC;
            background-image: linear-gradient(#2355DC, #418ffc);
            border-radius:8px;margin-left:100px;margin-top:30px"
        >
          <span style="color:#FFFFFF;font-size:17px">确定升级</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Footers from "../../components/Footers.vue";
import Vue from "vue";
import MintUI from "mint-ui";
import { InfiniteScroll, Toast, Navbar, TabItem } from "mint-ui";
Vue.use(MintUI, InfiniteScroll, Toast, Navbar, TabItem);
export default {
  name: "community",
  data() {
    return {
      explain: false,
      agency: false,
      agenctail: [], //代理商级别列表
      agentId: "", //代理级别Id
      community: {
        yesterdayEarnings: 0,
        identity: "普通用户",
        lowerNumber: 0,
        nodeNumber: 0,
        totalTeamNumber: 0,
        accumulatedEarnings: 0
      }
    };
  },
  methods: {
    //查看收益说明
    lookYieldIntroduce() {
      this.explain = true;
    },
    //我知道了
    IKnew() {
      this.explain = false;
    },
    //确定升级
    liveUp() {
      //   this.agency = false;
      console.log(this.agentId);
      if (this.agentId) {
        this.$axios
          .post("/api/agent/upgrade", { agentId: this.agentId })
          .then(res => {
            if (res.data.code == 100) {
              Toast({
                message: "升级成功!",
              });
              this.getCommuniy();
              this.agency = false;
            } else {
              Toast({
                message: "升级失败!",
              });
            }
          });
      } else {
        Toast({
          message: "请选择代理商级别",
          duration: 3000
        });
      }
    },
    //获取代理商级别
    getAgential() {
      this.$axios.get("/api/agent/list").then(res => {
        console.log(res);
        this.agenctail = res.data.data.info;
        this.agenctail.forEach(item => {
          item.checked = false;
        });
        this.agenctail = JSON.parse(JSON.stringify(this.agenctail));
        console.log(this.agenctail);
      });
    },
    //代理商级别升级
    getagenctail(item) {
      if (!item.checked) {
        item.checked = true;
      }
      this.agenctail.forEach(item1 => {
        if (item1.checked && item1.agentId != item.agentId) {
          item1.checked = false;
        }
      });
      if (item.checked) {
        this.agentId = item.agentId;
      }
      console.log(this.agentId);
    },
    //立即升级
    gotoLiveUp() {
      this.agency = true;
    },
    //社区经纪人信息
    getCommuniy() {
      this.$axios.get("/api/community/info").then(res => {
        if (res.data.code == 100) {
          this.community = res.data.data;
        } else {
          Toast({
            message: res.data.msg
          });
        }
      });
    },
    //社区概况
    gotoCommunitySurvey() {
      this.$router.push("/communitySurvey");
    },
    //收益明细
    gotoYieldDetail() {
      this.$router.push("/yieldDetail");
    },
    //个人即时返利
    gotoPersonYeild(){
      this.$router.push('/yieldPerson')
    }
  },
  components: { Footers },
  mounted() {
    if (!this.$route.query.accessToken) {
      let appId = "a806bed97ed347490e42270bd4e37a02";
      let uri = encodeURIComponent(
        "http://tcoins.talkingcake.cn/api/authorize/getToken"
      );
      location.href =
        "http://oauth.tcoins.io/api/connect/oauth/authorize?app_id=" +
        appId +
        "&&scope=snsapi_base&&response_type=code&&state=2&&wallet_redirect=302" +
        "&&redirect_uri=" +
        uri;
    } else {
      localStorage.setItem("accessToken", this.$route.query.accessToken);
      this.getAgential();
      this.getCommuniy();
    }
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

#explain {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
#kuang {
  background-color: #666;
  margin-left: Rem(17);
  width: Rem(341);
  height: Rem(296.5);
  background-color: #fff;
  border-radius: Rem(8);
  position: fixed;
  top: Rem(110.5);
}
#kuang h1 {
  font-size: Rem(19);
  color: #333333;
  margin-top: 29.5px;
  margin-bottom: 30px;
}
#kuang h2 {
  font-size: Rem(17);
  color: #333333;
  margin-left: 20px;
  margin-top: 20px;
}
#kuang p {
  font-size: Rem(15);
  color: #333333;
  margin-left: 20px;
}
#agency {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
#kuang1 {
  background-color: #666;
  margin-left: Rem(17);
  width: Rem(341);
  //height: Rem(263.5);
  background-color: #fff;
  border-radius: Rem(8);
  box-sizing: border-box;
  position: fixed;
  padding-right: Rem(50);
  top: Rem(110.5);
}
#kuang1 .agency1 {
  display: inline;
  padding-left: 51.5px;
}
#kuang1 .agency1 span {
  color: #757575;
  font-size: 15px;
}
#kuang1 .agency2 {
  width: Rem(341);
  height: 30px;
  background: #f1f1f1;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  .agentName {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .agentCost {
    width: 40%;
    display: flex;
    justify-content: flex-start;
  }
}
#kuang1 .agency2 span {
  font-size: 14px;
  color: #333333;
  margin-right: 90px;
}
#kuang1 .agency2 p {
  font-size: 14px;
  color: #333333;
}
#kuang1 #imgs {
  width: 12px;
  height: 12px;
  margin-left: 27px;
  margin-right: 24px;
}

.blocklist {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0737b7;
  background-image: linear-gradient(#0737b7, #418ffc);
  height: Rem(187);
  width: 100%;
}
.memberInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  width: 100%;
}
.memberInfo .member {
  color: #ffffff;
  font-size: 18px;
  font-weight: Medium;
  font-style: PingFang-SC-Medium;
}
.memberInfo .name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 17px;
}
.liveUp {
  width: 65px;
  height: 18px;
  background: #ffffff;
  border-radius: 9px;
  text-align: center;
  color: #0839b9;
  font-size: 11px;
  margin-right: 17px;
}
.yield {
  width: 100%;
  height: Rem(58.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.condition {
  width: 100%;
  height: Rem(346.5);
  border-top: 10px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.yield1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.grade {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 17px;
  margin-top: 20px;
}
.mingxi {
  width: 100%;
  margin-top: Rem(20);
}
.more {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 17px;
}
.miaoshu {
  width: 100%;
  height: Rem(58.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.item {
  width: 165px;
  height: 85px;
  background: rgba(7, 55, 183, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
