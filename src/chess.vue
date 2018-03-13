<template>
  <div class="main" v-if="ifstart">
    <div class="top">
      <ul>
        <li v-for="item in topItems">
          {{ item.message }}
        </li>
      </ul>
    </div>

    <transition-group tag="div" class="chess" name="animated">
        <span v-for="(item,index) in chess.blackItem" class="black"
              v-show="item.pos[item.pos.length-1].active"
              :style="{left:item.pos[item.pos.length-1].x*50-25+'px',top:item.pos[item.pos.length-1].y*50+50+'px'}"
              :key="index">
        {{ item.message }}
        </span>

      <span v-for="(item,index) in chess.redItem" class="red" v-show="item.pos[item.pos.length-1].active"
            :style="{left:item.pos[item.pos.length-1].x*50-25+'px',top:item.pos[item.pos.length-1].y*50+50+'px'}"
            :key="index+20">
        {{ item.message }}
      </span>
    </transition-group>

    <div class="bottom">
      <ul>
        <li v-for="item in bottomItems">
          {{ item.message }}
        </li>
      </ul>
    </div>
    <div class="message">
      {{message[step % 2]}}
    </div>
    <div class="select">
      <ul>
        <li v-for="item in selectItems" v-show="item.ifshow" :class="{ 'notClick': item.notClick}"
            @click="select(item.message,item.notClick)">
          {{ item.message }}
        </li>
      </ul>
    </div>
  </div>
  <div class="mainElse" v-else>
    <span v-for="(item,index) in dingItem" :style="{ backgroundColor: item.color}" @click="ding(index)">
      {{item.message}}
    </span>
  </div>

</template>

