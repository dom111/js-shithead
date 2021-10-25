(()=>{var z=(t,e,r)=>new Promise((i,o)=>{var n=a=>{try{c(r.next(a))}catch(d){o(d)}},p=a=>{try{c(r.throw(a))}catch(d){o(d)}},c=a=>a.done?i(a.value):Promise.resolve(a.value).then(n,p);c((r=r.apply(t,e)).next())});var te=class{#e=null;constructor(e){e&&(this.#e=e)}validate(...e){return this.#e===null?!0:this.#e(...e)}},l=te;var ie=class extends l{#e=[];constructor(...e){super();e.forEach(r=>{this.#e.push(r)})}criteria(){return this.#e}validate(...e){return this.#e.every(r=>r.validate(...e))}},oe=ie;var ne=class extends oe{},A=ne;var ae=class{#e;constructor(e){this.#e=e}apply(...e){return this.#e(...e)}},s=ae;var se=class{#e;constructor(e=2e3){this.#e=e}value(){return this.#e}},H=se;var X=class extends H{constructor(){super(1e3)}},K=X;var Y=class extends H{constructor(){super(3e3)}},Z=Y;var O=class extends H{constructor(){super(2e3)}};var le=class{#e;#r;#t=new O;constructor(...e){let r=[];e.forEach(i=>{if(i instanceof s){if(this.#r)throw new TypeError("Rule: effect already specified, but another was provided.");this.#r=i;return}if(i instanceof l){r.push(i);return}this.#t=i}),r.length&&(this.#e=new A(...r))}priority(){return this.#t}process(...e){if(this.#r instanceof s)return this.#r.apply(...e)}validate(...e){return this.#e instanceof l?this.#e.validate(...e):!0}},h=le;var B=class{#e=[];#r=[];constructor(...e){this.#e.push(...e)}accepts(e){return this.#e.some(r=>e instanceof r)}entries(){return this.#r.slice()}every(e){return this.entries().every(e)}filter(e){return this.entries().filter(e)}forEach(e){return this.entries().forEach(e)}getBy(e,r){return this.filter(i=>{let o=i[e];return o instanceof Function?o.bind(i)()===r:i[e]===r})}includes(e){return this.#r.includes(e)}indexOf(e){return this.#r.indexOf(e)}get length(){return this.entries().length}map(e){return this.entries().map(e)}register(...e){e.forEach(r=>{if(!this.accepts(r))throw new TypeError(`Registry#register: Invalid entity attempted to be registered: '${r}'.`);this.#r.includes(r)||this.#r.push(r)})}some(e){return this.entries().some(e)}unregister(...e){e.forEach(r=>{let i=this.#r.indexOf(r);i>-1&&this.#r.splice(i,1)})}};var ce=class extends B{#e=new Map;#r=e=>{this.#e.delete(e.constructor)};constructor(){super(h)}entries(){return super.entries().sort((e,r)=>e.priority().value()-r.priority().value())}get(e){return this.#e.has(e)||this.#e.set(e,this.filter(r=>r instanceof e)),this.#e.get(e)||[]}process(e,...r){return this.get(e).map(i=>i.validate(...r)?[!0,i.process(...r)]:[!1]).filter(([i,o])=>i).map(([,i])=>i)}register(...e){super.register(...e),e.forEach(r=>this.#r(r))}unregister(...e){super.unregister(...e),e.forEach(r=>this.#r(r))}},m=new ce;var W=class extends h{},de=t=>m.process(W,t).shift(),f=W;var F=class{constructor({id:e,name:r=null,value:i,group:o=null,title:n=null}){this.id=e,this.name=r,this.value=i,this.group=o,this.title=n}getId(){return this.id}getName(){return this.name}getValue(){return this.value}getGroup(){return this.group}getTitle(){return this.title}toString(){return this.title!==null?this.title:this.group!==null?`${this.title||this.name||this.value} of ${this.group.getTitle()||this.group.getName()}`:this.title||this.name||this.id}},S=F;var ue=class{constructor({name:e,title:r=null}){this.name=e,this.title=r}getName(){return this.name}getTitle(){return this.title}},N=ue;var pe=class extends B{constructor(){super(S)}getById(e){let[r]=this.getBy("id",e);return r!=null?r:null}},L=new pe;var C=new N({name:"clubs",title:"Clubs"}),v=new N({name:"hearts",title:"Hearts"}),w=new N({name:"diamonds",title:"Diamonds"}),k=new N({name:"spades",title:"Spades"}),x=new F({id:"",title:"The Table",value:0});[{id:"AC",name:"Ace",value:1,group:C},{id:"2C",name:"Two",value:2,group:C},{id:"3C",name:"Three",value:3,group:C},{id:"4C",name:"Four",value:4,group:C},{id:"5C",name:"Five",value:5,group:C},{id:"6C",name:"Six",value:6,group:C},{id:"7C",name:"Seven",value:7,group:C},{id:"8C",name:"Eight",value:8,group:C},{id:"9C",name:"Nine",value:9,group:C},{id:"TC",name:"Ten",value:10,group:C},{id:"JC",name:"Jack",value:11,group:C},{id:"QC",name:"Queen",value:12,group:C},{id:"KC",name:"King",value:13,group:C},{id:"AH",name:"Ace",value:1,group:v},{id:"2H",name:"Two",value:2,group:v},{id:"3H",name:"Three",value:3,group:v},{id:"4H",name:"Four",value:4,group:v},{id:"5H",name:"Five",value:5,group:v},{id:"6H",name:"Six",value:6,group:v},{id:"7H",name:"Seven",value:7,group:v},{id:"8H",name:"Eight",value:8,group:v},{id:"9H",name:"Nine",value:9,group:v},{id:"TH",name:"Ten",value:10,group:v},{id:"JH",name:"Jack",value:11,group:v},{id:"QH",name:"Queen",value:12,group:v},{id:"KH",name:"King",value:13,group:v},{id:"AD",name:"Ace",value:1,group:w},{id:"2D",name:"Two",value:2,group:w},{id:"3D",name:"Three",value:3,group:w},{id:"4D",name:"Four",value:4,group:w},{id:"5D",name:"Five",value:5,group:w},{id:"6D",name:"Six",value:6,group:w},{id:"7D",name:"Seven",value:7,group:w},{id:"8D",name:"Eight",value:8,group:w},{id:"9D",name:"Nine",value:9,group:w},{id:"TD",name:"Ten",value:10,group:w},{id:"JD",name:"Jack",value:11,group:w},{id:"QD",name:"Queen",value:12,group:w},{id:"KD",name:"King",value:13,group:w},{id:"AS",name:"Ace",value:1,group:k},{id:"2S",name:"Two",value:2,group:k},{id:"3S",name:"Three",value:3,group:k},{id:"4S",name:"Four",value:4,group:k},{id:"5S",name:"Five",value:5,group:k},{id:"6S",name:"Six",value:6,group:k},{id:"7S",name:"Seven",value:7,group:k},{id:"8S",name:"Eight",value:8,group:k},{id:"9S",name:"Nine",value:9,group:k},{id:"TS",name:"Ten",value:10,group:k},{id:"JS",name:"Jack",value:11,group:k},{id:"QS",name:"Queen",value:12,group:k},{id:"KS",name:"King",value:13,group:k},{id:"*1",name:"Joker",title:"Joker",value:0},{id:"*2",name:"Joker",title:"Joker",value:0}].forEach(t=>L.register(new F(t)));var me=(...t)=>t.reduce((e,r)=>r instanceof S?(e.push(r),e):r instanceof R?(e.push(...r.peek()),e):(e.push(...r),e),[]),R=class{constructor(...e){this.cards=[];this.cards.push(...me(...e))}after(e){var r;return(r=this.cards[this.cards.indexOf(e)+1])!=null?r:x}before(e){var r;return(r=this.cards[this.cards.indexOf(e)-1])!=null?r:x}bottom(){return this.cards[0]}canAdd(e){return(e instanceof S||e instanceof Array)&&(e=new R(e)),this.includes(e).length===0}deal(e,r){let i=e*r,o=[];if(this.cards.length<i)throw new RangeError("Not enough cards in deck.");for(let n=0;n<i;n++)o[n%r]||(o[n%r]=new R),o[n%r].push(this.pop());return o.map(n=>new R(n))}empty(){return new R(this.cards.splice(0))}has(e){return this.cards.some(r=>r.getId()===e.getId())}includes(e){return(e instanceof S||e instanceof Array)&&(e=new R(e)),new R(e.cards.filter(r=>this.has(r)))}get length(){return this.cards.length}peek(e=null){return e===null?this.cards:this.cards.slice(-e)}pop(e=1){if(this.cards.length<e)throw new RangeError("Not enough cards in deck.");return new R(this.cards.splice(-e))}push(e){if(e=me(e),!this.canAdd(e))throw new RangeError("Operation would result in duplicate cards in deck, which is disallowed by the current options.");return this.cards.push(...e),this}remove(e){if(!this.has(e))throw new RangeError(`Card ${e.getId()} is not in the Deck.`);return this.cards.splice(this.cards.indexOf(e),1),e}shift(e=1){return new R(this.cards.splice(0,e))}shuffle(){for(var e=[];this.cards.length;)e.push(...this.cards.splice(Math.floor(this.cards.length*Math.random()),1));return this.cards.push(...e),this}sort(e){return this.cards.sort(e),this}top(){return this.cards[this.length-1]}toString(){return this.cards.map(e=>e.toString()).join(",")}unshift(e){if((e instanceof S||e instanceof Array)&&(e=new R(e)),!this.canAdd(e))throw new RangeError("Operation would result in duplicate cards in deck, which is disallowed by the current options.");return this.cards.unshift(...e.empty().peek()),this}valueOf(){return this.cards}},y=R;var he=class{constructor({id:e,name:r=null}){this.ready=!1;this.id=e,this.name=r!=null?r:`Player ${e}`,this.faceDown=new y,this.faceUp=new y,this.hand=new y}getId(){return this.id}getName(){return this.name}play(e){throw new Error("'play' must be implemented.")}swapDeck(){throw new Error("'swapDeck' must be implemented.")}toString(){return this.name+" - Face down cards: ["+this.faceDown+"], Face up cards: ["+this.faceUp+"], Hand: ["+this.hand+"]"}},J=he;var fe=class extends h{},P=fe;var V=class extends h{},M=(t,e)=>m.process(V,t,e).some(r=>r),ge=V;var D=class extends h{},E=(t,e)=>m.process(D,t,e).shift(),U=D;var ye=class extends J{swapDeck(){return new Promise(e=>{let r=new y(this.faceUp.empty(),this.hand.empty());r.sort((i,o)=>{let[n,p]=[i,o].map(c=>m.process(W,i).shift());return n-p}),this.faceUp.push(r.pop(3)),this.hand=r.empty(),e()})}play(e){let r=e.discard;return new Promise(i=>{let o=new y;if(this.hand.length===0&&this.faceUp.length){let[c]=this.faceUp.peek().map(a=>[a,de(a)]).filter(([a])=>M(a,r)).sort(([,a],[,d])=>a-d).map(([a])=>a).concat(this.faceUp.peek());this.hand.push(this.faceUp.remove(c))}else this.hand.length===0&&this.faceDown.length&&this.hand.push(this.faceDown.pop());let[n,...p]=this.hand.sort((c,a)=>{let[d,u]=[c,a].map(b=>E(b,r));return d-u}).peek().filter(c=>M(c,r));n?o.push(this.hand.remove(n)):o.push(this.hand.pop()),p.forEach(c=>{if(E(c,r)>12)return;m.process(P,new y(...o.peek(),c),this,e).every(u=>u)&&o.push(this.hand.remove(c))}),i(o)})}},Ce=ye;var ve=class extends Error{constructor(e,r){super(`Invalid move: ${e} - ${r.toString()} cannot be played.`)}},$=ve;var we=class extends J{swapDeck(){return new Promise(e=>{let r=new y(this.faceUp.empty(),this.hand.empty());r.sort((i,o)=>{let[n,p]=[i,o].map(c=>m.process(f,c).shift());return n-p}),this.faceUp.push(r.pop(3)),this.hand=r.empty(),e()})}play(e){return new Promise((r,i)=>{let o=a=>{if(a instanceof MouseEvent&&a.button===2||a instanceof TouchEvent&&a.touches.length>1){a instanceof MouseEvent&&(a.preventDefault(),a.stopPropagation()),c();return}let d=a.target;!(d instanceof Element)||!d.matches(".player .card")||this.hand.length&&!d.matches(".player .hand .card")||d.classList.toggle("chosen")},n=a=>{a.stopPropagation(),a.preventDefault()},p=()=>{["touchstart","mousedown"].forEach(a=>document.removeEventListener(a,o)),document.body.removeEventListener("contextmenu",n)},c=()=>{let a=new y,d=Array.from(document.querySelectorAll(this.hand.length?`[data-player-id="${this.id}"] .hand .card.chosen`:this.faceUp.length?`[data-player-id="${this.id}"] .card.chosen:not(.face-down)`:`[data-player-id="${this.id}"] .card.chosen`)).map(u=>{var b;return L.getById((b=u.dataset.cardId)!=null?b:"")||x});if(a.push(d),p(),!(d.every(u=>this.hand.has(u))||d.every(u=>this.faceUp.has(u))||d.every(u=>this.faceDown.has(u)))||a.length===0||!m.process(P,a,this,e).every(u=>u)){i(new $(this,a));return}a.peek().forEach(u=>{if(this.hand.has(u)){this.hand.remove(u);return}if(this.faceUp.has(u)){this.faceUp.remove(u);return}this.faceDown.remove(u)}),r(a)};document.body.addEventListener("contextmenu",n),["touchstart","mousedown"].forEach(a=>{p(),document.addEventListener(a,o)})})}},q=we;var ke=class extends h{},g=ke;var Re=class extends h{},Q=Re;var xe=class{constructor(e){this.burnt=new y;this.discard=new y;this.players=[];this.turn=0;this.winner=null;this.deck=new y(...L.entries()),this.deck.shuffle(),this.players.push(...e.players)}advanceTurn(e=1){return this.turn+=e}play(){return new Promise((e,r)=>z(this,null,function*(){for(;!this.winner;){let i=this.players[this.turn%this.players.length];m.process(Q,i,this,this.turn);let o;try{if(o=yield i.play(this),!m.process(P,o,i,this).every(n=>n))throw new $(i,o)}catch(n){console.error(n);continue}m.process(g,o,i,this)}e(this.winner)}))}setWinner(e){this.winner=e}start(){this.players.forEach(e=>{let[r,i,o]=this.deck.deal(3,3);e.hand.push(r),e.faceDown.push(i),e.faceUp.push(o)}),this.players.forEach(e=>z(this,null,function*(){return yield e.swapDeck()}))}},De=xe;var Pe=new l(t=>["AC","AD","AH","AS"].includes(t.getId())),Ve=(t=14,e=30)=>[new U(Pe,new s(()=>t)),new f(Pe,new s(()=>e))],be=Ve;var Ge=(t=["TC","TD","TH","TS"],e=15,r=50)=>[new U(new l(i=>t.includes(i.getId())),new s(()=>e)),new g(new l(i=>i.peek().some(o=>t.includes(o.getId()))),new s((i,o,n)=>n.burnt.push(n.discard.empty()))),new f(new l(i=>t.includes(i.getId())),new s(()=>r))],Te=Ge;var Se=class extends h{},j=Se;var Ke=()=>[new V(new s((t,e)=>{let[r,i]=[e.top()||x,t].map(o=>E(o,e));return i>=r})),new D(new Z,new s(t=>t.getValue())),new g(new K,new l((t,e,r)=>t.peek().every(i=>M(i,r.discard))),new s((t,e,r)=>r.discard.push(t.peek()))),new g(new K,new l((t,e,r)=>t.top()!==r.discard.top()),new l((t,e,r)=>!t.peek().every(i=>M(i,r.discard))),new s((t,e,r)=>{let i=r.discard.empty();m.process(j,i,r),e.hand.push(i)})),new g(new K,new A(new l((t,e,r)=>e.hand.length<3),new l((t,e,r)=>r.deck.length>0)),new s((t,e,r)=>e.hand.push(r.deck.pop(Math.min(3-e.hand.length,r.deck.length))))),new g(new l((t,e,r)=>e.hand.length===0&&e.faceUp.length===0&&e.faceDown.length===0),new s((t,e,r)=>r.setWinner(e))),new g(new s((t,e,r)=>r.advanceTurn())),new f(new Z,new s(t=>t.getValue())),new P(new s(t=>t.peek().every(e=>e.getId()[0]===(t.top()||x).getId()[0])))],Ee=Ke;var Oe=()=>[new g(new A(new l((t,e,r)=>r.discard.peek(4).every(i=>i.getId()[0]===(r.discard.top()||x).getId()[0])),new l((t,e,r)=>r.discard.length>=4)),new s((t,e,r)=>r.burnt.push(r.discard.empty())))],Ie=Oe;var Je=(t=["*1","*2"],e=16,r=45)=>[new U(new l(i=>t.includes(i.getId())),new s(()=>e)),new j(new s((i,o)=>{i.peek().filter(n=>t.includes(n.getId())).forEach(n=>o.burnt.push(i.remove(n)))})),new f(new l(i=>t.includes(i.getId())),new s(()=>r))],Ae=Je;var _=t=>new D(new l(e=>t.includes(e.getId())),new s((e,r)=>E((r.has(e)?r.before(e):r.top())||x,r))),$e=(t=["4C","4D","4H","4S"],e=30)=>[_(t),new f(new l(r=>t.includes(r.getId())),new s(()=>e))],He=$e;var qe=(t=["8C","8D","8H","8S"],e=20)=>[_(t),new g(new l(r=>r.peek().some(i=>t.includes(i.getId()))),new s((r,i,o)=>o.advanceTurn(r.peek().filter(n=>t.includes(n.getId())).length))),new f(new l(r=>t.includes(r.getId())),new s(()=>e))],Le=qe;var Qe=(t=["2C","2D","2H","2S"],e=15)=>[new ge(new s(r=>t.includes(r.getId()))),new D(new l(r=>t.includes(r.getId())),new s(()=>0)),new f(new l(r=>t.includes(r.getId())),new s(()=>e))],Me=Qe;m.register(...Ee(),...Ie(),...Me(),...Le(),...be(),...Te(),...Ae(),...He());var I,Ue=document.querySelector(".burnt"),Be=document.querySelector(".discard"),je=document.querySelector(".deck"),We=document.querySelector(".players"),ze=()=>{I=new De({players:[new q({id:1,name:"Player"}),new Ce({id:2,name:"CPU"})]}),I.start(),I.play().then(t=>{if(t instanceof q){let e=document.createElement("div");e.classList.add("pyro"),e.setAttribute("data-player-name",t.getName());let r=document.createElement("div"),i=document.createElement("div");r.classList.add("before"),i.classList.add("after"),e.append(r,i),e.addEventListener("click",()=>e.remove()),document.body.append(e);return}alert("Computer won! \u{1F629}")})},Fe=document.querySelector(".new-game");if(Fe===null)throw new TypeError("Invalid HTML.");Fe.addEventListener("click",()=>ze());[Be,Ue].forEach(t=>{t.addEventListener("click",()=>{let e=document.createElement("div"),r=t.cloneNode(!0);e.classList.add("overlay"),r.classList.remove("pile"),r.classList.add("hand"),e.append(r),e.addEventListener("click",()=>e.remove()),document.body.append(e)})});m.register(new g(new s((t,e)=>Ne(e))),new Q(new s(t=>Ne(t))));var Ne=t=>{window.requestAnimationFrame(()=>{let e=o=>{for(;o.hasChildNodes();)o.firstChild.remove()},r=(o,n=[])=>{let p=document.createElement("div");return p.classList.add("card"),n.length>0&&p.classList.add(...n),n.includes("face-down")||p.setAttribute("data-card-id",o.getId()),p},i=(o,n,p=[])=>{o.forEach(c=>n.append(r(c,p)))};[[Ue,I.burnt.peek()],[Be,I.discard.peek()],[je,I.deck.peek(),["face-down"]]].forEach(([o,n,p=[]])=>{e(o),i(n,o,p)}),e(We),I.players.forEach(o=>{let n=o.faceDown.peek(),p=o.faceUp.peek(),c=()=>{let T=document.createElement("div");return T.classList.add("down","pile"),T},a=[c(),c(),c()],d=document.createElement("div"),u=document.createElement("div");a.forEach((T,G)=>{var ee,re;((ee=n[G])!=null?ee:!1)&&T.append(r(n[G],["face-down"])),((re=p[G])!=null?re:!1)&&T.append(r(p[G]))}),u.classList.add("hand");let b=[];(o!==t||!(o instanceof q))&&b.push("face-down"),o.hand.length>0&&o.hand.peek().forEach(T=>u.append(r(T,b))),d.classList.add("player"),d.setAttribute("data-player-name",o.getName()),d.setAttribute("data-player-id",o.getId().toString()),d.append(...a,u),We.append(d)})})};"ontouchstart"in document&&document.querySelector("html").classList.add("has-touch");})();
//# sourceMappingURL=app.js.map