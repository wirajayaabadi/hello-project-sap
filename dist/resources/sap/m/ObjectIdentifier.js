/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./Link","./Text","sap/ui/core/Control","sap/ui/core/ControlBehavior","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/core/Lib","sap/ui/core/library","sap/ui/Device","sap/ui/base/ManagedObject","./ObjectIdentifierRenderer","sap/ui/events/KeyCodes"],function(t,e,i,o,n,r,s,a,l,p,c,g,u){"use strict";var d=l.TextDirection;var h=t.EmptyIndicatorMode;var y=o.extend("sap.m.ObjectIdentifier",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ObjectIdentifier.designtime",properties:{title:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},badgeNotes:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},badgePeople:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},badgeAttachments:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},visible:{type:"boolean",group:"Appearance",defaultValue:true},titleActive:{type:"boolean",group:"Misc",defaultValue:false},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:d.Inherit},emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:h.Off}},aggregations:{_titleControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_textControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{titlePress:{parameters:{domRef:{type:"object"}}}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},dnd:{draggable:true,droppable:false}},renderer:g});y.prototype.init=function(){var t=a.getResourceBundleFor("sap.m");if(n.isAccessibilityEnabled()){y.OI_ARIA_ROLE=t.getText("OI_ARIA_ROLE")}};y.prototype.exit=function(){if(this._attachmentsIcon){this._attachmentsIcon.destroy();this._attachmentsIcon=null}if(this._peopleIcon){this._peopleIcon.destroy();this._peopleIcon=null}if(this._notesIcon){this._notesIcon.destroy();this._notesIcon=null}};y.prototype._getAttachmentsIcon=function(){if(!this._attachmentsIcon){this._attachmentsIcon=this._getIcon(r.getIconURI("attachment"),this.getId()+"-attachments")}return this._attachmentsIcon};y.prototype._getPeopleIcon=function(){if(!this._peopleIcon){this._peopleIcon=this._getIcon(r.getIconURI("group"),this.getId()+"-people")}return this._peopleIcon};y.prototype._getNotesIcon=function(){if(!this._notesIcon){this._notesIcon=this._getIcon(r.getIconURI("notes"),this.getId()+"-notes")}return this._notesIcon};y.prototype._getIcon=function(t,e){var i=p.system.phone?"1em":"1em";var o;o=this._icon||r.createControlByURI({src:t,id:e+"-icon",size:i,useIconTooltip:false},sap.m.Image);o.setSrc(t);return o};y.prototype._getTitleControl=function(){var t=this.getAggregation("_titleControl"),o=this.getId(),n=c.escapeSettingsValue(this.getProperty("title")),r;if(!t){if(this.getProperty("titleActive")){r=this.getAriaLabelledBy().slice();r.push(s.getStaticId("sap.m","OI_ARIA_ROLE"));t=new e({id:o+"-link",text:n,ariaLabelledBy:r});t.addAriaLabelledBy(o+"-text")}else{t=new i({id:o+"-txt",text:n})}this.setAggregation("_titleControl",t,true)}return t};y.prototype.setTitleControl=function(t){this.setAggregation("_titleControl",t);return this};y.prototype.getTitleControl=function(t){return this._getTitleControl()};y.prototype._getTextControl=function(){var t=this.getAggregation("_textControl");if(!t){t=new i({text:c.escapeSettingsValue(this.getProperty("text"))});this.setAggregation("_textControl",t,true)}t.setTextDirection(this.getTextDirection());return t};y.prototype.setTitle=function(t){if(t){this._getTitleControl().setProperty("text",t)}return this.setProperty("title",t)};y.prototype.setText=function(t){if(t){this._getTextControl().setProperty("text",t)}return this.setProperty("text",t)};y.prototype.setTitleActive=function(t){var e=this.getTitleActive();this.setProperty("titleActive",t);if(e!=t){this.destroyAggregation("_titleControl");this._getTitleControl()}return this};y.prototype._handlePress=function(t){if(!this.getTitleActive()){return}const e=t.target;const i=this.getTitleControl().getDomRef();const o=e.parentElement.id===i.id||e.id===i.id;if(o){this.fireTitlePress({domRef:i});t.setMarked()}};y.prototype.onsapenter=function(t){y.prototype._handlePress.apply(this,arguments)};y.prototype.onkeyup=function(t){if(t&&t.which===u.SPACE){y.prototype._handlePress.apply(this,arguments)}};y.prototype.ontap=function(t){y.prototype._handlePress.apply(this,arguments)};y.prototype.addAssociation=function(t,i,n){var r=this.getAggregation("_titleControl");if(t==="ariaLabelledBy"){if(this.getTitleActive()&&r instanceof e){r.addAriaLabelledBy(i)}}return o.prototype.addAssociation.apply(this,arguments)};y.prototype.removeAssociation=function(t,i,n){var r=this.getAggregation("_titleControl");if(t==="ariaLabelledBy"){if(this.getTitleActive()&&r instanceof e){r.removeAssociation("ariaLabelledBy",i,true)}}return o.prototype.removeAssociation.apply(this,arguments)};y.prototype.getAccessibilityInfo=function(){var t=this.getAggregation("_titleControl")?this.getAggregation("_titleControl").getAccessibilityInfo():{type:"",description:""},e=(y.OI_ARIA_ROLE+" "+(t.type||"")).trim();if(this.getTitle()||this.getText()){t.type=e}t.description=t.description+" "+this.getText();return t};y.prototype._hasTopRow=function(){return this.getTitle()||this.getBadgeNotes()||this.getBadgePeople()||this.getBadgeAttachments()};return y});
//# sourceMappingURL=ObjectIdentifier.js.map