<script>
  const blackSelect = [
    {message: '车', ifshow: true, notClick: false},
    {message: '马', ifshow: true, notClick: false},
    {message: '象', ifshow: true, notClick: false},
    {message: '仕', ifshow: true, notClick: false},
    {message: '将', ifshow: true, notClick: false},
    {message: '炮', ifshow: true, notClick: false},
    {message: '卒', ifshow: true, notClick: false},
  ];
  const redSelect = [
    {message: '車', ifshow: true, notClick: false},
    {message: '馬', ifshow: true, notClick: false},
    {message: '相', ifshow: true, notClick: false},
    {message: '士', ifshow: true, notClick: false},
    {message: '帅', ifshow: true, notClick: false},
    {message: '炮', ifshow: true, notClick: false},
    {message: '兵', ifshow: true, notClick: false},
  ];
  const blackStep = [
    {message: '1', ifshow: true, notClick: false},
    {message: '2', ifshow: true, notClick: false},
    {message: '3', ifshow: true, notClick: false},
    {message: '4', ifshow: true, notClick: false},
    {message: '5', ifshow: true, notClick: false},
    {message: '6', ifshow: true, notClick: false},
    {message: '7', ifshow: true, notClick: false},
    {message: '8', ifshow: true, notClick: false},
    {message: '9', ifshow: true, notClick: false}
  ];
  const redStep1 = [
    {message: '九', ifshow: true, notClick: false},
    {message: '八', ifshow: true, notClick: false},
    {message: '七', ifshow: true, notClick: false},
    {message: '六', ifshow: true, notClick: false},
    {message: '五', ifshow: true, notClick: false},
    {message: '四', ifshow: true, notClick: false},
    {message: '三', ifshow: true, notClick: false},
    {message: '二', ifshow: true, notClick: false},
    {message: '一', ifshow: true, notClick: false}
  ];
  const redStep2 = [
    {message: '一', ifshow: true, notClick: false},
    {message: '二', ifshow: true, notClick: false},
    {message: '三', ifshow: true, notClick: false},
    {message: '四', ifshow: true, notClick: false},
    {message: '五', ifshow: true, notClick: false},
    {message: '六', ifshow: true, notClick: false},
    {message: '七', ifshow: true, notClick: false},
    {message: '八', ifshow: true, notClick: false},
    {message: '九', ifshow: true, notClick: false}
  ];
  export default {
    name: 'chess',
    data() {
      return {
        ifstart: false,
        move: 'move',
        dingItem: [
          {color: 'black', message: '黑子先'},
          {color: 'red', message: '红子先'}
        ],
        topItems: [
          {message: '1'},
          {message: '2'},
          {message: '3'},
          {message: '4'},
          {message: '5'},
          {message: '6'},
          {message: '7'},
          {message: '8'},
          {message: '9'}
        ],
        bottomItems: [
          {message: '九'},
          {message: '八'},
          {message: '七'},
          {message: '六'},
          {message: '五'},
          {message: '四'},
          {message: '三'},
          {message: '二'},
          {message: '一'}
        ],
        selectItems: [
          {message: '1', ifshow: true, notClick: true},
          {message: '2', ifshow: true, notClick: true},
          {message: '3', ifshow: true, notClick: true},
          {message: '4', ifshow: true, notClick: false},
          {message: '5', ifshow: true, notClick: true},
          {message: '6', ifshow: true, notClick: true},
          {message: '7', ifshow: true, notClick: false},
          {message: '8', ifshow: false, notClick: true},
          {message: '9', ifshow: true, notClick: true}
        ],
        chess: {
          blackItem: [
            {message: '车', pos: [{x: 1, y: 1, active: true}]},
            {message: '马', pos: [{x: 1, y: 0, active: true}]},
            {message: '象', pos: [{x: 2, y: 0, active: false}]},
            {message: '仕', pos: [{x: 3, y: 0, active: true}]},
            {message: '将', pos: [{x: 4, y: 0, active: true}]},
            {message: '仕', pos: [{x: 5, y: 0, active: true}]},
            {message: '象', pos: [{x: 6, y: 0, active: true}]},
            {message: '马', pos: [{x: 7, y: 0, active: true}]},
            {message: '车', pos: [{x: 8, y: 0, active: true}]},
            {message: '炮', pos: [{x: 1, y: 2, active: false}]},
            {message: '炮', pos: [{x: 7, y: 2, active: true}]},
            {message: '卒', pos: [{x: 0, y: 4, active: true}]},
            {message: '卒', pos: [{x: 2, y: 5, active: true}]},
            {message: '卒', pos: [{x: 4, y: 3, active: true}]},
            {message: '卒', pos: [{x: 6, y: 3, active: true}]},
            {message: '卒', pos: [{x: 8, y: 3, active: true}]},
          ],
          redItem: [
            {message: '車', pos: [{x: 0, y: 9, active: true}]},
            {message: '馬', pos: [{x: 1, y: 9, active: true}]},
            {message: '相', pos: [{x: 2, y: 9, active: true}]},
            {message: '士', pos: [{x: 3, y: 9, active: true}]},
            {message: '帅', pos: [{x: 4, y: 9, active: true}]},
            {message: '士', pos: [{x: 5, y: 9, active: true}]},
            {message: '相', pos: [{x: 6, y: 9, active: true}]},
            {message: '馬', pos: [{x: 7, y: 9, active: true}]},
            {message: '車', pos: [{x: 8, y: 9, active: true}]},
            {message: '炮', pos: [{x: 1, y: 7, active: true}]},
            {message: '炮', pos: [{x: 7, y: 7, active: true}]},
            {message: '兵', pos: [{x: 0, y: 6, active: true}]},
            {message: '兵', pos: [{x: 2, y: 6, active: true}]},
            {message: '兵', pos: [{x: 4, y: 6, active: true}]},
            {message: '兵', pos: [{x: 6, y: 6, active: true}]},
            {message: '兵', pos: [{x: 8, y: 6, active: true}]},
          ],
        },
        chaXunX: {
          '1': 0,
          '九': 0,
          '2': 1,
          '八': 1,
          '3': 2,
          '七': 2,
          '4': 3,
          '六': 3,
          '5': 4,
          '五': 4,
          '6': 5,
          '四': 5,
          '7': 6,
          '三': 6,
          '8': 7,
          '二': 7,
          '9': 8,
          '一': 8,

          '前': 0,

          '后': 1,

          '平': 2,

        },
        chaXunY: {
          1: 1,
          '一': 1,
          2: 2,
          '二': 2,
          3: 3,
          '三': 3,
          4: 4,
          '四': 4,
          5: 5,
          '五': 5,
          6: 6,
          '六': 6,
          7: 7,
          '七': 7,
          8: 8,
          '八': 8,
          9: 9,
          '九': 9,

          '前': 0,

          '后': 1,

          '平': 2,

        },
        message: ['黑子走', '红子走'],
        step: 0,
        clickNum: 0,
        record: [],
        chessIndex: -1,
      }
    },
    methods: {
      ding: function (item) {
        if (item == 0) {
          this.resetStep();
          this.changeIfstart();
          this.rule('black', '', 0);
          this.clickNum++;

        } else {
          this.addStep();
          this.changeIfstart();
          this.rule('red', '', 0);
          this.clickNum++;
        }
      },

      select: function (message, notClick) {
        if (!notClick) {
          let color;
          if (this.step % 2 == 0) {
            color = 'black';
          } else {
            color = 'red';
          }
          this.record.push(message);
          if (this.clickNum == 4) {
            this.action(color, this.record)
          }

          if (this.clickNum == 4) {
            this.clickNum = 0;
            this.record = [];
            this.pos = [];
            this.posesFilter = []
            this.addStep();
            this.chessIndex = -1;
          }
          if (this.step % 2 == 0) {
            color = 'black';
          } else {
            color = 'red';
          }
          this.rule(color, message, this.clickNum)
          this.clickNum++;
        }
      },
      resetStep: function () {
        this.step = 0;
      },
      addStep: function () {
        this.step++;

      },
      resetIfstart: function () {
        this.ifstart = false
      },
      changeIfstart: function () {
        this.ifstart = true
      },
      changeClick: function () {
        if (this.clickNum == 4) {
          this.clickNum = 0;
        } else {
          this.clickNum++;
        }


      },
      rule: function (color, data, step) {
        let self = this;
        if (step == 0) {
          let message = this.getAllChessNameByColor(color);
          console.log('step1', message)
          let chess = this.filterChessTwoInY(color);
          if (chess.length > 0) {
            this.step1(color, 1, message);
          } else {
            this.step1(color, 0, message);
          }
        } else if (step == 1) {
          if (data == '前' || data == '后') {
            let chess = this.filterChessTwoInY(color);
            this.step2(color, 1, chess)
          } else {
            console.log(color, data, step)
            let chess = this.getChessesByName(color, data)
            let message = [];
            chess.forEach(function (item) {
              message.push(self.chess[color + 'Item'][item].pos[self.chess[color + 'Item'][item].pos.length - 1].x)
            })
            console.log(message)
            this.step2(color, 0, message)
          }
        } else if (step == 2) {
          this.chessIndex = this.getChessIndexByRecord(color, this.record);
          this.step3(color, this.chessIndex);

        } else if(step == 3) {
          this.step4(color, data);
        }
      },
      step1: function (color, ifqh, message) {
        let self = this;
        if (!!ifqh) {
          this.selectItems = [{message: '前', ifshow: true, notClick: false}, {
            message: '后',
            ifshow: true,
            notClick: false
          }]
        } else {
          this.selectItems = color == 'black' ? blackSelect : redSelect;
          this.selectItems.forEach(function (item) {
            if (!~message.indexOf(item.message)) {
              item.notClick = true;
            }
          })
        }
      },
      step2: function (color, ifqh, message) {
        console.log('step2',message)
        if (!!ifqh) {
          this.selectItems = (color == 'black' ? blackSelect : redSelect);
          this.selectItems.forEach(function (item) {
            if (!~message.indexOf(item.message)) {
              item.notClick = true;
            }
          })
        } else {
          this.selectItems = (color == 'black' ? blackStep : redStep1);
          console.log(redStep1)
          console.log(this.selectItems)
          this.selectItems.forEach(function (item, index) {
            console.log(item.notClick)
            if (!~message.indexOf(index)) {
              item.notClick = true;
            }
          })
        }
        console.log(this.selectItems)
      },
      step3: function (color, chessIndex) {
        console.log('step3',color,chessIndex)
        let chessMessage = this.chess[color + 'Item'][chessIndex].message;
        let self = this;
        let pos = this.chess[color + 'Item'][chessIndex].pos[this.chess[color + 'Item'][chessIndex].pos.length - 1];
        self.pos = pos;
        if (chessMessage == '象' || chessMessage == '相' || chessMessage == '士' || chessMessage == '仕' || chessMessage == '马' || chessMessage == '馬') {
          let message = [{message: '进', ifshow: true, notClick: true}, {message: '退', ifshow: true, notClick: true}]
          if (chessMessage == '象' || chessMessage == '相') {
            let poses = [{x: pos.x - 2, y: pos.y - 2}, {x: pos.x + 2, y: pos.y + 2}, {x: pos.x + 2, y: pos.y - 2}, {x: pos.x - 2, y: pos.y + 2}]
            self.posesFilter = [];
            if (color == 'black') {
              self.posesFilter = poses.filter(function (item) {
                console.log(self.getChessItemByPos(color, (item.x + pos.x) / 2, (item.y + pos.y) / 2) < 0)
                return item.x >= 0 && item.x <= 8 && item.y >= 0 && item.y <= 4 && self.getChessItemByPos(color, item.x, item.y) < 0 && self.getChessItemByPos(color, (item.x + pos.x) / 2, (item.y + pos.y) / 2) < 0;
              })

            } else {
              self.posesFilter = poses.filter(function (item) {
                item.x >= 0 && item.x <= 8 && item.y >= 5 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0 && self.getChessItemByPos(color, (item.x + pos.x) / 2, (item.y + pos.y) / 2) < 0;
              })
            }
            console.log(self.posesFilter)
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;
          } else if (chessMessage == '马' || chessMessage == '馬') {
            let poses = [{x: pos.x - 2, y: pos.y - 1}, {x: pos.x - 2, y: pos.y + 1}, {
              x: pos.x + 2,
              y: pos.y + 1
            }, {x: pos.x + 2, y: pos.y - 1}, {x: pos.x + 1, y: pos.y - 2}, {x: pos.x + 1, y: pos.y + 2}, {
              x: pos.x - 1,
              y: pos.y + 2
            }, {x: pos.x - 1, y: pos.y - 2}]
            self.posesFilter = [];
            if (color == 'black') {
              self.posesFilter = poses.filter(function (item) {
                console.log(self.getChessItemByPos(color, item.x - 1, item.y - 1) < 0);
                let zhiHuanX = 0;
                if (item.x - pos.x > 0) {
                  zhiHuanX = 1;
                } else {
                  zhiHuanX = -1;
                }
                let zhiHuanY = 0;
                if (item.y - pos.y > 0) {
                  zhiHuanY = 1;
                } else {
                  zhiHuanY = -1;
                }
                return item.x >= 0 && item.x <= 8 && item.y >= 0 && item.y <= 4 && self.getChessItemByPos(color, item.x, item.y) < 0 && self.getChessItemByPos(color, item.x - zhiHuanX, item.y - zhiHuanY) < 0;
              })
              console.log(self.posesFilter)
            } else {
              console.log(poses)
              self.posesFilter = poses.filter(function (item) {
                let zhiHuanX = 0;
                if (item.x - pos.x > 0) {
                  zhiHuanX = 1;
                } else {
                  zhiHuanX = -1;
                }
                let zhiHuanY = 0;
                if (item.y - pos.y > 0) {
                  zhiHuanY = 1;
                } else {
                  zhiHuanY = -1;
                }
                //console.log(item,!!item.x >= 0 && item.x <= 8 && item.y >= 5 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0 && self.getChessItemByPos(color, item.x - zhiHuanX, item.y - zhiHuanY) < 0)
                return item.x >= 0 && item.x <= 8 && item.y >= 5 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0 && self.getChessItemByPos(color, item.x - zhiHuanX, item.y - zhiHuanY) < 0;
              })
              console.log(self.posesFilter)
            }
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;
          } else if (chessMessage == '士' || chessMessage == '仕') {
            let poses = [{x: pos.x - 1, y: pos.y - 1}, {x: pos.x + 1, y: pos.y + 1}, {
              x: pos.x + 1,
              y: pos.y - 1
            }, {x: pos.x - 1, y: pos.y + 1}]
            self.posesFilter = [];
            if (color == 'black') {
              self.posesFilter = poses.filter(function (item) {
                return item.x >= 3 && item.x <= 5 && item.y >= 0 && item.y <= 2 && self.getChessItemByPos(color, item.x, item.y) < 0;
              })
              console.log(self.posesFilter)
            } else {
              self.posesFilter = poses.filter(function (item) {
                return item.x >= 3 && item.x <= 5 && item.y >= 7 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0;
              })
            }
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;
          }
        } else if (chessMessage == '兵' || chessMessage == '卒') {
          let message;
          let poses;
          if (color == 'black') {
            if (pos.y >= 5) {
              message = [{message: '进', ifshow: true, notClick: true}, {message: '平', ifshow: true, notClick: true}];
              poses = [{x: pos.x, y: pos.y + 1}, {x: pos.x + 1, y: pos.y}, {x: pos.x - 1, y: pos.y}]
            } else {
              message = [{message: '进', ifshow: true, notClick: true}];
              poses = [{x: pos.x, y: pos.y + 1}]
            }
          } else {
            if (pos.y <= 4) {
              message = [{message: '进', ifshow: true, notClick: true}, {message: '平', ifshow: true, notClick: true}];
              poses = [{x: pos.x, y: pos.y - 1}, {x: pos.x + 1, y: pos.y}, {x: pos.x - 1, y: pos.y}]
            } else {
              message = [{message: '进', ifshow: true, notClick: true}];
              poses = [{x: pos.x, y: pos.y - 1}]
            }
          }
          self.posesFilter = [];
          self.posesFilter = poses.filter(function (item) {
            return item.x >= 0 && item.x <= 8 && item.y >= 0 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0;
          })
          console.log(self.posesFilter)

          if (color == 'black') {
            for (let i = 0; i < self.posesFilter.length; i++) {
              if (self.posesFilter[i].y > pos.y) {
                message[0] = {message: '进', ifshow: true, notClick: false}
              } else if (self.posesFilter[i].y = pos.y) {
                message[1] = {message: '平', ifshow: true, notClick: false}
              }
            }
          } else {
            for (let i = 0; i < self.posesFilter.length; i++) {
              if (self.posesFilter[i].y < pos.y) {
                message[0] = {message: '进', ifshow: true, notClick: false}
              } else if (self.posesFilter[i].y = pos.y) {
                message[1] = {message: '平', ifshow: true, notClick: false}
              }
            }
          }
          this.selectItems = message;

        } else {
          let message = [{message: '进', ifshow: true, notClick: true}, {message: '平', ifshow: true, notClick: true}, {message: '退', ifshow: true, notClick: true}]
          if (chessMessage == '车' || chessMessage == '車') {
            let poses = [];
            for (let i = pos.x - 1; i >= 0; i--) {
              if (self.getChessItemByPos(color, i, pos.y) < 0) {
                if (self.getOtherSideChessItemByPos(color, i, pos.y) >= 0) {
                  poses.push({x: i, y: pos.y});
                  break;
                }
                poses.push({x: i, y: pos.y})
              } else {
                break;
              }
            }
            for (let i = pos.x + 1; i <= 8; i++) {
              if (self.getChessItemByPos(color, i, pos.y) < 0) {
                if (self.getOtherSideChessItemByPos(color, i, pos.y) >= 0) {
                  poses.push({x: i, y: pos.y});
                  break;
                }
                poses.push({x: i, y: pos.y})
              } else {
                break;
              }
            }
            for (let i = pos.y - 1; i >= 0; i--) {
              if (self.getChessItemByPos(color, pos.x, i) < 0) {
                if (self.getOtherSideChessItemByPos(color, pos.x, i) >= 0) {
                  poses.push({x: i, y: pos.y});
                  break;
                }
                poses.push({x: pos.x, y: i})
              } else {
                break;
              }
            }
            for (let i = pos.y + 1; i <= 9; i++) {
              console.log(i, pos)
              if (self.getChessItemByPos(color, pos.x, i) < 0) {
                if (self.getOtherSideChessItemByPos(color, pos.x, i) >= 0) {
                  poses.push({x: i, y: pos.y});
                  break;
                }
                poses.push({x: pos.x, y: i})
              } else {
                break;
              }
            }

            self.posesFilter = poses;
            console.log(self.posesFilter)
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y = pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else {
                  message[2] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y = pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else {
                  message[2] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;

          } else if (chessMessage == '炮') {
            let poses = [];
            for (let i = pos.x - 1; i >= 0; i--) {
              if (self.getChessItemAllColorByPos(i, pos.y) < 0) {
                poses.push({x: i, y: pos.y})
              } else {
                break;
              }
            }
            console.log(poses)
            for (let i = pos.x + 1; i <= 8; i++) {
              if (self.getChessItemAllColorByPos(i, pos.y) < 0) {
                poses.push({x: i, y: pos.y});
              } else {
                break;
              }
            }
            console.log(pos.y)
            for (let i = pos.y - 1; i >= 0; i--) {
              if (self.getChessItemAllColorByPos(pos.x, i) < 0) {
                console.log(pos.x, i, poses)
                let xx = {x: pos.x, y: i}
                poses.push(xx);
                console.log(pos.x, i, poses)
              } else {
                break;
              }
            }
            for (let i = pos.y + 1; i <= 9; i++) {
              if (self.getChessItemAllColorByPos(pos.x, i) < 0) {
                poses.push({x: pos.x, y: i});
              } else {
                break;
              }
            }
            let paoPoses = self.getPaoChiPos(color, pos.x, pos.y)
            self.posesFilter = poses.concat(paoPoses);
            console.log(self.posesFilter)
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y = pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else {
                  message[2] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y = pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else {
                  message[2] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;
          } else {  // 将 帅
            let message = [{message: '进', ifshow: true, notClick: true}, {
              message: '平',
              ifshow: true,
              notClick: true
            }, {message: '退', ifshow: true, notClick: true}]
            let poses = [{x: pos.x, y: pos.y - 1}, {x: pos.x, y: pos.y + 1}, {x: pos.x + 1, y: pos.y}, {
              x: pos.x - 1,
              y: pos.y
            }];
            self.posesFilter = [];
            if (color == 'black') {
              self.posesFilter = poses.filter(function (item) {
                return item.x >= 3 && item.x <= 5 && item.y >= 0 && item.y <= 2 && self.getChessItemByPos(color, item.x, item.y) < 0;
              })
              console.log(self.posesFilter)
            } else {
              self.posesFilter = poses.filter(function (item) {
                item.x >= 3 && item.x <= 5 && item.y >= 7 && item.y <= 9 && self.getChessItemByPos(color, item.x, item.y) < 0;
              })
            }
            if (color == 'black') {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[0] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[2] = {message: '退', ifshow: true, notClick: false}
                }
              }
            } else {
              for (let i = 0; i < self.posesFilter.length; i++) {
                if (self.posesFilter[i].y > pos.y) {
                  message[2] = {message: '进', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y = pos.y) {
                  message[1] = {message: '平', ifshow: true, notClick: false}
                } else if (self.posesFilter[i].y < pos.y) {
                  message[0] = {message: '退', ifshow: true, notClick: false}
                }
              }
            }
            this.selectItems = message;
          }
        }
      },
      step4 :function (color,data) {
        let self =this;
        let message = [];
        let chessMessage = this.chess[color + 'Item'][this.chessIndex].message;
        if (chessMessage == '象' || chessMessage == '相' || chessMessage == '士' || chessMessage == '仕' || chessMessage == '马' || chessMessage == '馬') {
          if(data == '进'){
            if (color == 'black') {
              self.posesFilter.forEach(function (item) {
                if(item.y > self.pos.y){
                  message.push(item.x)
                }
              })

            } else {
              self.posesFilter.forEach(function (item) {
                if(item.y < self.pos.y){
                  message.push(item.x)
                }
              })
            }
            this.selectItems = color == 'black' ? blackStep : redStep1;
            console.log(this.selectItems)
            this.selectItems.forEach(function (item) {
              item.notClick = !~message.indexOf(self.chaXunX[item.message])
            })
            console.log(this.selectItems)
          }else{
            if (color == 'black') {
              self.posesFilter.forEach(function (item) {
                if(item.y < self.pos.y){
                  message.push(item.x)
                }
              })
            } else {
              self.posesFilter = forEach(function (item) {
                if(item.y > self.pos.y){
                  message.push(item.x)
                }
              })

            }
            this.selectItems = color == 'black' ? blackStep : redStep1;
            console.log(message)
            this.selectItems.forEach(function (item) {
              if (!~message.indexOf(self.chaXunX[item.message])) {
                item.notClick = true;
              }
            })
          }
        }else{
          if(data == '进'){
            if (color == 'black') {
              self.posesFilter.forEach(function (item) {
                if(item.y > self.pos.y){
                  message.push(item.y - self.pos.y)
                }
              })

            } else {
              self.posesFilter.forEach(function (item) {
                if(item.y < self.pos.y){
                  message.push(self.pos.y -item.y)
                }
              })
            }
            this.selectItems = color == 'black' ? blackStep : redStep2;
            this.selectItems.forEach(function (item) {
              item.notClick = !~message.indexOf(self.chaXunY[item.message])
            })
          }else if(data == '平'){
            self.posesFilter.forEach(function (item) {
              if(item.y = self.pos.y){
                message.push(item.x)
              }
            })
            this.selectItems = color == 'black' ? blackStep : redStep1;
            this.selectItems.forEach(function (item) {
              if (!~message.indexOf(self.chaXunX[item.message])) {
                item.notClick = true;
              }
            })
          }else{
            if (color == 'black') {
              self.posesFilter.forEach(function (item) {
                if(item.y < self.pos.y){
                  message.push(self.pos.y - item.y)
                }
              })
            } else {
              self.posesFilter = forEach(function (item) {
                if(item.y > self.pos.y){
                  message.push(item.y - self.pos.y)
                }
              })

            }
            this.selectItems = color == 'black' ? blackStep : redStep2;
            console.log(message)
            this.selectItems.forEach(function (item) {
              if (!~message.indexOf(self.chaXunY[item.message])) {
                item.notClick = true;
              }
            })
          }
        }

      },
      action: function (color, record) {
        console.log('action',record,this.posesFilter)
        let self = this;
        let chessMessage = this.chess[color + 'Item'][this.chessIndex].message;
        let pos = this.pos;
        let poses = [];
        if (chessMessage == '象' || chessMessage == '相' || chessMessage == '士' || chessMessage == '仕' || chessMessage == '马' || chessMessage == '馬') {
            poses = self.posesFilter.filter(function (item) {
            console.log(item.x == self.chaXunX[record[3]])
            return item.x == self.chaXunX[record[3]]
          })
          console.log(poses)
          this.chess[color + 'Item'][self.chessIndex].pos.push({x:poses[0].x,y:poses[0].y,active:true})
        }else{
          if (record[2] == '进' || record[2] == '退') {
              let qh = this.chaXunX[record[2]];
              let change = color == 'black' ? 1:-1;
              pos.y = pos.y + (!!qh ? -1 : 1) * this.chaXunY[record[3]]*change
              console.log(pos.y)
              this.chess[color + 'Item'][self.chessIndex].pos.push(pos)
            } else {
              let pos = this.chess[color + 'Item'][self.chessIndex].pos[this.chess[color + 'Item'][self.chessIndex].pos.length - 1];
              pos.x = this.chaXunX[message[3]];
              this.chess[color + 'Item'][self.chessIndex].pos.push(pos);
            }
        }



        // if (message[0] == '前' || message[0] == '后') {
        //   let qh = this.chaXunX[message[0]];
        //   chess = this.getChessesByName(color, message[1]);
        //   index = this.filterChessByQH(color, chess, message[0])
        // } else {
        //   console.log(message)
        //   let x = this.chaXunX[message[1]]
        //   index = this.getChessByNameX(color, message[0], x);
        //   console.log(index)
        // }
        // if (message[2] == '进' || message[2] == '退') {
        //   let qh = this.chaXunX[message[2]];
        //   let pos = this.chess[color + 'Item'][index].pos[this.chess[color + 'Item'][index].pos.length - 1];
        //   let change = color == 'black' ? 1:-1;
        //   pos.y = pos.y + (!!qh ? -1 : 1) * this.chaXunY[message[3]]*change
        //   console.log(pos.y)
        //   this.chess[color + 'Item'][index].pos.push(pos)
        // } else {
        //   let pos = this.chess[color + 'Item'][index].pos[this.chess[color + 'Item'][index].pos.length - 1];
        //   pos.x = this.chaXunX[message[3]];
        //   this.chess[color + 'Item'][index].pos.push(pos);
        // }
      },
      getChessesByName: function (color, name) {
        let data = [];
        this.chess[color + 'Item'].forEach(function (item, index) {
          if (item.message == name && item.pos[item.pos.length - 1].active) {
            data.push(index)
          }
        })
        return data;
//      return this.chess[color+'Item'].map((o,index) => {if(o.message == name && o.pos[o.pos.length-1].active ){return index}}).filter(o => ~o)
      },
      getChessByNameX: function (color, name, x) {  //根据name 和 x 位置 返回棋子index
        let indexFilter = -1;
        this.chess[color + 'Item'].forEach(function (item, index) {
          if (item.message == name && item.pos[item.pos.length - 1].active && item.pos[item.pos.length - 1].x == x) {
            indexFilter = index;
          }
        })
        return indexFilter;
      },
      getChessItemByPos: function (color, x, y) {   //根据位置 返回棋子的index
        let indexFilter = -1;
        this.chess[color + 'Item'].forEach(function (item, index) {
          if (item.pos[item.pos.length - 1].x == x && item.pos[item.pos.length - 1].y == y && item.pos[item.pos.length - 1].active) {
            indexFilter = index;
          }
        })
        return indexFilter;
        //return this.chess[color+'Item'].map((o,index) => {if(o.pos == name && o.pos[o.pos.length-1].active ){ return index  }}).filter(o => o != undefined)
      },
      getOtherSideChessItemByPos: function (color, x, y) {   //根据位置 返回对方棋子的index
        let colorEx = color == 'black' ? 'red' : 'black';
        let indexFilter = -1;
        this.chess[colorEx + 'Item'].forEach(function (item, index) {
          if (item.pos[item.pos.length - 1].x == x && item.pos[item.pos.length - 1].y == y && item.pos[item.pos.length - 1].active) {
            indexFilter = index;
          }
        })
        return indexFilter;
      },
      getChessItemAllColorByPos: function (x, y) {
        let indexFilter = -1;
        this.chess['blackItem'].forEach(function (item, index) {
          if (item.pos[item.pos.length - 1].x == x && item.pos[item.pos.length - 1].y == y && item.pos[item.pos.length - 1].active) {
            indexFilter = index;
          }
        })
        this.chess['redItem'].forEach(function (item, index) {
          if (item.pos[item.pos.length - 1].x == x && item.pos[item.pos.length - 1].y == y && item.pos[item.pos.length - 1].active) {
            indexFilter = index;
          }
        })

        return indexFilter;
      },
      getPaoChiPos: function (color, x, y) {
        let self = this;
        let poses = [];
        let num = 0;
        for (let i = x - 1; i >= 0; i--) {
          if (num == 0) {
            if (self.getChessItemAllColorByPos(i, y) >= 0) {
              num++;
            }
          } else if (num == 1) {
            if (self.getChessItemAllColorByPos(i, y) >= 0) {
              if (self.getOtherSideChessItemByPos(color, i, y) >= 0) {
                poses.push({x: i, y: y})
              }
              break;
            }
          }
        }
        num = 0;
        for (let i = x + 1; i <= 8; i++) {
          if (num == 0) {
            if (self.getChessItemAllColorByPos(i, y) >= 0) {
              num++;
            }
          } else if (num == 1) {
            if (self.getChessItemAllColorByPos(i, y) >= 0) {
              if (self.getOtherSideChessItemByPos(color, i, y) >= 0) {
                poses.push({x: i, y: y})
              }
              break;
            }
          }
        }
        num = 0;
        for (let i = y - 1; i >= 0; i--) {
          if (num == 0) {
            if (self.getChessItemAllColorByPos(x, i) >= 0) {
              num++;
            }
          } else if (num == 1) {
            if (self.getChessItemAllColorByPos(x, i) >= 0) {
              if (self.getOtherSideChessItemByPos(color, x, i) >= 0) {
                poses.push({x: x, y: i})
              }
              break;
            }
          }
        }
        num = 0;
        for (let i = y + 1; i <= 9; i++) {
          console.log(i)
          if (num == 0) {
            if (self.getChessItemAllColorByPos(x, i) >= 0) {
              console.log('i', i)
              num++;
            }
          } else if (num == 1) {
            if (self.getChessItemAllColorByPos(x, i) >= 0) {
              if (self.getOtherSideChessItemByPos(color, x, i) >= 0) {
                poses.push({x: x, y: i})
              }
              break;
            }
          }
        }
        console.log(poses)
        return poses;
      },
      getChessIndexByRecord: function (color, record) {  //根据数据记录 返回棋子的index
        let self = this;
        if (record[0] == '前' || record[0] == '后') {
          let chess = this.getChessesByName(color, record[1]);
          let qh = record[0] == '前' ? 0 : 1;
          return this.filterChessByQH(color, chess, qh)
        } else {

          let index = this.getChessByNameX(color, record[0], self.chaXunX[record[1]])
          return index
        }
      },
      filterChessByQH: function (color, chessIndex, qh) { //0 前 1 后  根据前后筛选index的数组 返回查找的index
        let index = 0;
        let chessFirst = this.chess[color + 'Item'][chessIndex[index]];
        let chessSecond = this.chess[color + 'Item'][chessIndex[index + 1]];
        if (color == 'red') {
          index = ~~!index
        }
        if (!!qh) {
          index = ~~!index
        }
        if (chessFirst.pos[chessFirst.pos.length - 1].y < chessSecond.pos[chessSecond.pos.length - 1].y) {
          index = ~~!index
        }
        return index;
      },
      filterChessTwoInY: function (color) { //筛选同一y轴上 相同的子   用于 显示前后
        let chess = [];
        for (let i = 0; i < 10; i++) {
          this.chess[color + 'Item'].forEach(function (item) {
            let chesses = []
            if (item.pos[item.pos.length - 1].active && item.pos[item.pos.length - 1].y == i) {
              if (!~chesses.indexOf(item.message)) {
                chesses.push(item.message)
              } else {
                chess.push(item.message)
              }
            }
          })
        }
        return chess;
      },
      getAllChessNameByColor: function (color) {  //根据颜色 返回子的message
        let chess = [];
        this.chess[color + 'Item'].forEach(function (item) {
          if (item.pos[item.pos.length - 1].active) {
            if (!~chess.indexOf(item.message)) {
              chess.push(item.message)
            }
          }
        })
        return chess
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .main, .mainElse {
    width: 582px;
    height: 700px;
    margin: 0 auto;
    position: relative;
    .top, .bottom {
      width: 100%;
      height: 50px;
      ul {
        width: 100%;
        height: 50px;
        padding-left: 0px;
        margin: 0px 0px 0px -25px;
        li {
          display: inline-block;
          //text-align: center;
          font-size: 22px;
          line-height: 50px;
          float: left;
          height: 50px;
          width: 50px;
        }
      }

    }
    .chess {
      margin: 25px 0px;
      background: url("../assets/chessBg.jpg");
      background-size: 400px 450px;
      background-repeat: no-repeat;
      width: 400px;
      height: 450px;
    }

  }

  .mainElse span {
    display: inline-block;
    width: 50%;
    height: 100%;
    font-size: 40px;
    color: white;
    line-height: 700px;
    text-align: center;
  }

  .chess {
    span {
      width: 50px;
      height: 50px;
      position: absolute;
      line-height: 50px;
      /*transition-duration: 2s;*/
    }
    .black {
      /*display: block;*/
      background-size: 50px 50px;
      width: 37px;
      height: 37px;
      border-radius: 40px;
      border: rgb(78, 56, 23) double 5px;
      background-color: rgb(192, 149, 106);
      margin: auto;
      text-align: center;
      font: 30px "楷体";
      line-height: 40px;
      text-shadow: 0px 0px 2px white;
      box-shadow: 1px 1px 1px black;
      /*position: absolute;*/
    }
    .red {
      background-size: 50px 50px;
      width: 37px;
      height: 37px;
      border-radius: 40px;
      border: rgb(78, 56, 23) double 5px;
      background-color: rgb(192, 149, 106);
      margin: auto;
      text-align: center;
      font: 30px "楷体";
      line-height: 40px;
      text-shadow: 0px 0px 2px white;
      box-shadow: 1px 1px 1px black;
      color: rgb(144, 11, 11);
      border-color: rgb(144, 11, 11);

    }

  }

  .select {
    width: 100%;
    height: 50px;
    ul {
      width: 100%;
      height: 50px;
      padding-left: 0px;
      margin: 0px 0px 0px -25px;
      li {
        display: inline-block;
        //text-align: center;
        font-size: 22px;
        line-height: 50px;
        float: left;
        margin-left: 3px;
        height: 47px;
        width: 47px;
        background-color: aqua;
        &:hover {
          background-color: aquamarine;
        }
      }
    }
    .notClick {
      background-color: gray;
      &:hover {
        background-color: gray;
      }
    }

  }

  .message {
    margin-left: -200px;
  }

  .animated-move {
    transition: transform 2s;
  }

  .animated-enter-active {
    animation: fade 2s;
  }

  .animated-leave-active {
    animation: fade 2s reverse;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }


</style>



