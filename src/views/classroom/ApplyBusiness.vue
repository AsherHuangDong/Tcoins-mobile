<template>
  <div class="box_cont">
    <!-- <div class="top"></div>
    <div class="top_search">
      <img src="/static/img/fanhui@2x.png" style="width:8px;height:14px" />
      <span class="title">申请商家</span>
      <img src="/static/img/shenglue@2x.png" style="width:18.5px;height:3.5px" />
    </div>-->
    <div class="blocklist">
      <div class="blockitem">
        <p style="text-align:center;">
          <img src="/static/img/anquan@2x.png" style="margin-top:5px;width:52px;height:59.5px;" />
        </p>
        <p style="font-size:15px;font-weight: bold;margin:0 auto 10px;text-align:center">安全保障</p>
        <p style="font-size:12px;width:106px;margin:0px auto">每位商家信息严格保密，绝不外泄</p>
      </div>
      <div class="blockitem">
        <p style="text-align:center;">
          <img src="/static/img/fabu@2x.png" style="margin-top:5px;width:52px;height:59.5px;" />
        </p>
        <p style="font-size:15px;font-weight: bold;margin:0 auto 10px;text-align:center">发布广告</p>
        <p style="font-size:12px;width:106px;margin:0px auto">商家可自由发布广告，买卖更灵活、 更便捷</p>
      </div>
    </div>
    <div class="blocklist" style="margin-top:16.5px">
      <div class="blockitem">
        <p style="text-align:center;">
          <img src="/static/img/gaoshouyi@2x.png" style="margin-top:5px;width:52px;height:59.5px;" />
        </p>
        <p style="font-size:15px;font-weight: bold;margin:0 auto 10px;text-align:center">高收益</p>
        <p style="font-size:12px;width:106px;margin:0px auto">每单可至少返利0.5%，推荐新承兑商可获得团队流水返利</p>
      </div>
      <div class="blockitem">
        <p style="text-align:center;">
          <img src="/static/img/anquan@2x.png" style="margin-top:5px;width:52px;height:59.5px;" />
        </p>
        <p style="font-size:15px;font-weight: bold;margin:0 auto 10px;text-align:center">一对一服务</p>
        <p style="font-size:12px;width:106px;margin:0px auto">我们将向商家提供一对一专属服务</p>
      </div>
    </div>
    <div style="text-align:center;margin-bottom:30px;">
      <p
        v-show="kycStatus==0"
        style="font-size:16px;font-weight: bold;margin:25.5px auto 12px;width:216px"
      >
        您当前的KYC状态
        <span>“未认证”</span>
      </p>
      <p
        v-show="kycStatus==1"
        style="font-size:16px;font-weight: bold;margin:25.5px auto 12px;width:216px"
      >
        您当前的KYC状态
        <span style="color:#408BF0">“等级一”</span>
      </p>
      <p
        v-show="kycStatus==2"
        style="font-size:16px;font-weight: bold;margin:25.5px auto 12px;width:216px"
      >
        您当前的KYC状态
        <span style="color:#408BF0">“等级二”</span>
      </p>
      <p
        v-show="kycStatus==3"
        style="font-size:16px;font-weight: bold;margin:25.5px auto 12px;width:216px"
      >
        您当前的状态
        <span style="color:#408BF0">“普通承兑商”</span>
      </p>
      <p
        v-show="kycStatus!=3"
        style="font-size:12px;margin:0 auto;color:#408BF0;width:209.5px"
      >请完成等级二认证，才可申请承兑商</p>
    </div>
    <p v-show="kycStatus==0" class="button">立即申请</p>
    <p v-show="kycStatus==1" class="button">立即申请</p>
    <p v-show="kycStatus==2" class="button1" @click="apply">立即申请</p>
    <p v-show="kycStatus==3" class="button2" @click="relieveMerchant">解除商家</p>
    <!-- <Footers></Footers> -->
    <div id="zhezhao" v-show="yin">
      <div id="kuang">
        <p class="queren1">缴纳{{coin.payCost}} {{coin.paySymbol}}保证金</p>
        <p class="queren" @click="getPay">确认</p>
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
  name: "ClassRoom",
  data() {
    return {
      yin: false,
      kycStatus: "", //kyc认证状态
      coin: {
        payCost: 0, //保证金价格
        paySymbol: "" //保证金币种
      }
    };
  },
  methods: {
    //用户缴纳保证金,申请商家
    quern() {
      // this.$axios.post("/api/configFunction/pay").then(res => {
      //   if (res.data.code == 100) {
      //     Toast({
      //       message: "申请成功",
      //       iconClass: "icon icon-success"
      //     });
      //     this.getPay(res.data.data);
      //     //this.getKycStatus();
      //   } else {
      //     Toast({
      //       message: "申请失败",
      //       iconClass: "icon icon-error"
      //     });
      //   }
      //   this.yin = false;
      // });
      this.getPay();
    },
    //获得用户kyc认证状态
    getKycStatus() {
      this.$axios.post("/api/authorize/kycStatus").then(res => {
        this.kycStatus = res.data.data.info;
      });
    },
    //立即申请
    apply() {
      this.yin = true;
      this.$axios.get("/api/configFunction/info").then(res => {
        console.log(res);
        this.coin = res.data.data.info;
      });
    },
    //解除商家
    relieveMerchant() {
      this.$axios.post("/api/configFunction/remove").then(res => {
        if (res.data.code == 100) {
           Toast({
            message: "您的申请已受理，请等待审核！"
          });
          this.getKycStatus();
        } else {
          Toast({
            message: "解除失败"
          });
        }
      });
    },
    getPay() {
      this.$axios.post("/api/configFunction/pay").then(res => {
        if (res.data.code == 100) {
          let obj = res.data.data;
          console.log("obj", obj);
          this.yin = false;
          obj.package = encodeURIComponent(obj.package);
          console.log("fffff");
          location.href =
            "https://api.tcoins.io/hicoinfe/payment?appId=" +
            obj.appId +
            "&&timeStamp=" +
            obj.timeStamp +
            "&&nonceStr=" +
            obj.nonceStr +
            "&&package=" +
            obj.package +
            "&&signType=" +
            obj.signType +
            "&&paySign=" +
            obj.paySign;
        } else {
          this.msg = res.data.msg;
          //this.step = 3;
        }
        //Indicator.close();
      });
    }
  },
  components: { Footers },
  mounted() {
    if (this.$route.query.accessToken) {
      localStorage.setItem("accessToken", this.$route.query.accessToken);
      this.getKycStatus();
    } else {
      let appId = "a806bed97ed347490e42270bd4e37a02";
      let uri = encodeURIComponent(
        "http://tcoins.talkingcake.cn/api/authorize/getToken"
      );
      location.href =
        "http://oauth.tcoins.io/api/connect/oauth/authorize?app_id=" +
        appId +
        "&&scope=snsapi_base&&response_type=code&&state=1&&wallet_redirect=302" +
        "&&redirect_uri=" +
        uri;
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
.box_cont {
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
  display: flex;
  justify-content: space-around;
  overflow-y: scroll;
}
.blockitem {
  width: Rem(156.5);
  height: Rem(165.5);
  padding-bottom: Rem(7);
  background: #e9f5fe;
}
.button {
  width: 200px;
  height: 35px;
  font-size: 17px;
  background: #6e7a89;
  text-align: center;
  margin: 0 auto;
  padding-top: 9.5px;
  border-radius: 8px;
}
.button1 {
  width: 200px;
  height: 35px;
  font-size: 17px;
  background-image: linear-gradient(to right, #2355dc, #418ffc);
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  padding-top: 9.5px;
  border-radius: 8px;
}
.button2 {
  width: 200px;
  height: 35px;
  font-size: 17px;
  background: #cccccc;
  color: #666666;
  text-align: center;
  margin: 0 auto;
  padding-top: 9.5px;
  border-radius: 8px;
}
#zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 Rem(45);
}
#kuang {
  background-color: #666;
  width: Rem(280);
  height: Rem(135);
  background-color: #fff;
  border-radius: Rem(5);
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: Rem(220);
  box-sizing: border-box;
}
.queren {
  width: Rem(198.5);
  height: Rem(30);
  font-size: Rem(15);
  background-image: linear-gradient(to right, #2355dc, #418ffc);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: Rem(25.5);
}
.queren1 {
  font-size: Rem(18);
  color: #333333;
  margin-top: Rem(45.5);
}
</style>
