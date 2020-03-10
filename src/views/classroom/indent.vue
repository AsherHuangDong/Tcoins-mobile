<template>
  <div class="box_community">
    <!-- 头部 -->
    <div class="top"></div>
    <div class="top_search">
      <img src="/static/img/fanhui@2x.png" style="width:8px;height:14px" />
      <span class="title">订单列表</span>
      <img src="/static/img/edit.png" style="width:15.5px;height:15px;" @click="gotoEdit" />
    </div>
    <!-- 交易总额 -->
    <div class="total">
      <div class="total1">
        <span class="total2">交易总额:</span>
        <span class="total3">{{data1.sumPrice}} CNY</span>
      </div>
      <div class="total1">
        <span class="total2">交易总数:</span>
        <span class="total3">{{data1.sumVolume}} EUSDT</span>
      </div>
    </div>

    <div class="blocklist">
      <div>
        <div class="list" v-for="(item,index) in data1.data" :key="index">
          <div class="list1">
            <div class="head">
              <span style="color:#F85050;margin-right:10.5px" class="head1">{{item.vtranType}}</span>
              <span style="color:#09173A" class="head1">{{item.coin}}</span>
            </div>
            <div class="body">
              <div class="body0">
                <span class="body1" style="margin-right:7.5px">交易数量:</span>
                <span class="body1">{{item.volume}} {{item.coin}}</span>
              </div>
              <span class="body2">{{item.vorderStatus}}</span>
            </div>
            <div class="foot">
              <div class="body0">
                <span class="body1" style="margin-right:7px">交易总价:</span>
                <span class="body1">{{item.totalPrice}}元</span>
              </div>
              <span class="body1">{{item.dateTime}}</span>
            </div>
          </div>
          <img src="/static/img/next.png" id="imgs" />
        </div>
      </div>
      <transition name="fade">
        <div id="edit" v-show="edit">
          <div id="kuang">
            <div id="upPart">
              <!-- 交易类型 -->
              <div class="dealType">
                <span class="header">交易类型</span>
                <div class="HeaderItems">
                  <div
                    v-for="(item,index) in dealType"
                    :key="item.id"
                    :class="item.checked?'index2':'index'"
                    @click="choice(item,index)"
                  >{{item.value}}</div>
                </div>
              </div>
              <!-- 交易单位 -->
              <div class="dealUnit">
                <span class="header" style="margin-bottom:20px">交易单位</span>
                <div class="unit">
                  <div class="bizhong">
                    <input
                      v-model="coin"
                      type="text"
                      style="position:relative;width:100%;margin-bottom:10px;outline:none;border:none;font-size:13px;color:#1A3B54"
                    />
                  </div>
                  <div style="width:37.5px;display:flex;justify-content:center;align-items:center">
                    <img
                      src="static/img/slicer.png"
                      style="width:7.5px;height:15px;margin-bottom:10px;"
                    />
                  </div>
                  <div class="country">
                    <div class="country1">
                      <input
                        v-model="coin1"
                        type="text"
                        style="margin-bottom:10px;border:none;outline:none;font-size:13px;color:#1A3B54"
                      />
                      <img :src="src1" id="images1" @click="getImg1" style="margin-bottom:10px;" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- 订单状态 -->
              <div class="indentStatus">
                <div class="indentHead">
                  <span class="header">订单状态</span>
                  <div class="headerRight">
                    <span>交易完成</span>
                    <img :src="src" id="images" @click="getImg" />
                  </div>
                </div>
                <div :class="isshow?'less':'indentItem'">
                  <div
                    :class="item.checked?'index3':'index'"
                    v-for="(item,index) in indentType"
                    :key="index"
                    @click="getIndentType(item,index)"
                  >{{item.value}}</div>
                  <div class="index1"></div>
                </div>
              </div>
              <!-- 日期 -->
              <div class="dateTime">
                <span class="header">日期</span>
                <div class="datepPicker">
                  <div class="datePicker1">
                    <input type="text" :value="getSearch.beginDate" />
                    <img
                      src="static/img/date.png"
                      style="width:14px;height:14px;margin-bottom:10px"
                      @click="openPicker"
                    />
                  </div>
                  <div class="text" style="display:flex;jusify-content:center;align-items:center;">
                    <span style="font-size:13px;color:#7F8B9E;margin-bottom:10px">至</span>
                  </div>
                  <div class="datePicker1">
                    <input type="text" :value="getSearch.endDate" />
                    <img
                      src="static/img/date.png"
                      style="width:14px;height:14px;margin-bottom:14px;"
                      @click="openPicker1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <Button id="refresh" style="width:50%;background:#F2F3F8" @click="refresh">
                <span style="color:#1A3B54">重置</span>
              </Button>
              <Button id="ok" style="width:50%;background:#408BF0" @click="ok">
                <span style="color:#FFFFFF">确认</span>
              </Button>
            </div>
          </div>
        </div>
      </transition>
      <mt-datetime-picker @confirm="getStartTime" ref="picker" type="dateTime" v-model="startTime"></mt-datetime-picker>
      <mt-datetime-picker @confirm="getEndTime" ref="picker1" type="dateTime" v-model="endTime"></mt-datetime-picker>
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
  name: "indent",
  data() {
    return {
      edit: false,
      checkboxGroup2: [],
      getSearch: {
        tranType: "", //交易类型
        coin: "", //交易单位
        orderStatus: [], //订单类型
        beginDate: "", //开始时间
        endDate: "" //结束时间
      },
      dealType: [
        //交易类型
        {
          id: 1,
          value: "全部",
          checked: false
        },
        {
          id: 2,
          value: "购买",
          checked: false
        },
        {
          id: 3,
          value: "出售",
          checked: false
        }
      ],
      indentType: [
        //订单状态
        {
          id: 0,
          value: "全部",
          checked: false
        },
        {
          id: 1,
          value: "待支付",
          checked: false
        },
        {
          id: 6,
          value: "打币中",
          checked: false
        },
        {
          id: 3,
          value: "交易完成",
          checked: false
        },
        {
          id: 4,
          value: "已取消",
          checked: false
        },
        {
          id: 5,
          value: "申诉中",
          checked: false
        },
        {
          id: 8,
          value: "申诉完成",
          checked: false
        },
        {
          id: 9,
          value: "申诉取消",
          checked: false
        }
      ],
      coin: "",
      coin1: "",
      list: [],
      data1: {
        sumPrice: 0,
        data: [],
        sumVolume: 0
      },
      isshow: false,
      src: "static/img/more.png",
      src1: "static/img/more.png",
      startTime: new Date(),
      endTime: new Date()
    };
  },
  methods: {
    gotoEdit() {
      this.edit = !this.edit;
    },
    getImg() {
      if (this.src == "static/img/more.png") {
        this.src = "static/img/up.png";
        this.isshow = true;
      } else {
        this.src = "static/img/more.png";
        this.isshow = false;
      }
    },
    getImg1() {
      if (this.src1 == "static/img/more.png") {
        this.src1 = "static/img/up.png";
      } else {
        this.src1 = "static/img/more.png";
      }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    openPicker1() {
      this.$refs.picker1.open();
    },
    //获取所有数据
    getData() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      if (this.coin && this.coin1) {
        this.getSearch.coin = this.coin + "/" + this.coin1;
      }
      this.getSearch.orderStatus = this.list;
      console.log("getSearch", this.getSearch);
      this.$axios.post("/api/order/search", this.getSearch).then(res => {
        console.log(res);
        this.data1 = res.data.data.info;
        this.data1.data.forEach(item => {
          item.dateTime = this.format(item.dateTime, "yyyy-MM-dd hh:mm:ss");
        });
        this.refresh();
        Indicator.close();
      });
    },
    ok() {
      console.log("this.getSearch", this.getSearch);
      this.getData();
      this.edit = false;
    },
    //重置
    refresh() {
      this.dealType.forEach(item => {
        item.checked = false;
      });
      this.indentType.forEach(item => {
        item.checked = false;
      });
      this.coin = "";
      this.coin1 = "";
      this.list = [];
      this.getSearch.beginDate = "";
      this.getSearch.endDate = "";
    },
    //是否选中
    choice(item, index) {
      if (!item.checked) {
        item.checked = true;
      }
      this.dealType.forEach(item1 => {
        if (item1.checked && item1.id != item.id) {
          item1.checked = false;
        }
      });

      if (item.checked) {
        this.getSearch.tranType = item.id;
      }
    },
    getIndentType(item, index) {
      let list = this.list;
      console.log(item.id);
      item.checked = !item.checked;
      if (item.id == 0) {
        if (item.checked) {
          this.indentType.forEach(item1 => {
            list.push(item1.id);
          });
        } else {
          this.list = [];
          list = [];
        }
        console.log("jjjj");
        this.indentType.forEach(item1 => {
          item1.checked = item.checked;
        });
      } else {
        console.log("gggg");
        if (item.checked) {
          list.push(item.id);
        } else {
          console.log("kkkk");
          for (let i = 0; i < list.length; i++) {
            if (item.id == list[i]) {
              list.splice(i, 1);
            }
          }
        }
        if (list.length < 7) {
          this.indentType[0].checked = false;
        }
        if (list.length == 7) {
          if (this.indentType[0].checked) {
            this.indentType[0].checked = false;
          }
        }
      }
      list = [...new Set(list)];
      console.log(list);
    },
    getStartTime(time) {
      let date = this.format(time, "yyyy-MM-dd hh:mm:ss");
      this.getSearch.beginDate = date;
    },
    getEndTime(time) {
      let date = this.format(time, "yyyy-MM-dd hh:mm:ss");
      this.getSearch.endDate = date;
    }
  },
  components: { Footers },
  mounted() {
    if (this.$route.query.accessToken) {
      localStorage.setItem("accessToken", this.$route.query.accessToken);
      this.getData();
    } else {
      let appId = "a806bed97ed347490e42270bd4e37a02";
      let uri = encodeURIComponent(
        "http://tcoins.talkingcake.cn/api/authorize/getToken"
      );
      location.href =
        "http://oauth.tcoins.io/api/connect/oauth/authorize?app_id=" +
        appId +
        "&&scope=snsapi_base&&response_type=code&&state=3&&wallet_redirect=302" +
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
.box_community {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}
.top {
  height: Rem(20.5);
  background: #4d99ff;
}
.top_search {
  height: Rem(44);
  display: flex;
  background: #ffffff;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 Rem(17);
}
.title {
  font-size: Rem(20);
  font-weight: bold;
}
#edit {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: Rem(64.5);
  background-color: rgba(0, 0, 0, 0.5);
}
#kuang {
  background-color: #666;
  width: 100%;
  background-color: #ffffff;
}
.total {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: Rem(65);
  background: #ffffff;
  padding: Rem(15) 0;
  box-sizing: border-box;
}
.total .total1 {
  padding: 0 Rem(19);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.total2 {
  font-size: Rem(14);
  color: #60687a;
}
.total3 {
  font-size: Rem(14);
  color: #408bf0;
}
.blocklist {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: Rem(10);
}

.blocklist .list {
  width: Rem(337);
  height: Rem(96);
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: Rem(10);
  padding: 0 Rem(10);
}
.list #imgs {
  width: Rem(11.5);
  height: Rem(19);
}
.list .list1 {
  width: Rem(310);
}
.list .head .head1 {
  font-size: Rem(17);
}
.body1 {
  font-size: Rem(13);
  color: #60687a;
}
.list .body .body2 {
  font-size: Rem(14);
  color: #09173a;
}
.list .head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.body,
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.body0 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#kuang #upPart {
  box-sizing: border-box;
  padding: 0 Rem(15) 0 Rem(15.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
#kuang #upPart .dealType {
  height: Rem(60);
  width: 100%;
  padding: 0 Rem(15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: Rem(30);
}
.dealType .header {
  margin-bottom: Rem(14.5);
}
#kuang #upPart .dealUnit {
  width: 100%;
  height: Rem(45);
  padding: 0 Rem(15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: Rem(30);
}
.dealUnit .unit {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bizhong {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: Rem(0.5) solid #e3e7ec;
}
.country {
  padding-right: Rem(18);
  box-sizing: border-box;
}
.country1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: Rem(0.5) solid #e3e7ec;
}
.indentStatus {
  width: 100%;
  padding: 0 Rem(15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: Rem(30);
}
#kuang .indentHead {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.indentHead .header {
}
#kuang .headerRight {
  font-size: Rem(12);
  color: #408bf0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#kuang #images {
  width: Rem(10.5);
  height: Rem(6);
  margin-left: Rem(10);
}
#kuang #images1 {
  width: Rem(10.5);
  height: Rem(6);
  margin-left: Rem(10);
}
#kuang .bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
#kuang #refresh {
  width: 50%;
  background: #f2f3f8;
  height: Rem(40);
  font-size: Rem(16);
  color: #1a3b54;
}
#kuang #ok {
  width: 50%;
  background: #408bf0;
  height: Rem(40);
  font-size: Rem(16);
  color: #ffffff;
}
#kuang .header {
  font-size: Rem(12);
  color: #7f8b9e;
}
.HeaderItems {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.HeaderItems .index2 {
  background: #ffffff;
  border: Rem(0.5) solid #408bf0;
  width: Rem(100.5);
  height: Rem(34);
  border-radius: Rem(2.5);
  font-size: Rem(13);
  display: flex;
  color: #7e8897;
  justify-content: center;
  align-items: center;
}
.indentItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.less {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  flex-wrap: wrap;
  height: Rem(49);
}
.indentItem .index {
  margin-top: Rem(15);
}
.less .index {
  margin-top: Rem(15);
}
.index3 {
  width: Rem(100.5);
  height: Rem(34);
  background: url("../../../static/img/get.png");
  background-size: cover;
  border-radius: Rem(2.5);
  font-size: Rem(13);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: Rem(15);
  color: #7e8897;
}
.all,
.index {
  width: Rem(100.5);
  height: Rem(34);
  background: #f2f3f8;
  border-radius: Rem(2.5);
  font-size: Rem(13);
  display: flex;
  justify-content: center;
  align-items: center;
}
.index1 {
  width: Rem(100.5);
  height: Rem(34);
  background: #ffffff;
}
.all {
  color: #1a3b54;
}
.index {
  color: #7e8897;
}
.dateTime {
  width: 100%;
  padding: 0 Rem(15);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: Rem(30);
}
.datepPicker {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: Rem(15.5);
}
.datePicker1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 0.5px solid #e3e7ec;
}
.datePicker1 input {
  border: none;
  outline: none;
  font-size: 13px;
  margin-bottom: 10px;
  color: #7f8b9e;
}
.text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
