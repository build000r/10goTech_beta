_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[41],{"3KEO":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/[site]/admin/[service]",function(){return r("NFyK")}])},"4ZY9":function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r("vDqi"),c=r.n(n),i=function(e){e.req;return c.a.create({baseURL:"/"})}},HPDO:function(e,t,r){"use strict";var n=r("nKUr"),c=r("q1tI"),i=r("3mGJ"),o=r("+6Dn"),a=r("aQu0"),s=r("QetY"),l=r("Mt1y"),u=r("yE/o"),d=r("20a2"),b=r.n(d);t.a=function(e){var t=e.children,r=e.fullPageLeaderboard,d=e.smallLeaderboard,j=e.leaderboardData,p=e.heightOverride;return Object(n.jsxs)(c.Fragment,{children:[function(e){var t=e.header,c=e.subHeader,u=e.btnText,j=e.btnPath,p=e.dividerText;return Object(n.jsxs)(i.a,{basic:!0,style:r?{minHeight:"calc(100vh - 2rem)"}:{minHeight:"33vh"},children:[Object(n.jsx)(o.a,{columns:1,centered:!0,style:r?{minHeight:"calc(100vh - 2rem)"}:{minHeight:"33vh"},children:Object(n.jsx)(o.a.Row,{verticalAlign:"middle",children:Object(n.jsx)(o.a.Column,{children:Object(n.jsxs)(a.a,{as:"h2",textAlign:"center",children:[t,Object(n.jsx)(a.a.Subheader,{children:c}),j&&u&&Object(n.jsx)(s.a,{color:"linkedin",style:{marginTop:"1rem"},onClick:function(){return b.a.push(j)},children:u})]})})})}),d?Object(n.jsx)(l.a,{horizontal:!0,children:p}):""]})}(j),Object(n.jsx)(u.a,{style:d?{minHeight:p||"67vh"}:{minHeight:p||null},children:t})]})}},NFyK:function(e,t,r){"use strict";r.r(t);var n=r("o0o1"),c=r.n(n),i=r("HaE+"),o=r("nKUr"),a=r("4ZY9"),s=r("aMs1"),l=r("20a2"),u=r("HPDO"),d=function(e){var t=e.product;return Object(o.jsx)(u.a,{smallLeaderboard:!0,leaderboardData:{header:"Create a New Service Offering",subHeader:""},children:Object(o.jsx)(s.a,{site:Object(l.useRouter)().query.site,product:t})})};d.getInitialProps=function(){var e=Object(i.a)(c.a.mark((function e(t){var r,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(a.a)(t).get("/api/product/".concat(t.query.site,"/").concat(t.query.service));case 2:return r=e.sent,n=r.data,e.abrupt("return",{product:n});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.default=d},aMs1:function(e,t,r){"use strict";var n=r("nKUr"),c=r("o0o1"),i=r.n(c),o=r("HaE+"),a=r("rePB"),s=r("q1tI"),l=r("z8k1"),u=r("vFsZ"),d=r("umxb"),b=r("yZlV"),j=r("QetY"),p=r("3mGJ"),O=r("qYya"),f=r("20a2"),h=r.n(f),m=r("O2/f");function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}t.a=function(e){var t=e.product,r=e.site,c=Object(s.useState)({updateExisting:!0,productId:"",title:"",brief:"",description:"",homepagePosition:"",clickOptions:[{name:""}],error:"",loading:!1,createdProduct:"",redirectToProfile:!1,emailSubject:"",emailBody:"",slug:"",customerNote:""}),f=c[0],x=c[1],v=Object(O.a)({url:t?"/api/product/".concat(r,"/").concat(f.slug):"/api/product/".concat(r),method:t?"put":"post",body:{title:f.title,description:f.description,brief:f.brief,clickOptions:f.clickOptions.length>0?f.clickOptions:[{name:""}],customerNote:f.customerNote},onSuccess:function(){return h.a.push("/user/".concat(r,"/services"))}}),y=v.doRequest;v.errors;Object(s.useEffect)((function(){if(t){var e=t.title,r=t.brief,n=t.description,c=t.slug,i=t.clickOptions,o=t.customerNote;x(g(g({},f),{},{updateExisting:!0,title:e,slug:c,brief:r,description:n,clickOptions:i,customerNote:o}))}}),[]);var k=function(e){return function(t){x(g(g({},f),{},Object(a.a)({},e,t.target.value)))}},w=function(e){return function(t){var r=f.clickOptions.map((function(r,n){return e!==n?r:g(g({},r),{},{name:t.target.value})}));x(g(g({},f),{},{clickOptions:r}))}},N=function(){x(g(g({},f),{},{clickOptions:f.clickOptions.concat([{name:""}])}))},P=function(e){return function(){x(g(g({},f),{},{clickOptions:f.clickOptions.filter((function(t,r){return e!==r}))}))}},C=function(){var e=Object(o.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),x(g(g({},f),{},{loading:!0})),e.next=4,y();case 4:r=e.sent,x(g(g({},f),{},{loading:!1})),console.log(r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.jsx)(p.a,{children:function(){var e=f.title,c=f.brief,i=f.description,o=f.clickOptions,a=f.loading,s=(f.emailBody,f.emailSubject,f.customerNote);return Object(n.jsxs)(l.a,{fluid:!0,children:[t?Object(n.jsx)(m.a,{siteTitle:r,productTitle:f.title}):null,Object(n.jsx)(l.a.Content,{children:Object(n.jsxs)(u.a,{loading:a,children:[Object(n.jsxs)(u.a.Field,{children:[Object(n.jsx)("label",{children:"Title"}),Object(n.jsx)(d.a,{placeholder:"title",onChange:k("title"),className:"form-control",value:e})]}),Object(n.jsxs)(u.a.Field,{children:[Object(n.jsx)("label",{children:"Brief Description"}),Object(n.jsx)(d.a,{placeholder:"brief",onChange:k("brief"),className:"form-control",value:c})]}),Object(n.jsxs)(u.a.Field,{children:[Object(n.jsx)("label",{children:"Longer Description"}),Object(n.jsx)(b.a,{placeholder:"description",onChange:k("description"),className:"form-control",value:i})]}),Object(n.jsxs)(u.a.Field,{children:[Object(n.jsx)("label",{children:"Custom Note Instructions"}),Object(n.jsx)(b.a,{placeholder:"Describe additional information you'd like to receive from the customer ordering this service.",onChange:k("customerNote"),className:"form-control",value:s})]}),o.map((function(e,t){return Object(n.jsxs)(u.a.Field,{children:[Object(n.jsx)("label",{children:"Checkbox Option"}),Object(n.jsx)(b.a,{fluid:!0,className:"form-control",type:"text",placeholder:"Type checkbox option ".concat(t+1),value:e.name,onChange:w(t)}),Object(n.jsx)(j.a,{size:"mini",color:"red",floated:"right",type:"button",onClick:P(t),children:Object(n.jsx)("p",{children:"-"})})]})})),Object(n.jsx)(j.a,{size:"mini",color:"green",onClick:N,className:"small",children:"Add Clickable Option"})]})}),Object(n.jsx)(j.a,{type:"submit",fluid:!0,onClick:C,children:t?"Update":"Create"})]})}()})}}},[["3KEO",1,2,0,3,4,5,6,7,8,9,10]]]);