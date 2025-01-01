/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./library","./FacetFilterItemRenderer"],function(t,e,n){"use strict";var r=t.extend("sap.m.FacetFilterItem",{metadata:{library:"sap.m",properties:{key:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},count:{type:"int",group:"Misc",defaultValue:null,deprecated:true}}},renderer:n});r.prototype.setCount=function(t){this.setProperty("count",t);this.setProperty("counter",t);return this};r.prototype.setCounter=function(t){this.setProperty("count",t);this.setProperty("counter",t);return this};r.prototype.init=function(){this.attachEvent("_change",this._itemTextChange);t.prototype.init.apply(this);this.addStyleClass("sapMFFLI")};r.prototype.exit=function(){t.prototype.exit.apply(this);this.detachEvent("_change",this._itemTextChange)};r.prototype.getContentAnnouncement=function(t){return this.getText()?this.getText().concat(" . "):""};r.prototype._itemTextChange=function(t){if(t.getParameter("name")==="text"){this.informList("TextChange",t.getParameter("newValue"))}};return r});
//# sourceMappingURL=FacetFilterItem.js.map