/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/EventProvider","sap/ui/core/InvisibleText","sap/ui/core/ValueStateSupport","sap/m/library","sap/ui/core/library","sap/m/List","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/SuggestionsPopoverDialogMixin","sap/m/inputUtils/SuggestionsPopoverPopoverMixin"],function(t,e,a,s,i,o,n,r,u,l){"use strict";var p=i.ListMode;var c=i.ListSeparators;var d="sapMSuggestionsPopover",f="sapUiNoContentPadding";var g=o.ValueState;var h=e.extend("sap.m.SuggestionsPopover",{constructor:function(){e.apply(this,arguments);this._sPopoverContentWidth=null;this._sOldValueState=g.None;if(t.system.phone){u.apply(h.prototype)}else{l.apply(h.prototype)}},destroy:function(){this._destroySuggestionPopup()}});h.M_EVENTS={SELECTION_CHANGE:"selectionChange"};h.prototype.isOpen=function(){var t=this.getPopover();return t&&t.isOpen()};h.prototype.setPopover=function(t){this._oPopover=t};h.prototype.getPopover=function(){return this._oPopover};h.prototype.destroyPopover=function(){if(this._oPopover){this._oPopover.destroy()}this._oPopover=null};h.prototype.setInputLabels=function(t){this._fnInputLabels=t};h.prototype.createSuggestionPopup=function(t,e,s){var i,o=this.getItemsContainer();e=e||[];i=this.createPopover(t,e,s);this.setPopover(i);i.addStyleClass(d);i.addStyleClass(f);i.addAriaLabelledBy(a.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));if(o){this.addContent(o)}};h.prototype.initContent=function(t,e){var a=e,s=this.getPopover();if(!s){return}if(!a){a=new n(t+"-popup-list",{showNoData:false,mode:p.SingleSelectMaster,rememberSelections:false,width:"100%",showSeparators:c.None,busyIndicatorDelay:0});a.applyAriaRole("listbox")}this.addContent(a)};h.prototype._destroySuggestionPopup=function(){this.destroyPopover();this._oValueStateHeader=null};h.prototype.addContent=function(t){this.getPopover().addContent(t)};h.prototype.getItemsContainer=function(){var t=this.getPopover(),e=t&&t.getContent();return e&&e.filter(function(t){return t.isA("sap.m.List")&&t.getId().indexOf("-popup-list")>-1||t.isA("sap.m.Table")})[0]};h.prototype.handleListNavigation=function(e,a,s){var i=this.getPopover();if(a.isMarked()){return}if(!e.getEnabled()||!e.getEditable()){return}if(!i||!i.isOpen()){return}a.preventDefault();a.stopPropagation();var o=this.getItemsContainer(),n=this._getValueStateHeader(),u=n&&n.getValueState()!==g.None,l=e.hasStyleClass("sapMFocus"),p=o&&o.getItems().filter(function(t){return t.getVisible&&t.getVisible()}),c;const d=this.getSelectedListItemIndex();switch(a.type){case"sapdown":c=this.handleArrowDown(p,d,l,u,s);break;case"sapup":c=this.handleArrowUp(p,d,l,u);break;case"sapend":c=this.handleEnd(p,u);break;case"saphome":c=this.handleHome(p,u);break;case"sappagedown":c=this.handlePageDown(p,d,u);break;case"sappageup":c=this.handlePageUp(p,d,u);break}this.updateFocus(e,c);if(e.handleSelectionFromList){e.handleSelectionFromList(c)}else{this.handleSelectionFromList(c)}this.updateAriaActiveDescendant(e,c);if(t.system.desktop&&c){r(c,this.getPopover())}};h.prototype.handleArrowDown=function(t,e,a,s,i){if(a&&!s&&!i){return t[0]}if(!a&&!this.getValueStateActiveState()&&!i){if(e===t.length-1){return t[e]}return t[e+1]}if(a&&s&&!i){this.setValueStateActiveState(true);return undefined}if(this.getValueStateActiveState()&&!i){this.setValueStateActiveState(false);return t[0]}if(s&&this.getValueStateActiveState()&&i){this.setValueStateActiveState(false);return t[0]}if(e===t.length-1&&i){return t[e]}return t[e+1]};h.prototype.handleArrowUp=function(t,e,a,s){if(a){return}if(e>0){return t[e-1]}if(s){this.setValueStateActiveState(!this.getValueStateActiveState())}};h.prototype.handleEnd=function(t,e){if(e){this.setValueStateActiveState(false)}return t.length&&t[t.length-1]};h.prototype.handleHome=function(t,e){if(e){this.setValueStateActiveState(true);return}return t.length&&t[0]};h.prototype.handlePageDown=function(t,e,a){if(a){this.setValueStateActiveState(false)}return t[Math.min(t.length-1,e+10)]};h.prototype.handlePageUp=function(t,e,a){if(e-10>=0){return t[e-10]}if(a){this.setValueStateActiveState(true);return}return t[0]};h.prototype.updateFocus=function(t,e){var a=this.getItemsContainer(),s=this.getFocusedListItem(),i=this._getValueStateHeader(),o=i&&i.getValueState()!==g.None;a&&a.removeStyleClass("sapMListFocus");s&&s.removeStyleClass("sapMLIBFocused");t.hasStyleClass("sapMFocus")&&t.removeStyleClass("sapMFocus");o&&i.removeStyleClass("sapMPseudoFocus");if(e){e.addStyleClass("sapMLIBFocused");a.addStyleClass("sapMListFocus");this.updateListDataAttributes(a)}else if(this.getValueStateActiveState()){i.addStyleClass("sapMPseudoFocus")}else{t.addStyleClass("sapMFocus")}};h.prototype.updateListDataAttributes=function(t){if(!t){return}var e=t.getVisibleItems();if(!e){return}e.forEach(function(t){var e=t.getDomRef();if(e&&e.hasAttribute("data-sap-ui-first-suggestion-item")){e.removeAttribute("data-sap-ui-first-suggestion-item")}if(e&&e.hasAttribute("data-sap-ui-last-suggestion-item")){e.removeAttribute("data-sap-ui-last-suggestion-item")}});if(e[0]){var a=e[0].getDomRef();a&&a.setAttribute("data-sap-ui-first-suggestion-item","")}if(e[e.length-1]){var s=e[e.length-1].getDomRef();s&&s.setAttribute("data-sap-ui-last-suggestion-item","")}};h.prototype.handleSelectionFromList=function(t){var e=this.getItemsContainer(),a=this.getFocusedListItem(),s=t&&t.isA("sap.m.GroupHeaderListItem");if(!t||s){e.removeSelections(true)}else{e.setSelectedItem(t,true)}this.fireEvent(h.M_EVENTS.SELECTION_CHANGE,{previousItem:a,newItem:t})};h.prototype.updateAriaActiveDescendant=function(t,e){var a=t.getFocusDomRef(),s=this._getValueStateHeader(),i=s&&s.getFormattedText(),o;if(t.hasStyleClass("sapMFocus")){a.removeAttribute("aria-activedescendant");return}if(e){a.setAttribute("aria-activedescendant",e.getId());return}if(this.getValueStateActiveState()){o=i?i.getId():s.getId();a.setAttribute("aria-activedescendant",o)}};h.prototype.getFocusedListItem=function(){var t=this.getItemsContainer(),e=t&&t.getItems()||[];for(var a=0;a<e.length;a++){if(e[a].hasStyleClass("sapMLIBFocused")){return e[a]}}};h.prototype.getSelectedListItemIndex=function(){const t=this.getItemsContainer();const e=t&&t.getItems()||[];const a=e.filter(t=>t.getVisible&&t.getVisible());if(e.filter(t=>t.getSelected()).length){return a.findIndex(t=>t.getSelected())}return a.findIndex(t=>t.hasStyleClass("sapMLIBFocused"))};h.prototype.setValueStateActiveState=function(t){this.bMessageValueStateActive=t};h.prototype.getValueStateActiveState=function(){return this.bMessageValueStateActive};h.prototype.updateValueState=function(t,e,a){e=e||s.getAdditionalText(t);if(!this.getPopover()){return this}if(this.getInput()){this.getInput().setValueState(t)}var i=this._getValueStateHeader();i.setValueState(t);if(i&&typeof e==="string"){i.setText(e)}else if(i&&typeof e==="object"){i.setFormattedText(e)}if(i){i.setValueState(a?t:g.None)}this._alignValueStateStyles(t);return this};h.prototype._handleValueStateLinkNav=function(t,e){if(!this.getValueStateActiveState()||this.getValueStateActiveState()&&document.activeElement.tagName==="A"){return}var a=this.getValueStateLinks(),s=a[a.length-1];e.preventDefault();a[0].focus();this._getValueStateHeader().removeStyleClass("sapMPseudoFocus");a.forEach(function(e){e.addDelegate({onsapup:function(e){t.getFocusDomRef().focus();this.handleListNavigation(t,e)},onsapdown:function(e){t.getFocusDomRef().focus();this.handleListNavigation(t,e)}},this)},this);s.addDelegate({onsaptabnext:function(e){this.setValueStateActiveState(false);t.onsapfocusleave(e);this.getPopover().close();setTimeout(function(){t.closeValueStateMessage()},0)}},this);a[0].addDelegate({onsaptabprevious:function(e){e.preventDefault();t.getFocusDomRef().focus();this._getValueStateHeader().addStyleClass("sapMPseudoFocus");t.removeStyleClass("sapMFocus")}},this)};h.prototype.getValueStateLinks=function(){var t=this._getValueStateHeader(),e=t&&typeof t.getFormattedText==="function"&&t.getFormattedText(),a=e&&typeof e.getControls==="function"&&e.getControls();return a||[]};h.prototype._alignValueStateStyles=function(t){var e=d+"ValueState",a=d+this._sOldValueState+"State",s=d+t+"State",i=this.getPopover();i.addStyleClass(e);i.removeStyleClass(a);i.addStyleClass(s);this._sOldValueState=t};h.prototype.decorateParent=function(t){t.addEventDelegate({onsaptabnext:this._handleValueStateLinkNav.bind(this,t),onsaptabprevious:this._handleValueStateLinkNav.bind(this,t)},this)};h.prototype.getInput=function(){return null};h.prototype.getPickerTitle=function(){return null};h.prototype.getOkButton=function(){return null};h.prototype.getCancelButton=function(){return null};h.prototype.getFilterSelectedButton=function(){return null};h.prototype.setOkPressHandler=function(){return null};h.prototype.setCancelPressHandler=function(){return null};h.prototype.setShowSelectedPressHandler=function(){return null};h.prototype.resizePopup=function(){};h.prototype._getValueStateHeader=function(){return null};h.prototype._createValueStateHeader=function(){return null};return h});
//# sourceMappingURL=SuggestionsPopover.js.map