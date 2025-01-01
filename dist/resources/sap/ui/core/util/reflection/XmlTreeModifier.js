/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isPlainObject","sap/base/util/merge","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/core/Fragment","sap/ui/util/XMLHelper"],function(t,e,n,i,r,o,a){"use strict";const s="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";const c=e({},r,{targets:"xmlTree",setVisible:function(t,e){if(e){t.removeAttribute("visible")}else{t.setAttribute("visible",e)}},getVisible:function(t){return c.getProperty(t,"visible")},setStashed:function(t,e){if(!e){t.removeAttribute("stashed")}else{t.setAttribute("stashed",e)}c.setVisible(t,!e);return Promise.resolve()},getStashed:function(t){return Promise.all([c.getProperty(t,"stashed"),c.getProperty(t,"visible")]).then(function(t){return!!t[0]||!t[1]})},bindProperty:function(t,e,n){t.setAttribute(e,"{"+n+"}")},unbindProperty:function(t,e){t.removeAttribute(e)},_setProperty:function(t,e,n,i){let r=c._getSerializedValue(n);if(i){r=c._escapeCurlyBracketsInString(r)}t.setAttribute(e,r)},setProperty:function(t,e,n){c._setProperty(t,e,n,true)},getProperty:async function(e,r){let o;let a=e.getAttribute(r);const s=await c.getControlMetadata(e);const g=s.getProperty(r);if(g){o=g.getType();if(r==="value"&&c.getControlType(e)==="sap.ui.core.CustomData"){const t=await c.getProperty(e,"key");if(t==="sap-ui-custom-settings"){o=n.getType("object")}}if(a===null){a=g.getDefaultValue()||o.getDefaultValue()}else{const e=i.bindingParser(a,undefined,true);if(t(e)){if(e.path||e.parts){a=undefined}else{a=e}}else{a=o.parseValue(e||a)}}}return a},isPropertyInitial:function(t,e){const n=t.getAttribute(e);return n==null},setPropertyBinding:function(t,e,n){if(typeof n!=="string"){throw new Error("For XML, only strings are supported to be set as property binding.")}t.setAttribute(e,n)},getPropertyBinding:function(t,e){const n=t.getAttribute(e);if(n){const t=i.bindingParser(n,undefined,true);if(t&&(t.path||t.parts)){return t}}return undefined},createAndAddCustomData:function(t,e,n){t.setAttributeNS(s,"custom.data.via.modifier:"+e,c._escapeCurlyBracketsInString(n));return Promise.resolve()},getCustomDataInfo:function(t,e){const n=t.attributes["custom.data.via.modifier:"+e];if(n){return{customData:n,customDataValue:n.value}}else{return{}}},createControl:async function(t,e,n,i,r,o){const a=c.getControlIdBySelector(i,e);if(!c.bySelector(i,e,n)){let e;const i=t.split(".");let o="";if(i.length>1){e=i.pop();o=i.join(".")}const s=n.ownerDocument.createElementNS(o,e);if(a){s.setAttribute("id",a)}if(r){await c.applySettings(s,r)}return s}else{throw new Error("Can't create a control with duplicated ID "+a)}},applySettings:async function(t,e){const n=await c.getControlMetadata(t);const i=n.getJSONKeys();Object.keys(e).forEach(function(n){const r=i[n];const o=e[n];switch(r._iKind){case 0:c._setProperty(t,n,o,false);break;case 3:c.setAssociation(t,n,o);break;default:throw new Error("Unsupported in applySettings on XMLTreeModifier: "+n)}})},_byId:function(t,e){if(e){if(e.ownerDocument&&e.ownerDocument.getElementById&&e.ownerDocument.getElementById(t)){return e.ownerDocument.getElementById(t)}return e.querySelector("[id='"+t+"']")}return undefined},getId:function(t){return t.getAttribute("id")},getParent:function(t){const e=t.parentNode;if(e&&!c.getId(e)&&!c._isExtensionPoint(e)){return e.parentNode}return e},_getLocalName:function(t){return t.localName||t.baseName||t.nodeName},getControlType:function(t){return c._getControlTypeInXml(t)},setAssociation:function(t,e,n){if(typeof n!=="string"){n=c.getId(n)}t.setAttribute(e,n)},getAssociation:function(t,e){return t.getAttribute(e)},getAllAggregations:async function(t){const e=await c.getControlMetadata(t);return e.getAllAggregations()},getAggregation:async function(t,e){let n=[];const i=await c._isSingleValueAggregation(t,e);const r=await c._findAggregationNode(t,e);if(r){const e=await c._getControlsInAggregation(t,r);n=e}else{const r=await c._isAltTypeAggregation(t,e);if(r&&i){const i=await c.getProperty(t,e);n.push(i)}}if(e==="customData"){let e;const i=Array.prototype.slice.call(t.attributes).reduce(function(n,i){const r=c._getLocalName(i);if(i.namespaceURI===s){const e=t.ownerDocument.createElementNS("sap.ui.core","CustomData");e.setAttribute("key",r);e.setAttribute("value",i.value);n.push(e)}else if(i.namespaceURI&&i.name.indexOf("xmlns:")!==0){if(!e){e={}}if(!e.hasOwnProperty(i.namespaceURI)){e[i.namespaceURI]={}}e[i.namespaceURI][r]=i.nodeValue}return n},[]);n=n.concat(i);if(e){const i=t.ownerDocument.createElementNS("sap.ui.core","CustomData");i.setAttribute("key","sap-ui-custom-settings");c.setProperty(i,"value",e);n.push(i)}}return i?n[0]:n},insertAggregation:async function(t,e,n,i,r,o){const a=await c._findAggregationNode(t,e);return g(t,e,n,i,r,o,a)},removeAggregation:async function(t,e,n){const i=await c._findAggregationNode(t,e);i.removeChild(n)},moveAggregation:async function(t,e,n,i,r,o,a,s){const u=await c._findAggregationNode(t,e);const l=await c._findAggregationNode(n,i);u.removeChild(r);await g(n,i,r,o,a,s,l)},replaceAllAggregation:async function(t,e,n){const i=await c._findAggregationNode(t,e);const r=await c._getControlsInAggregation(t,i);r.forEach(function(t){i.removeChild(t)});n.forEach(t=>{i.appendChild(t)})},removeAllAggregation:async function(t,e){const n=await c._findAggregationNode(t,e);if(t===n){const e=await c._getControlsInAggregation(t,t);e.forEach(function(e){t.removeChild(e)})}else{return t.removeChild(n)}},_findAggregationNode:async function(t,e){let n;const i=c._children(t);for(let t=0;t<i.length;t++){const r=i[t];if(r.localName===e){n=r;break}}if(!n){const n=await c._isDefaultAggregation(t,e);if(n){return t}}return n},_isDefaultAggregation:async function(t,e){const n=await c.getControlMetadata(t);const i=n.getDefaultAggregation();return i&&e===i.name},_isNotNamedAggregationNode:async function(t,e){const n=await c.getAllAggregations(t);const i=n[e.localName];return t.namespaceURI!==e.namespaceURI||!i},_isSingleValueAggregation:async function(t,e){const n=await c.getAllAggregations(t);const i=n[e];return!i.multiple},_isAltTypeAggregation:async function(t,e){const n=await c.getControlMetadata(t);const i=n.getAllAggregations()[e];return!!i.altTypes},_isExtensionPoint:function(t){return c._getControlTypeInXml(t)==="sap.ui.core.ExtensionPoint"},getControlMetadata:function(t){return c._getControlMetadataInXml(t)},_getControlsInAggregation:async function(t,e){const n=[].slice.call(c._children(e));const i=await Promise.all(n.map(async e=>{const n=await c._isNotNamedAggregationNode(t,e);return n?e:undefined}));return i.filter(t=>!!t)},_children:function(t){if(t.children){return t.children}else{const e=[];for(let n=0;n<t.childNodes.length;n++){const i=t.childNodes[n];if(i.nodeType===i.ELEMENT_NODE){e.push(i)}}return e}},getBindingTemplate:async function(t,e){const n=await c._findAggregationNode(t,e);if(n){const t=c._children(n);if(t.length===1){return t[0]}}return undefined},updateAggregation:function(t,e){},findIndexInParentAggregation:async function(t){const e=c.getParent(t);if(!e){return-1}const n=await c.getParentAggregationName(t,e);let i=await c.getAggregation(e,n);if(Array.isArray(i)){const e=i.map(async t=>{if(c._isExtensionPoint(t)){return t}const e=await c.getProperty(t,"stashed");return!e?t:undefined});i=await Promise.all(e);return i.filter(t=>!!t).indexOf(t)}else{return 0}},getParentAggregationName:async function(t,e){const n=e.isSameNode(t.parentNode);const i=await c._isNotNamedAggregationNode(e,t);if(i&&n){const t=await c.getControlMetadata(e);return t.getDefaultAggregationName()}else{return c._getLocalName(t.parentNode)}},findAggregation:async function(t,e){const n=await c.getControlMetadata(t);const i=await n.getAllAggregations();if(i){return i[e]}return undefined},validateType:async function(t,e,n,i,r){const a=e.type;const s=await c.getAggregation(n,e.name);if(e.multiple===false&&s&&s.length>0){return false}const g=await o.load({definition:i});const u=!Array.isArray(g)?[g]:g;const l=u[r].isA(a);u.forEach(function(t){t.destroy()});return l},instantiateFragment:async function(t,e,n){const i=a.parse(t);const r=await c._checkAndPrefixIdsInFragment(i,e);let o;if(r.localName==="FragmentDefinition"){o=c._getElementNodeChildren(r)}else{o=[r]}o.forEach(function(t){if(c._byId(t.getAttribute("id"),n)){throw Error("The following ID is already in the view: "+t.getAttribute("id"))}});return o},templateControlFragment:async function(t,e){const n=await r._templateFragment(t,e);return c._children(n)},destroy:function(t){const e=t.parentNode;if(e){e.removeChild(t)}},_getFlexCustomData:function(t,e){if(!t){return undefined}return t.getAttributeNS("sap.ui.fl",e)},bindAggregation:function(t,e,n,i){c.bindProperty(t,e,n.path);return c.insertAggregation(t,e,n.template,0,i)},unbindAggregation:function(t,e){if(t.hasAttribute(e)){t.removeAttribute(e);return c.removeAllAggregation(t,e)}return Promise.resolve()},getExtensionPointInfo:async function(t,e){if(e&&t){const n=Array.prototype.slice.call(e.getElementsByTagNameNS("sap.ui.core","ExtensionPoint"));const i=n.filter(function(e){return e.getAttribute("name")===t});const r=i.length===1?i[0]:undefined;if(r){const t=c.getParent(r);const e=await Promise.all([c.getParentAggregationName(r,t),c.findIndexInParentAggregation(r)]);const n={parent:t,aggregationName:e[0],index:e[1]+1,defaultContent:Array.prototype.slice.call(c._children(r))};return n}}return undefined}});async function g(t,e,n,i,r,o,a){let s;if(!a){const n=t.namespaceURI;s=await c.createControl(n+"."+e,undefined,r);t.appendChild(s)}else{s=a}if(!o){const t=s.children;let e=0;const n=i<t.length?i:t.length;for(let i=0;i<n;i++){if(t[i].namespaceURI==="sap.ui.core"&&t[i].tagName.includes("ExtensionPoint")){e=e+1-t[i].children.length}}i=i+e}if(i>=s.childElementCount){s.appendChild(n)}else{const e=await c._getControlsInAggregation(t,s);s.insertBefore(n,e[i])}return undefined}return c},true);
//# sourceMappingURL=XmlTreeModifier.js.map