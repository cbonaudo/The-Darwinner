webpackJsonp([0],{"6duN":function(e,i){},"98dY":function(e,i){},NHnr:function(e,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t=s("7+uW"),l={render:function(){var e=this.$createElement,i=this._self._c||e;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var n=s("VU/8")({name:"App"},l,!1,function(e){s("sbcC")},null,null).exports,r=s("/ocq"),a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("div",{staticClass:"goal"},[s("h2",[e._v("How to play :")]),e._v(" "),s("h3",[e._v("Part I - The Cells Era")]),e._v(" "),s("ul",[s("li",[e._v("Divide Cells")]),e._v(" "),s("li",[e._v("Buy Upgrades (cost 90% of your cells)")]),e._v(" "),s("li",[e._v("Repeat")]),e._v(" "),s("li",[e._v("$$-Profit-$$")])])])}]};var u={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,i=this._self._c||e;return i("div",{staticClass:"header"},[i("h1",[this._v("ThE DaRwInNeR™")]),this._v(" "),i("p",{staticClass:"subtitle"},[i("span",[this._v('"Evolve this"')]),this._v(" -\n    "),i("span",[this._v("Version 0.1.0")]),this._v(" -\n    "),i("span",[this._v("cbonaudo")])])])}]};var c={name:"Cells",data:function(){return{clicksNumber:0,timer:0,cellsNumber:1,maxClickMultiplier:.05,earnedCellClick:0,periodicGain:0,divisionChance:0,periodicMultiplier:.05,earnedCellPeriodic:0,upgradesAvailable:[],upgrades:{"Buff 1":{},"Buff 2":{},"Buff 3":{},"Buff 4":{}}}},created:function(){setInterval(this.tickActions,1e3)},methods:{clickCells:function(e){this.clicksNumber+=1;var i=Math.floor(this.cellsNumber);this.cellsNumber<4?this.cellsNumber+=Math.random()*(this.cellsNumber*this.maxClickMultiplier*(5-this.cellsNumber)):this.cellsNumber+=Math.random()*(this.cellsNumber*this.maxClickMultiplier),this.earnedCellClick=this.cellsNumber-i,this.showUpgradeCells()},showUpgradeCells:function(){this.cellsNumber>50&&!this.upgrades["Buff 1"].shown&&(this.upgradesAvailable.push({name:"Buff 1",description:"You earn 1 Cell per second"}),this.upgrades["Buff 1"].shown=!0),this.cellsNumber>100&&this.upgrades["Buff 1"].used&&!this.upgrades["Buff 2"].shown&&(this.upgradesAvailable.push({name:"Buff 2",description:"Add 5% to your max click multiplier"}),this.upgrades["Buff 2"].shown=!0),this.cellsNumber>1e3&&this.upgrades["Buff 2"].used&&!this.upgrades["Buff 3"].shown&&(this.upgradesAvailable.push({name:"Buff 3",description:"Add 10% to Automatic Division chances"}),this.upgrades["Buff 3"].shown=!0),this.cellsNumber>1e4&&this.upgrades["Buff 3"].used&&!this.upgrades["Buff 4"].shown&&(this.upgradesAvailable.push({name:"Buff 4",description:""}),this.upgrades["Buff 4"].shown=!0)},useUpgradeCells:function(e,i){switch(e){case"Buff 1":this.periodicGain+=1,this.upgrades["Buff 1"].used=!0;break;case"Buff 2":this.maxClickMultiplier+=.05,this.upgrades["Buff 2"].used=!0;break;case"Buff 3":this.divisionChance+=.1,this.upgrades["Buff 3"].used=!0}this.upgradesAvailable.splice(i,1),this.cellsNumber=.1*this.cellsNumber,this.showUpgradeCells()},tickActions:function(){this.timer+=1,Math.random()<this.divisionChance&&(this.earnedCellPeriodic=this.cellsNumber*this.periodicMultiplier,this.cellsNumber+=this.cellsNumber*this.periodicMultiplier),this.cellsNumber+=this.periodicGain},resetCells:function(){this.timer=0,this.clicksNumber=0,this.cellsNumber=1,this.maxClickMultiplier=.05,this.earnedCellClick=0,this.divisionChance=0,this.periodicMultiplier=.05,this.earnedCellPeriodic=0,this.periodicGain=0,this.upgradesAvailable=[],this.upgrades={"Buff 1":{},"Buff 2":{},"Buff 3":{},"Buff 4":{}}},doubleMulti:function(){this.maxClickMultiplier*=2}}},o={render:function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("div",[s("h2",[s("span",[e._v(e._s(Math.floor(e.cellsNumber)))]),e._v(" Cells\n  ")]),e._v(" "),e.divisionChance>0?s("p",[e._v("\n    Automatic Division Chance :\n    "),s("span",[e._v(e._s(Math.floor(100*e.divisionChance))+" %")]),e._v("\n    Periodic Multiplier :\n    "),s("span",[e._v(e._s(Math.floor(100*e.periodicMultiplier))+" %")])]):e._e(),e._v(" "),s("p",[e._v("\n    Current Max Click Multiplier :\n    "),s("span",[e._v(e._s(Math.floor(100*e.maxClickMultiplier))+" %")])]),e._v(" "),s("button",{on:{click:e.clickCells}},[e._v("Divide")]),e._v(" "),s("p",[e._v("+ "+e._s(Math.floor(e.earnedCellPeriodic))+" | + "+e._s(Math.floor(e.earnedCellClick)))]),e._v(" "),e.periodicGain>0?s("p",[e._v("+ "+e._s(e.periodicGain)+"/sec")]):e._e(),e._v(" "),s("div",e._l(e.upgradesAvailable,function(i,t){return s("div",{key:t},[s("button",{on:{click:function(s){return e.useUpgradeCells(i.name,t)}}},[e._v(e._s(i.name))]),e._v(" "),s("span",[e._v(e._s(i.description))])])}),0),e._v(" "),s("div",{staticClass:"debug"},[s("p",[e._v("Clicks : "+e._s(e.clicksNumber))]),e._v(" "),s("p",[e._v("Timer : "+e._s(e.timer))])])])},staticRenderFns:[]};var h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this,i=e.$createElement,s=e._self._c||i;return s("div",{staticClass:"changelog"},[s("h2",[e._v("Release Notes")]),e._v(" "),s("h3",[e._v("V.0.1.0 - Genesis - 07/04/19")]),e._v(" "),s("ul",[s("li",[e._v("Create the game")]),e._v(" "),s("li",[e._v("Find a cool-ass name")]),e._v(" "),s("li",[e._v("Create Basic functions")]),e._v(" "),s("li",[e._v("Deploy the game")]),e._v(" "),s("li",[e._v("Pickles")]),e._v(" "),s("li",[e._v("Tomatoes")])])])}]};var d={name:"Global",components:{Goal:s("VU/8")({name:"Goal"},a,!1,function(e){s("re/v")},null,null).exports,Header:s("VU/8")({name:"Header"},u,!1,function(e){s("98dY")},null,null).exports,Cells:s("VU/8")(c,o,!1,function(e){s("eFNq")},null,null).exports,Changelog:s("VU/8")({name:"Changelog"},h,!1,function(e){s("6duN")},null,null).exports}},f={render:function(){var e=this.$createElement,i=this._self._c||e;return i("div",[i("Goal"),this._v(" "),i("Header"),this._v(" "),i("Cells"),this._v(" "),i("Changelog")],1)},staticRenderFns:[]};var p=s("VU/8")(d,f,!1,function(e){s("VMEV")},"data-v-5be89975",null).exports;t.a.use(r.a);var v=new r.a({routes:[{path:"/",name:"Global",component:p}]});t.a.config.productionTip=!1,new t.a({el:"#app",router:v,components:{App:n},template:"<App/>"})},VMEV:function(e,i){},eFNq:function(e,i){},"re/v":function(e,i){},sbcC:function(e,i){}},["NHnr"]);
//# sourceMappingURL=app.15a37400f6c91a1c4f40.js.map