"use strict";(self["webpackChunkkonst"]=self["webpackChunkkonst"]||[]).push([[759],{6759:function(e,i,s){s.r(i),s.d(i,{default:function(){return y}});var t=s(3396),o=s(7139);const l={key:0,class:"bg-white mx-auto"},a={class:"mx-auto text-right text-4xl font-bold cursor-pointer"},d=["src"],r={key:1,class:"px-4"},n={class:"text-2xl md:text-3xl"},c={class:"pt-2 pb-8 max-w-3xl"},m={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"},h=["onClick"],g=["src"],p={class:"text-xl pt-2 text-center"};function u(e,i,u,f,w,x){const k=(0,t.up)("ArtLink");return w.showModal?((0,t.wg)(),(0,t.iD)("div",l,[(0,t._)("div",a,[(0,t._)("span",{onClick:i[0]||(i[0]=(...e)=>x.closeModal&&x.closeModal(...e))}," ✕ ")]),(0,t._)("img",{class:"mx-auto max-h-full max-w-full object-cover",src:s(1776)("./"+w.folderName+w.activeImage.name)},null,8,d)])):((0,t.wg)(),(0,t.iD)("div",r,[(0,t._)("h2",n,(0,o.zw)(w.id2||w.id),1),(0,t._)("p",c,(0,o.zw)(w.description),1),(0,t._)("ul",m,[w.images.length?((0,t.wg)(!0),(0,t.iD)(t.HY,{key:0},(0,t.Ko)(w.images,((e,i)=>((0,t.wg)(),(0,t.iD)("li",{class:"flex flex-col justify-end cursor-pointer",key:i,onClick:i=>x.openModal(e)},[(0,t._)("img",{class:"max-w-auto max-h-72 mx-auto",src:s(1776)("./"+w.folderName+e.name)},null,8,g),(0,t._)("h3",p,(0,o.zw)(e.displayName),1)],8,h)))),128)):(0,t.kq)("",!0),w.folders.length?((0,t.wg)(!0),(0,t.iD)(t.HY,{key:1},(0,t.Ko)(w.folders,((e,i)=>((0,t.wg)(),(0,t.iD)("li",{key:e.name+i},[(0,t.Wm)(k,{folder:w.folderName+e.name,link:w.id+"/"+e.displayName,title:e.displayName,image:x.getImage(e)},null,8,["folder","link","title","image"])])))),128)):(0,t.kq)("",!0)])]))}var f=s(5594),w=s(2733),x={components:{ArtLink:w.Z},data(){return{image:"logo.png",description:"",images:[],folders:[],folderName:"",showModal:!1,activeImage:"",oldPos:0,id:"",id2:""}},watch:{"$route.params":{handler:function(){this.images=[],this.folders=[],this.activeImage="",this.description="",this.onNavigate()},deep:!0}},created(){this.onNavigate()},mounted(){window.scrollTo(0,0)},methods:{onNavigate(){this.id=this.$route.params.id,this.id2=this.$route.params.id2,this.id||this.returnHome();let e=f.find((e=>e.displayName===this.$route.params.id));if(e||this.returnHome(),this.id2){let i=e.children.find((e=>e.displayName===this.$route.params.id2));this.folderName=e.name+"/"+i.name+"/",this.description=i.description,this.images=i.children}else this.folderName=e.name+"/",this.description=e.description,e.children.some((e=>"folder"===e.type))?this.folders=e.children.filter((e=>"folder"===e.type)):this.images=e.children},returnHome(){this.$router.push({path:"/"})},openModal(e){this.showModal=!0,this.activeImage=e,window.scrollY&&(this.oldPos=window.scrollY,window.scrollTo(0,0))},closeModal(){this.showModal=!1,window.scrollTo(0,this.oldPos)},getImage(e){return e.children.find((e=>e.name.includes(".jpg")||e.name.includes(".png")||e.name.includes(".jpeg"))).name}}},k=s(89);const v=(0,k.Z)(x,[["render",u]]);var y=v}}]);
//# sourceMappingURL=759.50b42310.js.map