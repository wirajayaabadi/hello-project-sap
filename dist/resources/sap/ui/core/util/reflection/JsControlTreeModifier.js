/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/base/util/ObjectPath","sap/ui/base/BindingParser","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/core/util/reflection/XmlTreeModifier","sap/ui/core/Element","sap/ui/core/Fragment","sap/ui/util/XMLHelper"],function(t,e,n,r,i,o,a,s){"use strict";function g(t){return new Promise(function(e,n){sap.ui.require([t],function(t){e(t)},function(){n(new Error("Required control '"+t+"' couldn't be created asynchronously"))})})}const u={targets:"jsControlTree",setVisible:function(t,e){if(t.setVisible){this.unbindProperty(t,"visible");t.setVisible(e)}else{throw new Error("Provided control instance has no setVisible method")}},getVisible:function(t){if(t.getVisible){return Promise.resolve(t.getVisible())}else{return Promise.reject(new Error("Provided control instance has no getVisible method"))}},setStashed:async function(t,e){e=!!e;if(t.unstash){if(t.isStashed()===true&&e===false){t=await t.unstash(true)}if(t.setVisible){this.setVisible(t,!e)}return t}else{throw new Error("Provided control instance has no unstash method")}},getStashed:async function(t){if(t.isStashed){if(t.isStashed()){return true}const e=await this.getVisible(t);return!e}throw new Error("Provided control instance has no isStashed method")},bindProperty:function(t,e,n){t.bindProperty(e,n)},unbindProperty:function(t,e){if(t){t.unbindProperty(e,true)}},setProperty:function(t,e,r){const i=t.getMetadata().getPropertyLikeSetting(e);let o;let a;this.unbindProperty(t,e);try{o=n.complexParser(r,undefined,true)}catch(t){a=true}if(i){if(this._isSerializable(r)){if(o&&typeof o==="object"||a){r=this._escapeCurlyBracketsInString(r)}const e=i._sMutator;t[e](r)}else{throw new TypeError("Value cannot be stringified","sap.ui.core.util.reflection.JsControlTreeModifier")}}},getProperty:function(t,e){const n=t.getMetadata().getPropertyLikeSetting(e);let r;if(n){const e=n._sGetter;r=t[e]()}return Promise.resolve(r)},isPropertyInitial:function(t,e){return t.isPropertyInitial(e)},setPropertyBinding:function(t,e,n){this.unbindProperty(t,e);const r={};r[e]=n;return t.applySettings(r)},getPropertyBinding:function(t,e){return t.getBindingInfo(e)},createAndAddCustomData:async function(t,e,n,r){const i=await this.createControl("sap.ui.core.CustomData",r);this.setProperty(i,"key",e);this.setProperty(i,"value",n);return this.insertAggregation(t,"customData",i,0)},getCustomDataInfo:function(t,e){let n;if(t.getCustomData){t.getCustomData().some(function(t){if(t.getKey()===e){n=t;return true}return false})}if(n){return{customData:n,customDataValue:n.getValue()}}else{return{}}},createControl:async function(t,e,n,r,i){t=t.replace(/\./g,"/");if(this.bySelector(r,e)){const t="Can't create a control with duplicated ID "+(r.id||r);return Promise.reject(t)}const o=sap.ui.require(t)||await g(t);const a=this.getControlIdBySelector(r,e);return new o(a,i)},applySettings:function(t,e){return Promise.resolve(t.applySettings(e))},_byId:function(t){return o.getElementById(t)},getId:function(t){return t.getId()},getParent:function(t){return t.getParent?.()},getControlMetadata:function(t){return Promise.resolve(t?.getMetadata())},getControlType:function(t){return t?.getMetadata().getName()},setAssociation:function(t,e,n){const r=t.getMetadata().getAssociation(e);r.set(t,n)},getAssociation:function(t,e){const n=t.getMetadata().getAssociation(e);return n.get(t)},getAllAggregations:function(t){return Promise.resolve(t.getMetadata().getAllAggregations())},getAggregation:async function(t,e){const n=await this.findAggregation(t,e);if(n){return t[n._sGetter]()}return undefined},insertAggregation:async function(t,e,n,r){if(e==="customData"){t.insertAggregation(e,n,r,true);return}const i=await this.findAggregation(t,e);if(i){if(i.multiple){const e=r||0;t[i._sInsertMutator](n,e)}else{t[i._sMutator](n)}}},removeAggregation:async function(t,e,n){if(e==="customData"){t.removeAggregation(e,n,true);return}const r=await this.findAggregation(t,e);if(r){t[r._sRemoveMutator](n)}},moveAggregation:async function(t,e,n,r,i,o){let a;let s;if(e==="customData"){t.removeAggregation(e,i,true)}else{a=await this.findAggregation(t,e)}if(r==="customData"){n.insertAggregation(r,i,o,true)}else{s=await this.findAggregation(n,r)}if(a&&s){t[a._sRemoveMutator](i);if(s.multiple){n[s._sInsertMutator](i,o)}else{n[s._sMutator](i)}}},replaceAllAggregation:async function(t,e,n){const r=await this.findAggregation(t,e);t[r._sRemoveAllMutator]();n.forEach((e,n)=>{t[r._sInsertMutator](e,n)})},removeAllAggregation:async function(t,e){if(e==="customData"){t.removeAllAggregation(e,true)}else{const n=await this.findAggregation(t,e);if(n){t[n._sRemoveAllMutator]()}}},getBindingTemplate:function(t,e){const n=t.getBindingInfo(e);return Promise.resolve(n?.template)},updateAggregation:async function(t,e){const n=await this.findAggregation(t,e);if(n&&t.getBinding(e)){t[n._sDestructor]();t.updateAggregation(e)}},findIndexInParentAggregation:async function(t){const e=this.getParent(t);if(!e){return-1}const n=await this.getParentAggregationName(t);const r=await this.getAggregation(e,n);if(Array.isArray(r)){return r.indexOf(t)}else{return 0}},getParentAggregationName:function(t){return Promise.resolve(t.sParentAggregationName)},findAggregation:function(t,e){if(t?.getMetadata){const n=t.getMetadata();const r=n.getAllAggregations();return Promise.resolve(r[e])}return Promise.resolve(undefined)},validateType:async function(t,e,n,r){const i=e.type;const o=await this.getAggregation(n,e.name);if(e.multiple===false&&o&&o.length>0){return false}return t.isA(i)},instantiateFragment:async function(t,e,n){const r=s.parse(t);const i=await this._checkAndPrefixIdsInFragment(r,e);const o=await a.load({definition:i,sId:n&&n.getId(),controller:n.getController()});if(o&&!Array.isArray(o)){return[o]}return o||[]},templateControlFragment:async function(t,e,n){const i=await r._templateFragment(t,e);const o=n?.getController();return a.load({definition:i,controller:o})},destroy:function(t,e){t.destroy(e)},_getFlexCustomData:function(t,n){const r=typeof t==="object"&&typeof t.data==="function"&&t.data("sap-ui-custom-settings");return e.get(["sap.ui.fl",n],r)},bindAggregation:function(t,e,n){return Promise.resolve(t.bindAggregation(e,n))},unbindAggregation:function(t,e){return Promise.resolve(t.unbindAggregation(e))},getExtensionPointInfo:async function(t,e){const n=e._xContent?e._xContent:e;const r=await i.getExtensionPointInfo(t,n);if(r){r.index--;r.parent=r.parent&&this._byId(e.createId(r.parent.getAttribute("id")));r.defaultContent=r.defaultContent.map(t=>{const n=e.createId(t.getAttribute("id"));return this._byId(n)}).filter(t=>!!t)}return r}};return t({},r,u)},true);
//# sourceMappingURL=JsControlTreeModifier.js.map