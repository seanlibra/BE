(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f0f4198"],{"03b5":function(e,t,a){},"159b":function(e,t,a){var r=a("da84"),c=a("fdbc"),n=a("17c2"),o=a("9112");for(var i in c){var l=r[i],s=l&&l.prototype;if(s&&s.forEach!==n)try{o(s,"forEach",n)}catch(d){s.forEach=n}}},"15e8":function(e,t,a){"use strict";a("03b5")},"17c2":function(e,t,a){"use strict";var r=a("b727").forEach,c=a("a640"),n=c("forEach");e.exports=n?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},3359:function(e,t,a){},"47af":function(e,t,a){"use strict";a("74ce")},"4de4":function(e,t,a){"use strict";var r=a("23e7"),c=a("b727").filter,n=a("1dde"),o=n("filter");r({target:"Array",proto:!0,forced:!o},{filter:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})},"74ce":function(e,t,a){},"7f69":function(e,t,a){"use strict";a.r(t);var r=a("7a23"),c=Object(r["withScopeId"])("data-v-18b62d86");Object(r["pushScopeId"])("data-v-18b62d86");var n={class:"single_product"},o={class:"wrapper container"},i={class:"content"},l={class:"product_detail"},s={class:"left_group"},d={key:0,class:"ribbon ribbon-top-left"},p={class:"ribbon_content"},u={class:"ribbon_border"},b={class:"right_group"},g={class:"product_title"},m={class:"price_wrapper"},f={key:0,class:"onsale_price"},h={class:"cart_tools"},v={class:"inner_container"},O=Object(r["createVNode"])("option",{value:""},"請選擇一個選項",-1),j={class:"inner_container"},y={class:"counter"},C={class:"product_category_container"},_=Object(r["createVNode"])("span",null,"商品分類: ",-1),k={class:"soical_media_container"},V=Object(r["createVNode"])("a",{style:{"background-image":"url('https://i.imgur.com/jMyZwmb.png')"},href:"#"},null,-1),N={class:"maylike_group"},B=Object(r["createVNode"])("h3",null,"或許你會喜歡",-1),x={key:0,class:"ribbon ribbon-top-left"},w={class:"ribbon_content"},S={class:"ribbon_border"},$=Object(r["createVNode"])("div",{class:"product_overlay"},null,-1),L={class:"category"},A={class:"title"},T={class:"price"},I={key:0,class:"onsale_price"};Object(r["popScopeId"])();var M=c((function(e,t,a,M,D,U){var E=Object(r["resolveComponent"])("Header"),P=Object(r["resolveComponent"])("Sidebar"),F=Object(r["resolveComponent"])("swiper-slide"),z=Object(r["resolveComponent"])("swiper"),H=Object(r["resolveComponent"])("router-link"),q=Object(r["resolveComponent"])("Loading"),G=Object(r["resolveComponent"])("Footer"),R=Object(r["resolveComponent"])("Bubble");return Object(r["openBlock"])(),Object(r["createBlock"])("div",n,[Object(r["createVNode"])(E,{"update-Cart":D.cartUpdteTrigger,"text-dark":!0},null,8,["update-Cart"]),Object(r["createVNode"])("div",o,[Object(r["createVNode"])(P),Object(r["createVNode"])("div",i,[Object(r["createVNode"])("div",l,[Object(r["createVNode"])("div",s,[D.product.onsale?(Object(r["openBlock"])(),Object(r["createBlock"])("div",d,[Object(r["createVNode"])("span",p,[Object(r["createVNode"])("span",u,Object(r["toDisplayString"])(D.product.onsale),1)])])):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])(z,{style:{"--swiper-navigation-color":"#fff","--swiper-pagination-color":"#fff"},spaceBetween:10,navigation:!0,thumbs:{swiper:D.thumbsSwiper},class:"swiper_show_img"},{default:c((function(){return[Object(r["createVNode"])(F,null,{default:c((function(){return[Object(r["createVNode"])("img",{src:D.product.imageUrl,alt:"商品預設圖"},null,8,["src"])]})),_:1}),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(D.product.imagesUrl,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])(F,{key:t},{default:c((function(){return[Object(r["createVNode"])("img",{src:e,alt:"商品圖片".concat(t+1)},null,8,["src","alt"])]})),_:2},1024)})),128))]})),_:1},8,["thumbs"]),Object(r["createVNode"])(z,{onSwiper:U.setThumbsSwiper,spaceBetween:10,slidesPerView:4,freeMode:!0,watchSlidesVisibility:!0,watchSlidesProgress:!0,class:"swiper_thumb"},{default:c((function(){return[Object(r["createVNode"])(F,null,{default:c((function(){return[Object(r["createVNode"])("img",{src:D.product.imageUrl,alt:"商品預設圖"},null,8,["src"])]})),_:1}),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(D.product.imagesUrl,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])(F,{key:t},{default:c((function(){return[Object(r["createVNode"])("img",{src:e,alt:"商品圖片".concat(t+1)},null,8,["src","alt"])]})),_:2},1024)})),128))]})),_:1},8,["onSwiper"])]),Object(r["createVNode"])("div",b,[Object(r["createVNode"])("h2",g,Object(r["toDisplayString"])(D.product.title),1),Object(r["createVNode"])("div",m,[Object(r["createVNode"])("span",{class:[{normal:D.product.price==D.product.origin_price},"origin_price"]},"$"+Object(r["toDisplayString"])(D.product.origin_price),3),D.product.price!==D.product.origin_price?(Object(r["openBlock"])(),Object(r["createBlock"])("span",f,"$"+Object(r["toDisplayString"])(D.product.price),1)):Object(r["createCommentVNode"])("",!0)]),Object(r["createVNode"])("div",{innerHTML:D.product.content,class:"description"},null,8,["innerHTML"]),Object(r["createVNode"])("div",h,[Object(r["createVNode"])("div",v,[Object(r["withDirectives"])(Object(r["createVNode"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return D.standard=e})},[O,(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(D.product.specifications,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])("option",{key:e,value:e},Object(r["toDisplayString"])(e),9,["value"])})),128))],512),[[r["vModelSelect"],D.standard]]),Object(r["createVNode"])("span",{class:[{active:D.standardAlert},"standard_alert"]},"請選擇一個尺寸",2)]),Object(r["createVNode"])("div",j,[Object(r["createVNode"])("div",y,[Object(r["createVNode"])("button",{type:"button",onClick:t[2]||(t[2]=function(e){return D.count>1?D.count--:1})}," - "),Object(r["withDirectives"])(Object(r["createVNode"])("input",{min:"1",max:"99",type:"number","onUpdate:modelValue":t[3]||(t[3]=function(e){return D.count=e})},null,512),[[r["vModelText"],D.count]]),Object(r["createVNode"])("button",{type:"button",onClick:t[4]||(t[4]=function(e){return D.count++})},"+")]),Object(r["createVNode"])("a",{onClick:t[5]||(t[5]=Object(r["withModifiers"])((function(){return U.addToCart&&U.addToCart.apply(U,arguments)}),["prevent"])),class:"add_to_cart",href:"#"},"加入購物車")])]),Object(r["createVNode"])("div",C,[_,Object(r["createVNode"])(H,{to:"/shop/".concat(D.product.category)},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(D.product.category),1)]})),_:1},8,["to"])]),Object(r["createVNode"])("div",k,[Object(r["createVNode"])("a",{target:"_blank",style:{"background-image":"url('https://i.imgur.com/sUM6rZ1.png')"},href:"https://www.facebook.com/sharer/sharer.php?u=".concat(D.pageUrl)},null,8,["href"]),Object(r["createVNode"])("a",{target:"_blank",style:{"background-image":"url('https://i.imgur.com/rxHpEdl.png')"},href:"http://www.twitter.com/share?url=".concat(D.pageUrl)},null,8,["href"]),Object(r["createVNode"])("a",{target:"_blank",style:{"background-image":"url('https://i.imgur.com/i9i9Hpf.png')"},href:"https://t.me/share/url?url=".concat(D.pageUrl,"&text=hey! check this out")},null,8,["href"]),Object(r["createVNode"])("a",{target:"_blank",style:{"background-image":"url('https://i.imgur.com/mQ6bpWS.png')"},href:"https://api.whatsapp.com/send?text=".concat(D.pageUrl)},null,8,["href"]),V])])])]),Object(r["createVNode"])("div",N,[B,Object(r["createVNode"])(z,{slidesPerView:4,spaceBetween:20,slidesPerGroup:1,loop:!1,loopFillGroupWithBlank:!0,pagination:{clickable:!0},navigation:!0,breakpoints:{768:{slidesPerView:3,spaceBetween:40},1025:{slidesPerView:4,spaceBetween:20}}},{default:c((function(){return[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(D.mayLikeList,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])(F,{key:e.product.id},{default:c((function(){return[e.product.onsale?(Object(r["openBlock"])(),Object(r["createBlock"])("div",x,[Object(r["createVNode"])("span",w,[Object(r["createVNode"])("span",S,Object(r["toDisplayString"])(e.product.onsale),1)])])):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])(H,{class:"product_thumbnail",to:"/product/".concat(e.product.id)},{default:c((function(){return[e.product.imagesUrl?(Object(r["openBlock"])(),Object(r["createBlock"])("img",{key:0,class:"on_hover",src:e.product.imagesUrl[0],alt:"商品圖片二"},null,8,["src"])):(Object(r["openBlock"])(),Object(r["createBlock"])("img",{key:1,class:"on_hover",src:e.product.imageUrl,alt:"商品圖片二"},null,8,["src"])),Object(r["createVNode"])("img",{class:"default",src:e.product.imageUrl,alt:"商品預設圖"},null,8,["src"]),$]})),_:2},1032,["to"]),Object(r["createVNode"])(H,{class:"product_info_link",to:"/product/".concat(e.product.id)},{default:c((function(){return[Object(r["createVNode"])("h4",L,Object(r["toDisplayString"])(e.product.category),1),Object(r["createVNode"])("h3",A,Object(r["toDisplayString"])(e.product.title),1),Object(r["createVNode"])("div",T,[Object(r["createVNode"])("span",{class:[{normal:e.product.price==e.product.origin_price},"origin_price"]},"$ "+Object(r["toDisplayString"])(e.product.origin_price),3),e.product.price!==e.product.origin_price?(Object(r["openBlock"])(),Object(r["createBlock"])("span",I,"$ "+Object(r["toDisplayString"])(e.product.price),1)):Object(r["createCommentVNode"])("",!0)])]})),_:2},1032,["to"])]})),_:2},1024)})),128))]})),_:1})])]),U.loading?(Object(r["openBlock"])(),Object(r["createBlock"])(q,{key:0})):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])(G),Object(r["createVNode"])(R,{ref:"bubble",bubbleText:D.bubbleText},null,8,["bubbleText"])])})),D=a("2909"),U=(a("99af"),a("fb6a"),a("159b"),a("a434"),a("b0c0"),a("4651")),E=a("acd4"),P=a("8d2b"),F=a("3a5e"),z=a("90ea"),H=a("a16a"),q=(a("5f67"),a("6d3b")),G=a("8343"),R=a("26ad"),J=a("70a4");function W(){return W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},W.apply(this,arguments)}var Z={update:function(){var e=this,t=e.rtl,a=e.params.pagination;if(a.el&&e.pagination.el&&e.pagination.$el&&0!==e.pagination.$el.length){var r,c=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,n=e.pagination.$el,o=e.params.loop?Math.ceil((c-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(r=Math.ceil((e.activeIndex-e.loopedSlides)/e.params.slidesPerGroup),r>c-1-2*e.loopedSlides&&(r-=c-2*e.loopedSlides),r>o-1&&(r-=o),r<0&&"bullets"!==e.params.paginationType&&(r=o+r)):r="undefined"!==typeof e.snapIndex?e.snapIndex:e.activeIndex||0,"bullets"===a.type&&e.pagination.bullets&&e.pagination.bullets.length>0){var i,l,s,d=e.pagination.bullets;if(a.dynamicBullets&&(e.pagination.bulletSize=d.eq(0)[e.isHorizontal()?"outerWidth":"outerHeight"](!0),n.css(e.isHorizontal()?"width":"height",e.pagination.bulletSize*(a.dynamicMainBullets+4)+"px"),a.dynamicMainBullets>1&&void 0!==e.previousIndex&&(e.pagination.dynamicBulletIndex+=r-e.previousIndex,e.pagination.dynamicBulletIndex>a.dynamicMainBullets-1?e.pagination.dynamicBulletIndex=a.dynamicMainBullets-1:e.pagination.dynamicBulletIndex<0&&(e.pagination.dynamicBulletIndex=0)),i=r-e.pagination.dynamicBulletIndex,l=i+(Math.min(d.length,a.dynamicMainBullets)-1),s=(l+i)/2),d.removeClass(a.bulletActiveClass+" "+a.bulletActiveClass+"-next "+a.bulletActiveClass+"-next-next "+a.bulletActiveClass+"-prev "+a.bulletActiveClass+"-prev-prev "+a.bulletActiveClass+"-main"),n.length>1)d.each((function(e){var t=Object(R["a"])(e),c=t.index();c===r&&t.addClass(a.bulletActiveClass),a.dynamicBullets&&(c>=i&&c<=l&&t.addClass(a.bulletActiveClass+"-main"),c===i&&t.prev().addClass(a.bulletActiveClass+"-prev").prev().addClass(a.bulletActiveClass+"-prev-prev"),c===l&&t.next().addClass(a.bulletActiveClass+"-next").next().addClass(a.bulletActiveClass+"-next-next"))}));else{var p=d.eq(r),u=p.index();if(p.addClass(a.bulletActiveClass),a.dynamicBullets){for(var b=d.eq(i),g=d.eq(l),m=i;m<=l;m+=1)d.eq(m).addClass(a.bulletActiveClass+"-main");if(e.params.loop)if(u>=d.length-a.dynamicMainBullets){for(var f=a.dynamicMainBullets;f>=0;f-=1)d.eq(d.length-f).addClass(a.bulletActiveClass+"-main");d.eq(d.length-a.dynamicMainBullets-1).addClass(a.bulletActiveClass+"-prev")}else b.prev().addClass(a.bulletActiveClass+"-prev").prev().addClass(a.bulletActiveClass+"-prev-prev"),g.next().addClass(a.bulletActiveClass+"-next").next().addClass(a.bulletActiveClass+"-next-next");else b.prev().addClass(a.bulletActiveClass+"-prev").prev().addClass(a.bulletActiveClass+"-prev-prev"),g.next().addClass(a.bulletActiveClass+"-next").next().addClass(a.bulletActiveClass+"-next-next")}}if(a.dynamicBullets){var h=Math.min(d.length,a.dynamicMainBullets+4),v=(e.pagination.bulletSize*h-e.pagination.bulletSize)/2-s*e.pagination.bulletSize,O=t?"right":"left";d.css(e.isHorizontal()?O:"top",v+"px")}}if("fraction"===a.type&&(n.find(Object(J["b"])(a.currentClass)).text(a.formatFractionCurrent(r+1)),n.find(Object(J["b"])(a.totalClass)).text(a.formatFractionTotal(o))),"progressbar"===a.type){var j;j=a.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical";var y=(r+1)/o,C=1,_=1;"horizontal"===j?C=y:_=y,n.find(Object(J["b"])(a.progressbarFillClass)).transform("translate3d(0,0,0) scaleX("+C+") scaleY("+_+")").transition(e.params.speed)}"custom"===a.type&&a.renderCustom?(n.html(a.renderCustom(e,r+1,o)),e.emit("paginationRender",n[0])):e.emit("paginationUpdate",n[0]),e.params.watchOverflow&&e.enabled&&n[e.isLocked?"addClass":"removeClass"](a.lockClass)}},render:function(){var e=this,t=e.params.pagination;if(t.el&&e.pagination.el&&e.pagination.$el&&0!==e.pagination.$el.length){var a=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,r=e.pagination.$el,c="";if("bullets"===t.type){var n=e.params.loop?Math.ceil((a-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&!e.params.loop&&n>a&&(n=a);for(var o=0;o<n;o+=1)t.renderBullet?c+=t.renderBullet.call(e,o,t.bulletClass):c+="<"+t.bulletElement+' class="'+t.bulletClass+'"></'+t.bulletElement+">";r.html(c),e.pagination.bullets=r.find(Object(J["b"])(t.bulletClass))}"fraction"===t.type&&(c=t.renderFraction?t.renderFraction.call(e,t.currentClass,t.totalClass):'<span class="'+t.currentClass+'"></span> / <span class="'+t.totalClass+'"></span>',r.html(c)),"progressbar"===t.type&&(c=t.renderProgressbar?t.renderProgressbar.call(e,t.progressbarFillClass):'<span class="'+t.progressbarFillClass+'"></span>',r.html(c)),"custom"!==t.type&&e.emit("paginationRender",e.pagination.$el[0])}},init:function(){var e=this;e.params.pagination=Object(J["c"])(e.$el,e.params.pagination,e.params.createElements,{el:"swiper-pagination"});var t=e.params.pagination;if(t.el){var a=Object(R["a"])(t.el);0!==a.length&&(e.params.uniqueNavElements&&"string"===typeof t.el&&a.length>1&&(a=e.$el.find(t.el)),"bullets"===t.type&&t.clickable&&a.addClass(t.clickableClass),a.addClass(t.modifierClass+t.type),"bullets"===t.type&&t.dynamicBullets&&(a.addClass(""+t.modifierClass+t.type+"-dynamic"),e.pagination.dynamicBulletIndex=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&a.addClass(t.progressbarOppositeClass),t.clickable&&a.on("click",Object(J["b"])(t.bulletClass),(function(t){t.preventDefault();var a=Object(R["a"])(this).index()*e.params.slidesPerGroup;e.params.loop&&(a+=e.loopedSlides),e.slideTo(a)})),Object(J["e"])(e.pagination,{$el:a,el:a[0]}),e.enabled||a.addClass(t.lockClass))}},destroy:function(){var e=this,t=e.params.pagination;if(t.el&&e.pagination.el&&e.pagination.$el&&0!==e.pagination.$el.length){var a=e.pagination.$el;a.removeClass(t.hiddenClass),a.removeClass(t.modifierClass+t.type),e.pagination.bullets&&e.pagination.bullets.removeClass(t.bulletActiveClass),t.clickable&&a.off("click",Object(J["b"])(t.bulletClass))}}},Q={name:"pagination",params:{pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:function(e){return e},formatFractionTotal:function(e){return e},bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",modifierClass:"swiper-pagination-",currentClass:"swiper-pagination-current",totalClass:"swiper-pagination-total",hiddenClass:"swiper-pagination-hidden",progressbarFillClass:"swiper-pagination-progressbar-fill",progressbarOppositeClass:"swiper-pagination-progressbar-opposite",clickableClass:"swiper-pagination-clickable",lockClass:"swiper-pagination-lock"}},create:function(){var e=this;Object(J["a"])(e,{pagination:W({dynamicBulletIndex:0},Z)})},on:{init:function(e){e.pagination.init(),e.pagination.render(),e.pagination.update()},activeIndexChange:function(e){(e.params.loop||"undefined"===typeof e.snapIndex)&&e.pagination.update()},snapIndexChange:function(e){e.params.loop||e.pagination.update()},slidesLengthChange:function(e){e.params.loop&&(e.pagination.render(),e.pagination.update())},snapGridLengthChange:function(e){e.params.loop||(e.pagination.render(),e.pagination.update())},destroy:function(e){e.pagination.destroy()},"enable disable":function(e){var t=e.pagination.$el;t&&t[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)},click:function(e,t){var a=t.target;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&e.pagination.$el.length>0&&!Object(R["a"])(a).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&a===e.navigation.nextEl||e.navigation.prevEl&&a===e.navigation.prevEl))return;var r=e.pagination.$el.hasClass(e.params.pagination.hiddenClass);!0===r?e.emit("paginationShow"):e.emit("paginationHide"),e.pagination.$el.toggleClass(e.params.pagination.hiddenClass)}}}},X=a("cc84");q["a"].use([G["a"],Q,X["a"]]);var Y={data:function(){return{product_list:[],product:{on_sale:!1},recentList:[],count:1,cartUpdteTrigger:!1,bubbleText:"",pageUrl:"",standard:"",standardAlert:!1,thumbsSwiper:null,mayLikeList:[]}},methods:{getProductDetail:function(){var e=this,t=e.$route.params.id;e.$store.commit("startLoading",!0),e.$http.get("".concat("https://vue3-course-api.hexschool.io","/api/").concat("seanlibra","/product/").concat(t)).then((function(t){t.data.success?(e.product=t.data.product,e.$store.commit("startLoading",!1),e.setRecent(),e.getProducts(e)):(e.$store.commit("startLoading",!1),e.bubbleText=t.data.message,e.$refs.bubble.bubbleACtive(),setTimeout((function(){e.$router.push("/shop/all")}),3e3))})).catch((function(){e.bubbleText="連線錯誤",e.$refs.bubble.bubbleACtive(),e.$store.commit("startLoading",!1)}))},addToCart:function(){var e=this;if(e.standard){var t={data:{product_id:e.product.id,qty:e.count,standard:e.standard}};e.$store.commit("startLoading",!0),e.$http.post("".concat("https://vue3-course-api.hexschool.io","/api/").concat("seanlibra","/cart"),t).then((function(t){t.data.success?(e.standardAlert=!1,e.bubbleText=t.data.message,e.$refs.bubble.bubbleACtive(),e.cartUpdteTrigger=!e.cartUpdteTrigger,e.$store.commit("startLoading",!1)):(e.bubbleText=t.data.message,e.$refs.bubble.bubbleACtive(),e.$store.commit("startLoading",!1))})).catch((function(){e.bubbleText="連線錯誤",e.$refs.bubble.bubbleACtive(),e.$store.commit("startLoading",!1)}))}else e.standardAlert=!0},getProducts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this;e.$store.commit("startLoading",!0),e.$http.get("".concat("https://vue3-course-api.hexschool.io","/api/").concat("seanlibra","/products/all")).then((function(t){t.data.success?(e.product_list=t.data.products.slice().reverse(),e.mayLikeList_fuc(),e.$store.commit("startLoading",!1)):(e.bubbleText=t.data.message,e.$refs.bubble.bubbleACtive(),e.$store.commit("startLoading",!1))})).catch((function(){e.bubbleText="連線錯誤",e.$refs.bubble.bubbleACtive(),e.$store.commit("startLoading",!1)}))},setRecent:function(){var e=Object(D["a"])(this.recentList),t=this,a=!1;e.forEach((function(e){t.product.id===e.id&&(a=!0)})),a||(e.push({id:this.product.id,title:this.product.title,img:this.product.imageUrl,price:this.product.price,origin_price:this.product.origin_price}),localStorage.setItem("be_product",JSON.stringify(e)))},getRecent:function(){var e=JSON.parse(localStorage.getItem("be_product"))||[];e.length>5&&e.splice(0,1),this.recentList=e},mayLikeList_fuc:function(){var e=Object(D["a"])(this.product_list),t=this.product.category,a=this.product.id,r=[],c=[],n=!1;if(0!==e.length){e.forEach((function(e){e.category===t&&r.push(e)})),r.forEach((function(e){if(e.id===a){var t=r.indexOf(e);r.splice(t,1)}}));for(var o=function(e){n=!1;var t=Math.floor(Math.random()*r.length);if(c.forEach((function(e){t===e.index&&(n=!0)})),!n){var a=r[t];c.push({index:t,product:a})}},i=0;c.length<6;i++)o(i)}this.mayLikeList=c},setThumbsSwiper:function(e){this.thumbsSwiper=e}},computed:{loading:function(){return this.$store.state.isLoading}},components:{Header:U["a"],Footer:E["a"],Sidebar:P["a"],Loading:F["a"],Swiper:z["a"],SwiperSlide:H["a"]},watch:{$route:function(e,t){"product"===e.name&&(this.getProductDetail(),this.getProducts())}},created:function(){this.getProductDetail(),this.pageUrl=document.location.href,this.getRecent()}};a("15e8"),a("af7b");Y.render=M,Y.__scopeId="data-v-18b62d86";t["default"]=Y},"8d2b":function(e,t,a){"use strict";a("fb6a");var r=a("7a23"),c=Object(r["withScopeId"])("data-v-e1214816");Object(r["pushScopeId"])("data-v-e1214816");var n={class:"sidebar"},o={class:"sidebar_group"},i=Object(r["createVNode"])("h2",null,"商品分類",-1),l={class:"product_category_list"},s=Object(r["createVNode"])("span",{class:"circle"},null,-1),d=Object(r["createVNode"])("span",{class:"name"},"全部商品",-1),p={class:"count"},u=Object(r["createVNode"])("span",{class:"circle"},null,-1),b={class:"name"},g={class:"count"},m={class:"sidebar_group"},f=Object(r["createVNode"])("h2",null,"最近瀏覽的商品",-1),h={class:"recent_product_list"},v={class:"single_recent_info"};Object(r["popScopeId"])();var O=c((function(e,t,a,O,j,y){var C=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createBlock"])("div",n,[Object(r["createVNode"])("div",o,[i,Object(r["createVNode"])("ul",l,[Object(r["createVNode"])("li",null,[Object(r["createVNode"])(C,{onClick:t[1]||(t[1]=function(e){return y.change_category("all")}),to:"/shop/all",class:{active:"all"===j.now_category}},{default:c((function(){return[s,d,Object(r["createVNode"])("span",p,Object(r["toDisplayString"])(j.product_list.length),1)]})),_:1},8,["class"])]),(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(y.category_list,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])("li",{key:t},[Object(r["createVNode"])(C,{onClick:function(t){return y.change_category(e.category)},to:"/shop/".concat(e.category),class:{active:j.now_category===e.category}},{default:c((function(){return[u,Object(r["createVNode"])("span",b,Object(r["toDisplayString"])(e.category),1),Object(r["createVNode"])("span",g,Object(r["toDisplayString"])(e.count),1)]})),_:2},1032,["onClick","to","class"])])})),128))])]),Object(r["createVNode"])("div",m,[f,Object(r["createVNode"])("ul",h,[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(j.recent_list.slice().reverse(),(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])("li",{key:e.id},[Object(r["createVNode"])(C,{class:"thumbnail",to:"/product/".concat(e.id),style:"background-image:url(".concat(e.img,")")},null,8,["to","style"]),Object(r["createVNode"])("div",v,[Object(r["createVNode"])(C,{class:"title",to:"/product/".concat(e.id)},{default:c((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.title),1)]})),_:2},1032,["to"]),Object(r["createVNode"])(C,{class:[{normal:e.price==e.origin_price},"origin_price"],to:"/product/".concat(e.id)},{default:c((function(){return[Object(r["createTextVNode"])("$ "+Object(r["toDisplayString"])(e.origin_price),1)]})),_:2},1032,["class","to"]),e.price!==e.origin_price?(Object(r["openBlock"])(),Object(r["createBlock"])(C,{key:0,class:"price",to:"/product/".concat(e.id)},{default:c((function(){return[Object(r["createTextVNode"])("$ "+Object(r["toDisplayString"])(e.price),1)]})),_:2},1032,["to"])):Object(r["createCommentVNode"])("",!0)])])})),128))])])])})),j=a("2909"),y=(a("99af"),a("a434"),a("159b"),a("4de4"),{props:{productsCategory:Array},emits:["emit-category"],data:function(){return{path:"seanlibra",url:"https://vue3-course-api.hexschool.io",product_list:[],recent_list:[],now_category:""}},methods:{getProducts_category:function(){var e=this;e.$store.commit("startLoading",!0),e.$http.get("".concat(e.url,"/api/").concat(e.path,"/products/all")).then((function(t){t.data.success?(e.product_list=t.data.products,e.$store.commit("startLoading",!1)):e.$store.commit("startLoading",!1)})).catch((function(){e.$store.commit("startLoading",!1)}))},change_category:function(e){this.$emit("emit-category",e),this.now_category=e},getRecent:function(){var e=JSON.parse(localStorage.getItem("be_product"))||[];e.length>5&&e.splice(0,1),this.recent_list=e}},computed:{current_category_product_list:function(){var e=Object(j["a"])(this.product_list),t=[],a=this.$route.params.category||"all";return"all"!==a?e.forEach((function(e){e.category===a&&t.push(e)})):t=e,t},category_list:function(){var e=Object(j["a"])(this.product_list),t=[],a=[],r=[];e.forEach((function(e){t.push(e.category)})),a=t.filter((function(e,a){return t.indexOf(e)===a}));for(var c=0;c<a.length;c++)r.push({category:a[c],count:0});return e.filter((function(e){for(var t=0;t<r.length;t++)e.category===r[t].category&&r[t].count++})),r}},created:function(){this.getProducts_category(),this.getRecent(),this.now_category=this.$route.params.category}});a("47af");y.render=O,y.__scopeId="data-v-e1214816";t["a"]=y},a640:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&r((function(){a.call(null,t||function(){throw 1},1)}))}},af7b:function(e,t,a){"use strict";a("3359")}}]);
//# sourceMappingURL=chunk-0f0f4198.19d334fe.js.map