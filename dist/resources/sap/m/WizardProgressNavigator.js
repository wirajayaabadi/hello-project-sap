/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Lib","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/Device","sap/m/ActionSheet","sap/ui/core/InvisibleText","./WizardProgressNavigatorRenderer","./Button","sap/ui/thirdparty/jquery"],function(t,e,i,s,r,a,p,n,o,S,jQuery){"use strict";var h=e.extend("sap.m.WizardProgressNavigator",{metadata:{properties:{stepCount:{type:"int",group:"Data",defaultValue:3},stepTitles:{type:"string[]",group:"Appearance",defaultValue:[]},stepIcons:{type:"sap.ui.core.URI[]",group:"Appearance",defaultValue:[]},varyingStepCount:{type:"boolean",group:"Appearance",defaultValue:false}},events:{stepChanged:{parameters:{current:{type:"int"}}}}},renderer:o});h.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,MIN_STEP_WIDTH_NO_TITLE:64,MIN_STEP_WIDTH_WITH_TITLE:200};h.TEXT={STEP:"WIZARD_PROG_NAV_STEP_TITLE",OPTIONAL_STEP:"WIZARD_STEP_OPTIONAL_STEP_TEXT"};h.prototype.init=function(){this._iCurrentStep=1;this._iActiveStep=1;this._aCachedSteps=[];this._aStepOptionalIndication=[];this._oResourceBundle=i.getResourceBundleFor("sap.m");this._oActionSheet=new p;this._aStepIds=[];this._createStepNavigation()};h.prototype.onBeforeRendering=function(){if(this.getStepCount()!==this.getStepIcons().filter(String).length){this.setStepIcons([])}if(this.getStepCount()!==this.getStepTitles().filter(String).length){this.setStepTitles([])}};h.prototype.onAfterRendering=function(){var t,e=this._iActiveStep-1,i=this._iCurrentStep-1;this._cacheDOMElements();this._updateStepZIndex();this._updateStepNavigation(e);this._updateStepActiveAttribute(e);this._updateStepCurrentAttribute(i);this._updateStepAriaCurrentAttribute(i);this._updateOpenSteps();s.register(this.getDomRef(),this._updateOpenSteps.bind(this));if(a.os.name===a.os.OS.IOS){t=this.$().find(".sapMWizardProgressNavStep").css("display","block");setTimeout(t["css"].bind(t,"display",""),0)}};h.prototype.ontap=function(t){if(this._isGroupAtStart(t.target)){return this._showActionSheet(t.target,true)}if(this._isGroupAtEnd(t.target)){return this._showActionSheet(t.target,false)}if(!this._isOpenStep(t.target)||!this._isActiveStep(this._getStepNumber(t.target))){return}this._updateCurrentStep(this._getStepNumber(t.target));this.fireStepChanged({current:this._getStepNumber(t.target)})};h.prototype.onsapspace=function(t){t.preventDefault();if(this._onEnter){this._onEnter(t,this._oStepNavigation.getFocusedIndex())}this.ontap(t)};h.prototype.onsapenter=h.prototype.onsapspace;h.prototype.exit=function(){s.deregisterAllForControl(this.getId());this.removeDelegate(this._oStepNavigation);this._oStepNavigation.destroy();this._oStepNavigation=null;if(this._oActionSheetInvisibleText){this._oActionSheetInvisibleText.destroy();this._oActionSheetInvisibleText=null}this._oActionSheet.destroy();this._oActionSheet=null;this._iCurrentStep=null;this._iActiveStep=null;this._aCachedSteps=null;this._aStepIds=null;this._aStepOptionalIndication=null};h.prototype.getCurrentStep=function(){return this._iCurrentStep};h.prototype.getProgress=function(){return this._iActiveStep};h.prototype.previousStep=function(){var t=this.getCurrentStep();if(t<2){return this}return this._moveToStep(t-1)};h.prototype.nextStep=function(){return this._moveToStep(this.getCurrentStep()+1)};h.prototype.incrementProgress=function(){return this._moveToStep(this.getProgress()+1)};h.prototype.discardProgress=function(t){if(t<=0||t>this._iActiveStep){return this}this._updateCurrentStep(t,this._iCurrentStep);this._updateStepActiveAttribute(t-1,this._iActiveStep-1);this._updateStepNavigation(t-1);this._iCurrentStep=t;this._iActiveStep=t};h.prototype._setOnEnter=function(t){this._onEnter=t};h.prototype._createStepNavigation=function(){var t=this;this._oStepNavigation=new r;this._oStepNavigation.setCycling(false);this._oStepNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this._oStepNavigation.attachEvent("AfterFocus",function(e){var i=e.mParameters.oEvent;if(!i||!i.relatedTarget||jQuery(i.relatedTarget).hasClass(o.CLASSES.STEP)){return}t._oStepNavigation.focusItem(t._iCurrentStep-1)});this.addDelegate(this._oStepNavigation)};h.prototype._cacheDOMElements=function(){var t=this.getDomRef();this._aCachedSteps=t.querySelectorAll("."+o.CLASSES.STEP)};h.prototype._updateStepZIndex=function(){var t=this._iCurrentStep-1,e=this._aCachedSteps.length,i=h.CONSTANTS.MAXIMUM_STEPS;for(var s=0;s<e;s++){if(s<=t){this._aCachedSteps[s].style.zIndex=0}else{this._aCachedSteps[s].style.zIndex=i;i-=1}}};h.prototype._updateStepNavigation=function(t){var e=this.getDomRef(),i=[];for(var s=0;s<=t;s++){if(this._aCachedSteps[s]){i.push(this._aCachedSteps[s])}}this._oStepNavigation.setRootDomRef(e);this._oStepNavigation.setItemDomRefs(i);this._oStepNavigation.setPageSize(t);this._oStepNavigation.setFocusedIndex(t)};h.prototype._updateStepActiveAttribute=function(t,e){if(e!==undefined&&this._aCachedSteps[e]){this._aCachedSteps[e].removeAttribute(o.ATTRIBUTES.ACTIVE_STEP)}if(this._aCachedSteps[t]){this._aCachedSteps[t].setAttribute(o.ATTRIBUTES.ACTIVE_STEP,true)}};h.prototype._updateStepCurrentAttribute=function(t,e){if(e!==undefined&&this._aCachedSteps[e]){this._aCachedSteps[e].removeAttribute(o.ATTRIBUTES.CURRENT_STEP)}if(this._aCachedSteps[t]){this._aCachedSteps[t].setAttribute(o.ATTRIBUTES.CURRENT_STEP,true)}};h.prototype._updateStepAriaCurrentAttribute=function(t,e){var i=this._aCachedSteps[t];if(e!==undefined&&this._aCachedSteps[e]){this._aCachedSteps[e].removeAttribute(o.ATTRIBUTES.ARIA_CURRENT)}if(i){i.setAttribute(o.ATTRIBUTES.ARIA_CURRENT,true)}};h.prototype._updateStepAriaLabelAttribute=function(t){var e=this._aCachedSteps[t];var i=this._isActiveStep(t)?"ACTIVE":"INACTIVE";var s=this._aStepOptionalIndication[t]?this._oResourceBundle.getText("WIZARD_STEP_OPTIONAL_STEP_TEXT"):"";var r=this._oResourceBundle.getText("WIZARD_STEP_"+i+"_LABEL",[t+1,this.getStepTitles()[t],s]);if(e){e.setAttribute(o.ATTRIBUTES.ARIA_LABEL,r)}};h.prototype._moveToStep=function(t){var e=this.getStepCount(),i=this.getCurrentStep();if(t>e){return this}if(t>this._iActiveStep){this._updateActiveStep(t)}return this._updateCurrentStep(t,i)};h.prototype._updateActiveStep=function(t,e){var i=t-1,s=(e||this._iActiveStep)-1;this._iActiveStep=t;this._updateStepNavigation(i);this._updateStepActiveAttribute(i,s);this._updateStepAriaLabelAttribute(i)};h.prototype._updateCurrentStep=function(t,e){var i=t-1,s=(e||this.getCurrentStep())-1;this._iCurrentStep=t;this._updateStepZIndex();this._updateOpenSteps();this._updateStepCurrentAttribute(i,s);this._updateStepAriaCurrentAttribute(i,s);return this};h.prototype._updateOpenSteps=function(){var t=this.$().width(),e=this._iCurrentStep-1,i=0,s=true,r=this.getStepTitles().length?Math.floor(t/h.CONSTANTS.MIN_STEP_WIDTH_WITH_TITLE):Math.floor(t/h.CONSTANTS.MIN_STEP_WIDTH_NO_TITLE);if(!this._aCachedSteps){return}[].forEach.call(this._aCachedSteps,function(t){t.setAttribute(o.ATTRIBUTES.OPEN_STEP,false);t.setAttribute(o.ATTRIBUTES.OPEN_STEP_PREV,false);t.setAttribute(o.ATTRIBUTES.OPEN_STEP_NEXT,false)});if(this._aCachedSteps[e]){this._aCachedSteps[e].setAttribute(o.ATTRIBUTES.OPEN_STEP,true)}for(var a=1;a<r;a++){if(s){i+=1}if(s&&this._aCachedSteps[e+i]){this._aCachedSteps[e+i].setAttribute(o.ATTRIBUTES.OPEN_STEP,true);s=!s}else if(!s&&this._aCachedSteps[e-i]){this._aCachedSteps[e-i].setAttribute(o.ATTRIBUTES.OPEN_STEP,true);s=!s}else if(this._aCachedSteps[e+i+1]){i+=1;this._aCachedSteps[e+i].setAttribute(o.ATTRIBUTES.OPEN_STEP,true);s=true}else if(this._aCachedSteps[e-i]){this._aCachedSteps[e-i].setAttribute(o.ATTRIBUTES.OPEN_STEP,true);i+=1;s=false}}for(a=0;a<this._aCachedSteps.length;a++){if(this._aCachedSteps[a].getAttribute(o.ATTRIBUTES.OPEN_STEP)=="true"&&this._aCachedSteps[a-1]&&this._aCachedSteps[a-1].getAttribute(o.ATTRIBUTES.OPEN_STEP)=="false"){this._aCachedSteps[a-1].setAttribute(o.ATTRIBUTES.OPEN_STEP_PREV,true)}if(this._aCachedSteps[a].getAttribute(o.ATTRIBUTES.OPEN_STEP)=="false"&&this._aCachedSteps[a-1]&&this._aCachedSteps[a-1].getAttribute(o.ATTRIBUTES.OPEN_STEP)=="true"){this._aCachedSteps[a].setAttribute(o.ATTRIBUTES.OPEN_STEP_NEXT,true);break}}};h.prototype._isGroupAtStart=function(t){var e=jQuery(t).closest("."+o.CLASSES.STEP);var i=this._getStepNumber(e);return e.attr(o.ATTRIBUTES.OPEN_STEP_PREV)==="true"&&i>1};h.prototype._isGroupAtEnd=function(t){var e=jQuery(t).closest("."+o.CLASSES.STEP);var i=this._getStepNumber(e);return e.attr(o.ATTRIBUTES.OPEN_STEP_NEXT)==="true"&&i<this._aCachedSteps.length};h.prototype._showActionSheet=function(t,e){var i=e?0:this._getStepNumber(t)-1;var s=e?this._getStepNumber(t):this._aCachedSteps.length;var r,a,p,o,h,u,_;this._oActionSheetInvisibleText=new n({text:this._oResourceBundle.getText("WIZARD_STEPS")}).toStatic();this._oActionSheet.removeAllButtons();for(var T=i;T<s;T++){r=this.getStepIcons()[T];a=T+1+".";h=this._aCachedSteps[T].querySelector(".sapMWizardProgressNavStepTitle");p=h&&h.textContent;o=a+" "+p;this._oActionSheet.addButton(new S({text:o,icon:r,enabled:this._iActiveStep>=T+1,press:function(t){this._moveToStep(t);this.fireStepChanged({current:t})}.bind(this,T+1)}))}this._oActionSheet.openBy(t);_=this._oActionSheetInvisibleText.getId();u=this._oActionSheet.getParent();if(u&&u.getAriaLabelledBy().indexOf(_)===-1){u.addAriaLabelledBy(_)}};h.prototype._isOpenStep=function(t){var e=jQuery(t).closest("."+o.CLASSES.STEP);return e.attr(o.ATTRIBUTES.OPEN_STEP)==="true"||e.attr(o.ATTRIBUTES.OPEN_STEP)==="false"&&e.attr(o.ATTRIBUTES.OPEN_STEP_PREV)==="true"||e.attr(o.ATTRIBUTES.OPEN_STEP)==="false"&&e.attr(o.ATTRIBUTES.OPEN_STEP_NEXT)==="true"};h.prototype._isActiveStep=function(t){return t<=this._iActiveStep};h.prototype._getStepNumber=function(t){var e=jQuery(t).closest("."+o.CLASSES.STEP).attr(o.ATTRIBUTES.STEP);return parseInt(e)};h.prototype._setStepIds=function(t){if(!t.length){return}this._aStepIds=t.map(function(t){return t.getId()})};return h});
//# sourceMappingURL=WizardProgressNavigator.js.map