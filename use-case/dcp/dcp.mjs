/*!
* Dynamsoft JavaScript Library
* @product Dynamsoft Code Parser JS Edition
* @website http://www.dynamsoft.com
* @copyright Copyright 2024, Dynamsoft Corporation
* @author Dynamsoft
* @version 2.2.10-dev-20240402130942
* @fileoverview Dynamsoft JavaScript Library for Code Parser
* More info on dcp JS: https://www.dynamsoft.com/code-parser/docs/web/programming/javascript/
*/
import{mapPackageRegister as e,loadWasm as t,getNextTaskID as s,mapTaskCallBack as n,worker as i,checkIsLink as r,requestResource as a,engineResourcePaths as o,workerAutoResources as c,compareVersion as d,innerVersions as l,CoreModule as u}from"dynamsoft-core";var f,p;function h(e){delete e.moduleId;const t=JSON.parse(e.jsonString).ResultInfo,s=e.fullCodeString;e.getFieldValue=e=>"fullcodestring"===e.toLowerCase()?s:g(t,e),e.getFieldMappingStatus=e=>y(t,e),e.getFieldValidationStatus=e=>S(t,e),delete e.fullCodeString}function g(e,t){for(let s of e){if(s.FieldName===t)return s.Value;if(s.ChildFields&&s.ChildFields.length>0){let e;for(let n of s.ChildFields)e=g(n,t);if(null!==e)return e}}return null}function y(e,t){for(let s of e){if(s.FieldName===t)return s.MappingStatus?Number(f[s.MappingStatus]):f.MS_NONE;if(s.ChildFields&&s.ChildFields.length>0){let e;for(let n of s.ChildFields)e=y(n,t);if(null!==e)return e}}return null}function S(e,t){for(let s of e){if(s.FieldName===t&&s.ValidationStatus)return s.ValidationStatus?Number(p[s.ValidationStatus]):p.VS_NONE;if(s.ChildFields&&s.ChildFields.length>0){let e;for(let n of s.ChildFields)e=S(n,t);if(null!==e)return e}}return null}function _(e){if(e.disposed)throw new Error('"CodeParser" instance has been disposed')}!function(e){e[e.MS_NONE=0]="MS_NONE",e[e.MS_SUCCEEDED=1]="MS_SUCCEEDED",e[e.MS_FAILED=2]="MS_FAILED"}(f||(f={})),function(e){e[e.VS_NONE=0]="VS_NONE",e[e.VS_SUCCEEDED=1]="VS_SUCCEEDED",e[e.VS_FAILED=2]="VS_FAILED"}(p||(p={}));const m=e=>e&&"object"==typeof e&&"function"==typeof e.then;class E extends Promise{constructor(e){let t,s;super(((e,n)=>{t=e,s=n})),this._s="pending",this.resolve=e=>{this.isPending&&(m(e)?this.task=e:(this._s="fulfilled",t(e)))},this.reject=e=>{this.isPending&&(this._s="rejected",s(e))},this.task=e}get status(){return this._s}get isPending(){return"pending"===this._s}get isFulfilled(){return"fulfilled"===this._s}get isRejected(){return"rejected"===this._s}get task(){return this._task}set task(e){let t;this._task=e,m(e)?t=e:"function"==typeof e&&(t=new Promise(e)),t&&(async()=>{try{const s=await t;e===this._task&&this.resolve(s)}catch(t){e===this._task&&this.reject(t)}})()}get isEmpty(){return null==this._task}}class w{constructor(){this._instanceID=void 0,this.bDestroyed=!1}static async createInstance(){if(!e.license)throw Error("Module `license` is not existed.");await e.license.dynamsoft(),await t("dcp");const r=new w,a=new E;let o=s();return n[o]=async e=>{if(e.success)r._instanceID=e.instanceID,a.resolve(r);else{const t=Error(e.message);e.stack&&(t.stack=e.stack),a.reject(t)}},i.postMessage({type:"dcp_createInstance",id:o}),a}async dispose(){_(this);let e=s();this.bDestroyed=!0,n[e]=e=>{if(!e.success){let t=new Error(e.message);throw t.stack=e.stack+"\n"+t.stack,t}},i.postMessage({type:"dcp_dispose",id:e,instanceID:this._instanceID})}get disposed(){return this.bDestroyed}async initSettings(e){return _(this),e&&["string","object"].includes(typeof e)?("string"==typeof e&&r(e)&&(e=await a(e,"text")),"object"==typeof e&&(e=JSON.stringify(e)),await new Promise(((t,r)=>{let a=s();n[a]=async e=>{if(e.success){const s=JSON.parse(e.response);if(0!==s.exception){let e=new Error(s.description?s.description:"Init Settings Failed.");return e.errorCode=s.exception,r(e)}return t(s)}{let t=new Error(e.message);return t.stack=e.stack+"\n"+t.stack,r(t)}},i.postMessage({type:"dcp_initSettings",id:a,instanceID:this._instanceID,body:{settings:e}})}))):console.error("Invalid settings.")}async resetSettings(){return _(this),await new Promise(((e,t)=>{let r=s();n[r]=async s=>{if(s.success)return e();{let e=new Error(s.message);return e.stack=s.stack+"\n"+e.stack,t(e)}},i.postMessage({type:"dcp_resetSettings",id:r,instanceID:this._instanceID})}))}async parse(e,t=""){if(_(this),!(e&&(e instanceof Array||e instanceof Uint8Array||"string"==typeof e)))throw new Error("`parse` must pass in an Array or Uint8Array or string");return await new Promise(((r,a)=>{let o=s();e instanceof Array&&(e=Uint8Array.from(e)),"string"==typeof e&&(e=Uint8Array.from(function(e){let t=[];for(let s=0;s<e.length;++s)t.push(e.charCodeAt(s));return t}(e))),n[o]=async e=>{if(e.success){let t=JSON.parse(e.parseResponse);return t.exception?a(new Error(t.description)):(h(t),r(t))}{let t=new Error(e.message);return t.stack=e.stack+"\n"+t.stack,a(t)}},i.postMessage({type:"dcp_parse",id:o,instanceID:this._instanceID,body:{source:e,taskSettingName:t}})}))}}const k="undefined"==typeof self,D=(()=>{if(!k&&document.currentScript){let e=document.currentScript.src,t=e.indexOf("?");if(-1!=t)e=e.substring(0,t);else{let t=e.indexOf("#");-1!=t&&(e=e.substring(0,t))}return e.substring(0,e.lastIndexOf("/")+1)}return"./"})(),N=e=>{if(null==e&&(e="./"),k);else{let t=document.createElement("a");t.href=e,e=t.href}return e.endsWith("/")||(e+="/"),e};null==o.dcp&&(o.dcp=D),c.dcp={js:!0,wasm:!0,deps:["license"]},e.dcp={handleParsedResultItem:h};const C="1.2.0";"string"!=typeof o.std&&d(o.std.version,C)<0&&(o.std={version:C,path:N(D+`../../dynamsoft-capture-vision-std@${C}/dist/`)});class I{static getVersion(){const e=l.dcp&&l.dcp.wasm,t=l.dcp&&l.dcp.worker;return`2.2.10-dev-20240402130942(Worker: ${t||"Not Loaded"}, Wasm: ${e||"Not Loaded"})`}static async loadSpec(e,r){return await t("dcp"),await new Promise(((t,a)=>{let o=s();n[o]=async e=>{if(e.success)return t();{let t=new Error(e.message);return t.stack=e.stack+"\n"+t.stack,a(t)}},r&&!r.endsWith("/")&&(r+="/");const c=e instanceof Array?e:[e];i.postMessage({type:"dcp_appendResourceBuffer",id:o,body:{specificationPath:r||u.engineResourcePaths.dcp+"specification/",specificationNames:c}})}))}}export{w as CodeParser,I as CodeParserModule,f as EnumMappingStatus,p as EnumValidationStatus};
