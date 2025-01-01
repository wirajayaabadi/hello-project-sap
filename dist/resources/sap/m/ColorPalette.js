/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/base/DataType","sap/ui/core/Lib","sap/ui/core/library","sap/ui/core/delegate/ItemNavigation","./Button","./Dialog","./library","./ColorPaletteRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/unified/library","sap/ui/unified/ColorPickerDisplayMode","sap/ui/unified/ColorPicker"],function(t,e,o,r,i,n,s,l,a,h,u,c,jQuery,p,C,g){"use strict";var f=i.CSSColor;var _=p.ColorPickerMode;var d=a.ButtonType;var m=o.getType("boolean");var y="sapMColorPaletteSquare";var R="sapMColorPaletteContent";var v=5;var I=2;var D=15;var S=r.getResourceBundleFor("sap.m");var w=t.extend("sap.m.ColorPalette",{metadata:{library:"sap.m",properties:{colors:{type:"sap.ui.core.CSSColor[]",group:"Appearance",defaultValue:["gold","darkorange","indianred","darkmagenta","cornflowerblue","deepskyblue","darkcyan","olivedrab","darkslategray","azure","white","lightgray","darkgray","dimgray","black"]},selectedColor:{type:"sap.ui.core.CSSColor",defaultValue:null}},aggregations:{_defaultColorButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_moreColorsButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{colorSelect:{parameters:{value:{type:"sap.ui.core.CSSColor"},defaultAction:{type:"boolean"}}},liveChange:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}}}},renderer:h});w.prototype.init=function(){this._oDefaultColor=null;this._bShowDefaultColorButton=false;this._bShowMoreColorsButton=false;this._bShowRecentColorsSection=false;this._oDisplayMode=C.Default;this._oMoreColorsDialog=null;this._oPaletteColorItemNavigation=null;this._oRecentColorItemNavigation=null;this._recentColors=[];this._bMainRegionSelection=true;this._bDefaultColorSelected=false};w.prototype.exit=function(){if(this._oMoreColorsDialog){this._oMoreColorsDialog.destroy();delete this._oMoreColorsDialog}if(this._oPaletteColorItemNavigation){this.removeDelegate(this._oPaletteColorItemNavigation);this._oPaletteColorItemNavigation.destroy();delete this._oPaletteColorItemNavigation}if(this._oRecentColorItemNavigation){this.removeDelegate(this._oRecentColorItemNavigation);this._oRecentColorItemNavigation.destroy();delete this._oRecentColorItemNavigation}};w.prototype.setColors=function(t){t=this.validateProperty("colors",t);if(t.length<I||t.length>D){throw new Error("Cannot set property 'colors' - array must has minimum 2 and maximum 15 elements")}return this.setProperty("colors",t)};w.prototype._setDisplayMode=function(t){var e=this._getColorPicker();e.setDisplayMode(t);this._oDisplayMode=t;return this};w.prototype._getDisplayMode=function(){return this._oDisplayMode};w.prototype._getColorPicker=function(){return this._ensureMoreColorsDialog()._oColorPicker};w.prototype.ontap=function(t){var e=t.target,o,r,i,n;r=e.closest("."+y);i=e.closest("."+R);if(!(r&&i)){return}o=r.getAttribute("data-sap-ui-color");n=i.getAttribute("data-sap-ui-region");this._bMainRegionSelection=n==="main-colors-palette";this._fireColorSelect(o,false,t)};w.prototype.onsaptabnext=w.prototype.onsaptabprevious=function(t){var e=this._getElementInfo(t.target);if(e.bIsMoreColorsButton){this.fireEvent("_colorNotSelected",{_originalEvent:t});return}if(e.bIsDefaultColorButton){this._bMainRegionSelection=false;this._fireColorSelect(this._getDefaultColor(),true,t);return}w.prototype.ontap.apply(this,arguments)};w.prototype.onsapenter=w.prototype.ontap;w.prototype.onsapspace=function(t){t.preventDefault()};w.prototype.onkeyup=function(t){if(t.which===c.SPACE){t.preventDefault();w.prototype.ontap.apply(this,arguments)}};w.prototype.onAfterRendering=function(){this._ensureItemNavigation()};w.prototype.pushToRecentColors=function(t){var e=this._recentColors.indexOf(t);if(!t){return}if(e>-1){this._recentColors.splice(e,1)}else if(this._recentColors.length===5){this._recentColors.pop()}this._recentColors.unshift(t);this.invalidate()};w.prototype.setColorPickerSelectedColor=function(t){if(!f.isValid(t)){throw new Error("Cannot set the selected color - invalid value: "+t)}this._getColorPicker().setColorString(t);return this};w.prototype._createDefaultColorButton=function(){return new s(this.getId()+"-btnDefaultColor",{width:"100%",type:d.Transparent,text:S.getText("COLOR_PALETTE_DEFAULT_COLOR"),visible:this._getShowDefaultColorButton(),press:function(t){this._bMainRegionSelection=false;this._fireColorSelect(this._getDefaultColor(),true,t)}.bind(this)})};w.prototype._getDefaultColor=function(){return this._oDefaultColor};w.prototype._setDefaultColor=function(t){if(!f.isValid(t)){throw new Error("Cannot set internal property '_defaultColor' - invalid value: "+t)}this._oDefaultColor=t;return this};w.prototype._getShowDefaultColorButton=function(){return this._bShowDefaultColorButton};w.prototype._setShowDefaultColorButton=function(t){if(!m.isValid(t)){throw new Error("Cannot set internal property 'showDefaultColorButton' - invalid value: "+t)}this._bShowDefaultColorButton=t;if(t&&!this._getDefaultColorButton()){this.setAggregation("_defaultColorButton",this._createDefaultColorButton())}if(this._getDefaultColorButton()){this._getDefaultColorButton().setVisible(t)}return this};w.prototype._getDefaultColorButton=function(){return this.getAggregation("_defaultColorButton")};w.prototype._createMoreColorsButton=function(){return new s(this.getId()+"-btnMoreColors",{width:"100%",type:d.Transparent,text:S.getText("COLOR_PALETTE_MORE_COLORS"),visible:this._getShowMoreColorsButton(),press:this._openColorPicker.bind(this)})};w.prototype._getShowMoreColorsButton=function(){return this._bShowMoreColorsButton};w.prototype._getShowRecentColorsSection=function(){return this._bShowRecentColorsSection};w.prototype._getRecentColors=function(){return this._recentColors};w.prototype._setShowRecentColorsSection=function(t){if(!m.isValid(t)){throw new Error("Cannot set internal property 'showRecentColorsSection' - invalid value: "+t)}this._bShowRecentColorsSection=t;return this};w.prototype._setShowMoreColorsButton=function(t){if(!m.isValid(t)){throw new Error("Cannot set internal property 'showMoreColorsButton' - invalid value: "+t)}this._bShowMoreColorsButton=t;if(t&&!this._getMoreColorsButton()){this.setAggregation("_moreColorsButton",this._createMoreColorsButton())}if(this._getMoreColorsButton()){this._getMoreColorsButton().setVisible(t)}return this};w.prototype._getMoreColorsButton=function(){return this.getAggregation("_moreColorsButton")};w.prototype._isSelectedInMainRegion=function(){return this._bMainRegionSelection};w.prototype._isSelectedInRecentColors=function(){return!(this._bDefaultColorSelected||this._bMainRegionSelection)};w.prototype._openColorPicker=function(){this.fireEvent("_beforeOpenColorPicker");this._ensureMoreColorsDialog().open()};w.prototype._ensureMoreColorsDialog=function(){if(!this._oMoreColorsDialog){this._oMoreColorsDialog=this._createMoreColorsDialog()}return this._oMoreColorsDialog};w.prototype._createMoreColorsDialog=function(){var t=new l(this.getId()+"-moreColorsDialog",{stretch:!!e.system.phone,title:S.getText("COLOR_PALETTE_MORE_COLORS_TITLE")}).addStyleClass("CPDialog");t.addContent(t._oColorPicker=new g({mode:_.HSL,displayMode:this._oDisplayMode,liveChange:function(t){this.fireLiveChange(t.getParameters())}.bind(this)}));t.setBeginButton(new s({text:S.getText("COLOR_PALETTE_MORE_COLORS_CONFIRM"),type:d.Emphasized,press:function(e){t.close();if(t._oColorPicker.getColorString()){this._bMainRegionSelection=false;this._fireColorSelect(t._oColorPicker.getColorString(),false,e)}}.bind(this)}));t.setEndButton(new s({text:S.getText("COLOR_PALETTE_MORE_COLORS_CANCEL"),press:function(){t.close()}}));return t};w.prototype._focusFirstElement=function(){var t=this._getShowDefaultColorButton()?this._getDefaultColorButton().getDomRef():this._getAllPaletteColorSwatches()[0];t.focus()};w.prototype._focusSelectedElement=function(){var t,e=this._getAllRecentColorSwatches()[0];if(!this.getSelectedColor()||this._bDefaultColorSelected){this._focusFirstElement();return}if(this._bMainRegionSelection){t=this._getAllPaletteColorSwatches().find(t=>t.classList.contains("sapMColorPaletteSquareSelected"))}else{t=e}t?t.focus():this._focusFirstElement()};w.prototype._fireColorSelect=function(t,e,o){this.fireColorSelect({value:t,defaultAction:e,_originalEvent:o});this._bDefaultColorSelected=e;this.setSelectedColor(t);this.pushToRecentColors(t)};w.prototype._ensureItemNavigation=function(){var t=[],e=[];if(!this._oPaletteColorItemNavigation){this._oPaletteColorItemNavigation=new B(this);this._oPaletteColorItemNavigation.setColumns(v);this._oPaletteColorItemNavigation.setCycling(false);this.addDelegate(this._oPaletteColorItemNavigation);this._oPaletteColorItemNavigation.attachEvent(n.Events.BorderReached,this._onSwatchContainerBorderReached,this);this._oPaletteColorItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]})}if(!this._oRecentColorItemNavigation){this._oRecentColorItemNavigation=new B(this);this._oRecentColorItemNavigation.setColumns(v);this._oRecentColorItemNavigation.setCycling(false);this.addDelegate(this._oRecentColorItemNavigation);this._oRecentColorItemNavigation.attachEvent(n.Events.BorderReached,this._onSwatchContainerBorderReached,this);this._oRecentColorItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]})}t=t.concat(this._getAllPaletteColorSwatches());e=e.concat(this._getAllRecentColorSwatches());e=e.slice(0,this._getRecentColors().length);this._oPaletteColorItemNavigation.setRootDomRef(this.getDomRef("swatchCont-paletteColor"));this._oPaletteColorItemNavigation.setItemDomRefs(t);this._oRecentColorItemNavigation.setRootDomRef(this.getDomRef("swatchCont-recentColors"));this._oRecentColorItemNavigation.setItemDomRefs(e)};w.prototype._onSwatchContainerBorderReached=function(t){var e,o,r=["saphome","sapend"].indexOf(t.getParameter("event").type)>-1,i=this._getAllRecentColorSwatches()[0]?this._getElementInfo(t.mParameters.event.target).bIsRecentColorSwatch:false;if(t.getParameter(B.BorderReachedDirection)===B.BorderReachedDirectionForward){if(this._getShowMoreColorsButton()&&!i){e=this._getMoreColorsButton()}else if(!r&&this._bShowRecentColorsSection&&!i&&this._getRecentColors().length>0){e=this._getAllRecentColorSwatches()[0]}else if(!r&&this._getShowDefaultColorButton()){e=this._getDefaultColorButton()}else if(!r){e=this._getAllPaletteColorSwatches()[0]}}else{if(this._getShowDefaultColorButton()&&!i){e=this._getDefaultColorButton()}else if(!r&&this._bShowRecentColorsSection&&!i&&this._getRecentColors().length>0){e=this._getAllRecentColorSwatches()[0]}else if(!r&&this._getShowMoreColorsButton()){e=this._getMoreColorsButton()}else if(!r&&!this._getShowDefaultColorButton()){o=this._getAllPaletteColorSwatches();e=o[o.length-1]}else if(!r){o=this._getAllPaletteColorSwatches();e=o[this._oPaletteColorItemNavigation._getIndexOfTheFirstItemInLastRow()]}}if(e){e.focus()}return e};w.prototype.onsapnext=function(t){var e,o=this._getElementInfo(t.target);if(!(o.bIsDefaultColorButton||o.bIsMoreColorsButton)){return}t.preventDefault();t.stopImmediatePropagation(true);if(o.bIsDefaultColorButton){e=this._getAllPaletteColorSwatches()[0]}else if(this._getRecentColors().length>0&&!o.bIsRecentColorSwatch&&this._bShowRecentColorsSection){e=this._getAllRecentColorSwatches()[0]}else{e=this._getShowDefaultColorButton()?this._getDefaultColorButton():this._getAllPaletteColorSwatches()[0]}e.focus()};w.prototype.onsapprevious=function(t){var e,o=this._getElementInfo(t.target),r;if(!(o.bIsDefaultColorButton||o.bIsMoreColorsButton||t.target===this._getAllRecentColorSwatches()[0])){return}t.preventDefault();t.stopImmediatePropagation(true);r=this._getAllPaletteColorSwatches();if(o.bIsMoreColorsButton||!o.bIsMoreColorsButton&&this.bIsRecentColorSwatch){e=t.keyCode===c.ARROW_UP?r[this._oPaletteColorItemNavigation._getIndexOfTheFirstItemInLastRow()]:r[r.length-1]}else if(o.bIsRecentColorSwatch&&!this._bShowMoreColorsButton&&!this._bShowDefaultColorButton){r=this._getAllPaletteColorSwatches();e=r[this._oPaletteColorItemNavigation._getIndexOfTheFirstItemInLastRow()]}else if(this._getRecentColors().length>0&&!o.bIsRecentColorSwatch&&this._bShowRecentColorsSection){e=this._getAllRecentColorSwatches()[0]}else if(this._getShowMoreColorsButton()){e=this._getMoreColorsButton()}else{e=r[this._oPaletteColorItemNavigation._getIndexOfTheFirstItemInLastRow()]}e.focus()};w.prototype.onsaphome=function(t){var e=this._getElementInfo(t.target);if(!e.bIsMoreColorsButton){return}if(this._getShowDefaultColorButton()){this._getDefaultColorButton().focus()}t.preventDefault();t.stopImmediatePropagation(true)};w.prototype.onsapend=function(t){var e=this._getElementInfo(t.target);if(!e.bIsDefaultColorButton){return}if(this._getShowMoreColorsButton()){this._getMoreColorsButton().focus()}t.preventDefault();t.stopImmediatePropagation(true)};w.prototype._getAllPaletteColorSwatches=function(){return this.$().find("."+y).get().slice(0,this.getColors().length)};w.prototype._getAllRecentColorSwatches=function(){return this.$().find("."+y).get().slice(this.getColors().length)};w.prototype._getElementInfo=function(t){var e=this._getShowDefaultColorButton()&&u(t,this._getDefaultColorButton().getDomRef()),o=!e&&this._getShowMoreColorsButton()&&u(t,this._getMoreColorsButton().getDomRef()),r=this._getAllRecentColorSwatches().indexOf(t)>-1,i=this._getAllPaletteColorSwatches().indexOf(t)>-1;return{bIsDefaultColorButton:e,bIsMoreColorsButton:o,bIsASwatch:i,bIsRecentColorSwatch:r}};var B=n.extend("sap.m.ItemNavigationHomeEnd",{constructor:function(){n.apply(this,arguments);this.setHomeEndColumnMode(true);this.fireEvent=function(t,e){var o;if(t===n.Events.BorderReached){o=B.BorderReachedDirectionBackward;if(["sapnext","sapend"].indexOf(e.event.type)>-1){o=B.BorderReachedDirectionForward}e[B.BorderReachedDirection]=o}return n.prototype.fireEvent.apply(this,arguments)}}});B.BorderReachedDirection="direction";B.BorderReachedDirectionForward="BorderReachedDirectionForward";B.BorderReachedDirectionBackward="BorderReachedDirectionBackward";B.prototype.getColumns=function(){return this.iColumns};B.prototype.onsapprevious=function(t){var e=u(this.getRootDomRef(),t.target),o=t.keyCode===c.ARROW_UP&&this.getFocusedIndex()===0;if(!e){return}if(!o){n.prototype.onsapprevious.apply(this,arguments);return}t.preventDefault();this.fireEvent(n.Events.BorderReached,{index:0,event:t})};B.prototype.onsapnext=function(t){var e=u(this.getRootDomRef(),t.target),o,r,i;if(!e){return}if(t.keyCode!==c.ARROW_DOWN){n.prototype.onsapnext.apply(this,arguments);return}r=this.getFocusedIndex();i=this._getItemInfo(r);if(i.bIsLastItem&&i.bIsInTheLastColumn){t.preventDefault();this.fireEvent(n.Events.BorderReached,{index:r,event:t});return}if(i.bNextRowExists&&!i.bItemSameColumnNextRowExists){t.preventDefault();o=this.getItemDomRefs();o[o.length-1].focus();return}n.prototype.onsapnext.apply(this,arguments)};B.prototype.onsaphome=function(t){var e=u(this.getRootDomRef(),t.target),o;if(!e){return}o=this._getItemInfo(this.getFocusedIndex());if(!o.bIsInTheFirstColumn){n.prototype.onsaphome.apply(this,arguments);return}t.preventDefault();if(o.bIsFirstItem){this.fireEvent(n.Events.BorderReached,{index:0,event:t})}else{this.getItemDomRefs()[0].focus()}};B.prototype.onsapend=function(t){var e=u(this.getRootDomRef(),t.target),o;if(!e){return}o=this._getItemInfo(this.getFocusedIndex());if(!(o.bIsLastItem||o.bIsInTheLastColumn)){n.prototype.onsapend.apply(this,arguments);return}t.preventDefault();if(o.bIsLastItem){this.fireEvent(n.Events.BorderReached,{index:this.getItemDomRefs().length-1,event:t})}else{this.getItemDomRefs()[this.getItemDomRefs().length-1].focus()}};B.prototype._getItemInfo=function(t){var e=this.getItemDomRefs().length,o=t===e-1,r=e>this.getColumns()?this.getColumns():e,i=t%this.getColumns()===0,n=(t+1)%r===0,s=Math.floor(t/this.getColumns())+1,l,a;l=s*this.getColumns()<e;a=l&&t+this.getColumns()<e;return{bIsFirstItem:t===0,bIsLastItem:o,bIsInTheLastColumn:n,bIsInTheFirstColumn:i,bNextRowExists:l,bItemSameColumnNextRowExists:a}};B.prototype._getIndexOfTheFirstItemInLastRow=function(){return Math.floor((this.getItemDomRefs().length-1)/this.getColumns())*this.getColumns()};w.prototype._ItemNavigation=B;w.prototype._ColorsHelper={RGB_TO_NAMED_COLORS_MAP:{"#FFB200":"gold","#FF8C00":"darkorange","#CD5C5C":"indianred","#8B008B":"darkmagenta","#6495ED":"cornflowerblue","#00BFFF":"deepskyblue","#008B8B":"darkcyan","#6B8E23":"olivedrab","#2F4F4F":"darkslategray","#F0FFFF":"azure","#FFFFFF":"white","#D3D3D3":"lightgray","#A9A9A9":"darkgray","#696969":"dimgray","#000000":"black"},NAME_COLORS_TO_RGB_MAP:{gold:"#FFB200",darkorange:"#FF8C00",indianred:"#CD5C5C",darkmagenta:"#8B008B",cornflowerblue:"#6495ED",deepskyblue:"#00BFFF",darkcyan:"#008B8B",olivedrab:"#6B8E23",darkslategray:"#2F4F4F",azure:"#F0FFFF",white:"#FFFFFF",lightgray:"#D3D3D3",darkgray:"#A9A9A9",dimgray:"#696969",black:"#000000"},getNamedColor:function(t){var e="";if(!t||t.toLowerCase().indexOf("hsl")!==-1){return undefined}if(t.indexOf("#")===-1){return this.NAME_COLORS_TO_RGB_MAP[t.toLowerCase()]?t.toLowerCase():undefined}if(t.length===4){e=["#",t[1],t[1],t[2],t[2],t[3],t[3]].join("")}else{e=t}e=e.toUpperCase();return this.RGB_TO_NAMED_COLORS_MAP[e]}};return w});
//# sourceMappingURL=ColorPalette.js.map