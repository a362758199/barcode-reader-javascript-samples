(this.webpackJsonphelloworld=this.webpackJsonphelloworld||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},25:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var r=n(6),s=n.n(r),a=n(17),c=n.n(a),o=(n(22),n(23),n(0)),i=n.n(o),l=n(11),u=n(3),d=n(4),p=n(9),h=n(8),f=(n(25),n.p+"static/media/logo.6ce24c58.svg"),b=n(13);b.a.organizationID="200000",b.a.handshakeCode="200000-dbr_js_samples",b.a.BarcodeReader.engineResourcePath="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";var j=b.a,m=n(1),x=n(2),v=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).bDestroyed=!1,r.pScanner=null,r.elRef=s.a.createRef(),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t,n=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.pScanner=this.pScanner||j.BarcodeScanner.createInstance(),e.next=4,this.pScanner;case 4:if(t=e.sent,!this.bDestroyed){e.next=8;break}return t.destroy(),e.abrupt("return");case 8:return this.elRef.current.appendChild(t.getUIElement()),document.getElementsByClassName("dce-btn-close")[0].style.display="none",t.onFrameRead=function(e){var t,r=Object(m.a)(e);try{for(r.s();!(t=r.n()).done;){var s=t.value;n.props.appendMessage({format:s.barcodeFormatString,text:s.barcodeText,type:"result"}),-1!==s.barcodeText.indexOf("Attention(exceptionCode")&&n.props.appendMessage({msg:s.exception.message,type:"error"})}}catch(a){r.e(a)}finally{r.f()}},e.next=13,t.open();case 13:e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),this.props.appendMessage({msg:e.t0.message,type:"error"}),console.error(e.t0);case 19:case"end":return e.stop()}}),e,this,[[0,15]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.bDestroyed=!0,!this.pScanner){e.next=5;break}return e.next=4,this.pScanner;case 4:e.sent.destroy();case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return Object(x.jsx)("div",{ref:this.elRef,style:{width:"100%",height:"100%"}})}}]),n}(s.a.Component),g=v,y=function(e){Object(p.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).scrollToBottom=function(){r.refDivMessage.current.scrollTop=r.refDivMessage.current.scrollHeight},r.appendMessage=function(e){switch(e.type){case"result":r.setState((function(t){return t.resultValue=e.format+": "+e.text,t.resultItems=t.resultItems.concat([{type:e.format+": ",text:e.text}]),t}));break;case"error":r.setState((function(t){return t.resultValue=e.msg,t.resultItems=t.resultItems.concat([{type:"Error: ",text:e.msg}]),t}))}},r.showScanner=function(){r.setState({bShowScanner:!0})},r.refDivMessage=s.a.createRef(),r.state={libLoaded:!1,resultValue:"",resultItems:[],bShowScanner:!1},r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.BarcodeScanner.loadWasm();case 3:this.setState((function(e){return e.libLoaded=!0,e}),(function(){t.showScanner()})),e.next=10;break;case 6:throw e.prev=6,e.t0=e.catch(0),alert(e.t0.message),e.t0;case 10:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"render",value:function(){return Object(x.jsxs)("div",{className:"helloWorld",children:[Object(x.jsxs)("h1",{children:["Hello World for React",Object(x.jsx)("img",{src:f,className:"App-logo",alt:"logo"})]}),Object(x.jsx)("input",{type:"text",value:this.state.resultValue,readOnly:!0,className:"latest-result",placeholder:"The Last Read Barcode"}),Object(x.jsxs)("div",{id:"UIElement",children:[this.state.libLoaded?"":Object(x.jsx)("span",{style:{fontSize:"x-large"},children:"Loading Library..."}),this.state.bShowScanner?Object(x.jsx)(g,{appendMessage:this.appendMessage}):""]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("span",{style:{float:"left"},children:"All Results:"}),Object(x.jsx)("br",{}),Object(x.jsx)("div",{id:"results",ref:this.refDivMessage,children:Object(x.jsx)("ul",{children:this.state.resultItems.map((function(e,t){return Object(x.jsxs)("li",{children:[Object(x.jsx)("span",{children:e.type}),Object(x.jsx)("span",{className:"resultText",children:e.text}),"                                "]},1e5+t)}))})})]})]})}}]),n}(s.a.Component),O=y;var S=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(O,{})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,29)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};c.a.render(Object(x.jsx)(s.a.StrictMode,{children:Object(x.jsx)(S,{})}),document.getElementById("root")),k()}},[[28,1,2]]]);
//# sourceMappingURL=main.aec71499.chunk.js.map