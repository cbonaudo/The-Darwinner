webpackJsonp([0],{"+S/9":function(e,t){},"0mxb":function(e,t){},"8wre":function(e,t){},"9eSp":function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var r=i("VU/8")({name:"App"},n,!1,function(e){i("+S/9")},null,null).exports,l=i("/ocq"),o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"header"},[t("h1",[this._v("ThE DaRwInNeR™")]),this._v(" "),t("p",{staticClass:"subtitle"},[t("span",[this._v("'Evolve this'")]),this._v(" -\n    "),t("span",[this._v("Version 0.2.0")]),this._v(" -\n    "),t("span",[this._v("github.com/cbonaudo")])])])}]};var a=i("VU/8")({name:"Header"},o,!1,function(e){i("0mxb")},null,null).exports,c=[{text:'Allow to use "A" to generate Atoms',action:"unlockKeystroke",proteinsNeeded:1},{text:"Double Atoms per click",action:"doubleIncrement",proteinsNeeded:3}],u={name:"Atoms",data:function(){return{atomsNumber:0,proteinsNumber:0,incrementValue:1,upgrades:c,upgradesBought:[],maintainUnlocked:!1}},watch:{atomsNumber:{handler:function(){this.getProteins()}}},methods:{atomClick:function(){this.$emit("clicked"),this.atomBuying()},atomBuying:function(){this.atomsNumber+=this.incrementValue},getProteins:function(){this.atomsNumber>=210&&(this.proteinsNumber+=Math.floor(this.atomsNumber/210),this.atomsNumber%=210)},useUpgrade:function(e,t){this["upgrade_"+e.action](),this.proteinsNumber-=e.proteinsNeeded,this.upgradesBought.push(e),this.upgrades.splice(t,1)},upgrade_doubleIncrement:function(){this.incrementValue*=2},upgrade_unlockKeystroke:function(){this.maintainUnlocked=!0,this.$emit("unlockKeystroke")},isUnlocked:function(e){return this.proteinsNumber>=e.proteinsNeeded},resetAtoms:function(){this.atomsNumber=0}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"flex-row space-between"},[i("div",{staticClass:"upgrades-bought"},e._l(e.upgradesBought,function(t,s){return i("div",{key:s},[e._v(e._s(t.text))])}),0),e._v(" "),i("div",{staticClass:"atom-container"},[i("h2",[i("span",[e._v(e._s(e.atomsNumber)+" "+e._s(1===e.atomsNumber?"Atom":"Atoms"))]),e._v(" "),i("br"),e._v(" "),e.proteinsNumber?i("span",[e._v(e._s(e.proteinsNumber>9999?e.proteinsNumber.toExponential():e.proteinsNumber)+"\n          "+e._s(1===e.atomsNumber?"Protein":"Proteins"))]):e._e()]),e._v(" "),i("div",[i("div",[e._v(e._s(1===e.incrementValue?"Atom":"Atoms")+" per Click : "+e._s(e.incrementValue))]),e._v(" "),i("div",[i("button",{on:{click:e.atomClick}},[e._v("\n            Add 1\n            "),i("span",{class:e.maintainUnlocked?"underlined":""},[e._v("A")]),e._v("tom\n          ")])]),e._v(" "),i("div",e._l(e.upgrades,function(t,s){return i("div",{key:s},[e.isUnlocked(t)?i("button",{on:{click:function(i){return e.useUpgrade(t,s)}}},[e._v(e._s(t.text))]):e._e()])}),0)])])])])},staticRenderFns:[]};var h=i("VU/8")(u,d,!1,function(e){i("wxsz")},"data-v-a7d5bb3a",null).exports,v=[{name:"More mutliplier",description:"Add 5% to your max click multiplier"},{name:"More Auto-Division",description:"Add 10% to Automatic Division chances"},{name:"Easier Auto-Division",description:"Add 5% to Automatic Division Multiplier"}],m={name:"Cells",data:function(){return{clicksNumber:0,timer:0,cellsNumber:1,maxClickMultiplier:.05,earnedCellClick:0,periodicGain:0,divisionChance:0,periodicMultiplier:.05,earnedCellPeriodic:0,upgradesAvailable:[],upgrades:v}},created:function(){setInterval(this.tickActions,1e3)},methods:{clickCells:function(e){this.clicksNumber+=1;var t=Math.floor(this.cellsNumber);this.cellsNumber<4?this.cellsNumber+=Math.random()*(this.cellsNumber*this.maxClickMultiplier*(5-this.cellsNumber)):this.cellsNumber+=Math.random()*(this.cellsNumber*this.maxClickMultiplier),this.earnedCellClick=this.cellsNumber-t,this.showUpgrades()},showUpgrades:function(){this.displayBuff(50,this.upgrades[0]),this.displayBuff(100,this.upgrades[1]),this.displayBuff(1e3,this.upgrades[2]),this.displayBuff(1e4,this.upgrades[3])},displayBuff:function(e,t){this.cellsNumber>e&&!this.buffs[t.name].shown&&(console.log(this.cellsNumber),this.upgradesAvailable.push(t),this.buffs[t.name].shown=!0)},useUpgradeCells:function(e,t){switch(e){case"More mutliplier":this.maxClickMultiplier+=.05,this.buffs[e].used=!0;break;case"More Auto-Division":this.divisionChance+=.1,this.buffs[e].used=!0;break;case"Easier Auto-Division":this.divisionChance+=.1,this.buffs[e].used=!0}this.upgradesAvailable.splice(t,1),this.cellsNumber=.1*this.cellsNumber,this.showUpgrades()},tickActions:function(){this.timer+=1,Math.random()<this.divisionChance&&(this.earnedCellPeriodic=this.cellsNumber*this.periodicMultiplier,this.cellsNumber+=this.cellsNumber*this.periodicMultiplier),this.cellsNumber+=this.periodicGain},resetCells:function(){this.timer=0,this.clicksNumber=0,this.cellsNumber=1,this.maxClickMultiplier=.05,this.earnedCellClick=0,this.divisionChance=0,this.periodicMultiplier=.05,this.earnedCellPeriodic=0,this.periodicGain=0,this.upgradesAvailable=[],this.upgrades=v},doubleMulti:function(){this.maxClickMultiplier*=2}}},_={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("h2",[i("span",[e._v(e._s(Math.floor(e.cellsNumber)))]),e._v(" Cells\n  ")]),e._v(" "),e.divisionChance>0?i("p",[e._v("\n    Automatic Division Chance :\n    "),i("span",[e._v(e._s(Math.floor(100*e.divisionChance))+" %")]),e._v("\n    Periodic Multiplier :\n    "),i("span",[e._v(e._s(Math.floor(100*e.periodicMultiplier))+" %")])]):e._e(),e._v(" "),i("p",[e._v("\n    Current Max Click Multiplier :\n    "),i("span",[e._v(e._s(Math.floor(100*e.maxClickMultiplier))+" %")])]),e._v(" "),i("button",{on:{click:e.clickCells}},[e._v("Divide")]),e._v(" "),i("p",[e._v("+ "+e._s(Math.floor(e.earnedCellPeriodic))+" | + "+e._s(Math.floor(e.earnedCellClick)))]),e._v(" "),e.periodicGain>0?i("p",[e._v("+ "+e._s(e.periodicGain)+"/sec")]):e._e(),e._v(" "),i("div",e._l(e.upgradesAvailable,function(t,s){return i("div",{key:s},[i("button",{on:{click:function(i){return e.useUpgradeCells(t.name,s)}}},[e._v(e._s(t.name))]),e._v(" "),i("span",[e._v(e._s(t.description))])])}),0),e._v(" "),i("div",{staticClass:"debug"},[i("button",{on:{click:e.resetCells}},[e._v("Reset")]),e._v(" "),i("button",{on:{click:e.doubleMulti}},[e._v("Double")]),e._v(" "),i("p",[e._v("Clicks : "+e._s(e.clicksNumber))]),e._v(" "),i("p",[e._v("Timer : "+e._s(e.timer))])])])},staticRenderFns:[]};var p=i("VU/8")(m,_,!1,function(e){i("8wre")},null,null).exports,f={name:"Goal",data:function(){return{atomCeiling:210}},props:{era:{default:0}}},k={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"goal"},[i("h2",[e._v("How to play :")]),e._v(" "),0===e.era?i("div",[i("h3",[e._v("Error - Era")]),e._v(" "),i("p",[e._v("Someone messed up big")])]):e._e(),e._v(" "),1===e.era?i("div",[i("h3",[e._v("Part I - The Atoms Era")]),e._v(" "),i("ul",[i("li",[e._v("Create more Atoms")]),e._v(" "),i("li",[e._v(e._s(e.atomCeiling)+" Atoms gives a Protein")]),e._v(" "),i("li",[e._v("42 M Proteins unlock next Era")])])]):e._e(),e._v(" "),2===e.era?i("div",[i("h3",[e._v("Part II - The Cells Era")]),e._v(" "),e._m(0)]):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Divide Cells")]),this._v(" "),t("li",[this._v("Buy Upgrades (cost 90% of your cells)")]),this._v(" "),t("li",[this._v("Repeat")]),this._v(" "),t("li",[this._v("$$-Profit-$$")])])}]},b={name:"Goal",data:function(){return{eraNumber:1,timer:0}},props:{clicks:{default:0},keyStrokes:{default:0}},created:function(){setInterval(this.tick,1e3)},methods:{tick:function(){this.timer++},reset:function(){this.$emit("resetAll"),this.timer=0}}},C={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"debug"},[i("button",{on:{click:e.reset}},[e._v("Reset")]),e._v(" "),i("p",[e._v("Clicks : "+e._s(e.clicks))]),e._v(" "),i("p",[e._v("Key Strokes : "+e._s(e.keyStrokes))]),e._v(" "),i("p",[e._v("Timer : "+e._s(e.timer))])])},staticRenderFns:[]};var g={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"changelog"},[i("h2",[e._v("Release Notes")]),e._v(" "),i("h3",[e._v("V.0.2.0 - Re-Genesis - 30/04/20")]),e._v(" "),i("ul",[i("li",[e._v("Add testing")]),e._v(" "),i("li",[e._v("Create Atoms Era")])]),e._v(" "),i("h3",[e._v("V.0.1.0 - Genesis - 07/04/19")]),e._v(" "),i("ul",[i("li",[e._v("Create the game")]),e._v(" "),i("li",[e._v("Find a cool-ass name")]),e._v(" "),i("li",[e._v("Create Cells era")]),e._v(" "),i("li",[e._v("Deploy the game")])])])}]};var N={name:"Global",data:function(){return{clicks:0,keyStrokes:0,era:1,keyStrokesAllowed:[]}},components:{Goal:i("VU/8")(f,k,!1,null,null,null).exports,Debug:i("VU/8")(b,C,!1,function(e){i("mhDV")},null,null).exports,Header:a,Atoms:h,Cells:p,Changelog:i("VU/8")({name:"Changelog"},g,!1,function(e){i("kMD7")},null,null).exports},created:function(){var e=this;document.onkeydown=function(t){65===(t=t||window.event).keyCode&&e.keyStrokesAllowed.includes(65)&&(e.$refs.atoms.atomBuying(),e.keyStrokes++)}},methods:{unlockKeystroke:function(e){this.keyStrokesAllowed.push(e)},resetAll:function(){this.$refs.atoms.resetAtoms(),this.clicks=0,this.keyStrokes=0}}},A={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"flex-row app-container"},[i("div",{staticClass:"flex-col main-window"},[i("Header"),e._v(" "),i("Atoms",{ref:"atoms",on:{clicked:function(t){e.clicks++},unlockKeystroke:function(t){return e.unlockKeystroke(65)}}})],1),e._v(" "),i("div",{staticClass:"sidebar"},[i("Goal",{attrs:{era:e.era}}),e._v(" "),i("Debug",{attrs:{clicks:e.clicks,keyStrokes:e.keyStrokes},on:{resetAll:e.resetAll}}),e._v(" "),i("Changelog")],1)])])},staticRenderFns:[]};var M=i("VU/8")(N,A,!1,function(e){i("9eSp")},"data-v-4146284a",null).exports;s.a.use(l.a);var y=new l.a({routes:[{path:"/",name:"Global",component:M}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:y,components:{App:r},template:"<App/>"})},kMD7:function(e,t){},mhDV:function(e,t){},wxsz:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.07596dffde8a2abc0a3b.js.map