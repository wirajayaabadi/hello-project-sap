/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ControlBehavior","./library","./ListBase","./ListItemBase","./CheckBox","./TableRenderer","sap/ui/base/Object","sap/ui/core/ResizeHandler","sap/ui/core/util/PasteHelper","sap/ui/thirdparty/jquery","sap/m/ListBaseRenderer","sap/ui/core/Icon","sap/m/table/Util","sap/ui/core/Lib","sap/base/Log","sap/ui/dom/jquery/Selectors"],function(e,t,i,s,o,n,r,a,l,jQuery,u,p,h,c,d){"use strict";var f=t.ListGrowingDirection;var g=t.BackgroundDesign;var m=t.PopinLayout;var y=t.ScreenSizes;var C=i.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:g.Translucent},fixedLayout:{type:"any",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false},alternateRowColors:{type:"boolean",group:"Appearance",defaultValue:false},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:m.Block},contextualWidth:{type:"string",group:"Behavior",defaultValue:"Inherit"},autoPopinMode:{type:"boolean",group:"Behavior",defaultValue:false},hiddenInPopin:{type:"sap.ui.core.Priority[]",group:"Behavior"}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",dnd:{draggable:true,droppable:true,layout:"Horizontal"}},_noColumnsMessage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ColumnListItem"},column:{type:"sap.m.Column"}}},paste:{allowPreventDefault:true,parameters:{data:{type:"string[][]"}}},popinChanged:{parameters:{hasPopin:{type:"boolean"},visibleInPopin:{type:"sap.m.Column[]"},hiddenInPopin:{type:"sap.m.Column[]"}}}},designtime:"sap/m/designtime/Table.designtime"},renderer:n});C.prototype.sNavItemClass="sapMListTblRow";C.prototype.init=function(){this._iItemNeedsTypeColumn=0;i.prototype.init.call(this)};C.prototype.setContextualWidth=function(e){var t=this.getContextualWidth();if(e==t){return this}if(typeof e==="number"){this._sContextualWidth=e+"px";this._sContextualWidth=this._sContextualWidth.toLowerCase()}else{var i=e.toLowerCase(),s=y[i];if(s){this._sContextualWidth=s+"px"}else{this._sContextualWidth=e}}var o=this._validateContextualWidth(this._sContextualWidth);this._iLastContextualWidth=t;if(o){this.setProperty("contextualWidth",e,true)}else{return this}if(this._iLastContextualWidth.toLowerCase()==="auto"){this._deregisterResizeHandler()}if(this._sContextualWidth.toLowerCase()==="auto"){this._registerResizeHandler();this._applyContextualWidth(this.$().width())}else{this._applyContextualWidth(this._sContextualWidth)}return this};C.prototype._validateContextualWidth=function(e){if(!e){return}if(typeof e!="string"){throw new Error('expected string for property "contextualWidth" of '+this)}if(e.toLowerCase()==="auto"||e.toLowerCase()==="inherit"){return true}if(!/^\d+(\.\d+)?(px)$/i.test(e)){throw new Error('invalid CSS size("px", "Auto", "auto", Inherit", "inherit" required) or sap.m.ScreenSize enumeration for property "contextualWidth" of '+this)}return true};C.prototype._applyContextualWidth=function(e){e=parseFloat(e)||0;if(Math.abs(this._oContextualSettings.contextualWidth-e)<=16){return}if(e&&this._oContextualSettings.contextualWidth!=e){this._applyContextualSettings({contextualWidth:e})}};C.prototype.setNoData=function(e){i.prototype.setNoData.apply(this,arguments);if(e&&typeof e!=="string"&&e.isA("sap.m.IllustratedMessage")){var t=this.getAggregation("_noColumnsMessage");if(!t){t=h.getNoColumnsIllustratedMessage();this.setAggregation("_noColumnsMessage",t)}}else if(e&&(typeof e==="string"||!e.isA("sap.m.IllustratedMessage"))){this.removeAllAggregation("_noColumnsMessage")}if(!this.shouldRenderItems()){if(this.getAggregation("_noColumnsMessage")){this.invalidate()}else{this.$("nodata-text").text(c.getResourceBundleFor("sap.m").getText("TABLE_NO_COLUMNS"))}}return this};C.prototype._onResize=function(e){this._applyContextualWidth(e.size.width)};C.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){var e=this;window.requestAnimationFrame(function(){e._iResizeHandlerId=a.register(e,e._onResize.bind(e))})}};C.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){a.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};C.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.call(this);this._configureAutoPopin();this._applyContextualWidth(this._sContextualWidth);this._notifyColumns("TableRendering")};C.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this);if(this.shouldRenderItems()){var e=this.getNavigationRoot();e.setAttribute("aria-colcount",this._colHeaderAriaOwns.length);e.setAttribute("aria-rowcount",this.getAccessbilityPosition().setsize);if(this._hasPopin){this.getDomRef("tblHeader").setAttribute("aria-owns",this._colHeaderAriaOwns.join(" "))}}if(!this.isPropertyInitial("showOverlay")){this._handleOverlay()}if(this._bFirePopinChanged){this._firePopinChangedEvent()}else{var t=this._getPopins();if(this._aPopins&&this.getVisibleItems().length){if(this._aPopins.length!=t.length||!t.every(function(e){return this._aPopins.indexOf(e)>-1},this)){this._aPopins=t;this._firePopinChangedEvent()}}else if(this._aPopins==null){this._aPopins=t}}if(this._bCheckLastColumnWidth&&h.isThemeApplied()){window.requestAnimationFrame(this._checkLastColumnWidth.bind(this))}};C.prototype.setHiddenInPopin=function(e){var t=this.getHiddenInPopin()||[],i=e||[];this.setProperty("hiddenInPopin",e);if(i.length!==t.length){this._bFirePopinChanged=true}else{this._bFirePopinChanged=!i.every(function(e){return t.includes(e)})}this._aPopins=this._getPopins();return this};C.prototype._handleOverlay=function(){var e=this.$("overlay");if(this.getShowOverlay()){var t=this.getDomRef();if(!e[0]){e=jQuery("<div></div>",{id:this.getId()+"-overlay",class:"sapUiOverlay sapMTableOverlay",role:"region",tabindex:"0","aria-labelledby":[n.getAriaLabelledBy(this),n.getAriaAnnouncement("TABLE_INVALID")].join(" ").trimLeft()}).appendTo(t)}if(t.contains(document.activeElement)){this._bIgnoreFocusIn=true;e.trigger("focus")}}else{if(document.activeElement==e[0]){this.focus()}e.remove()}};C.prototype._checkLastColumnWidth=function(){var e=this.$();var t=this.getTableDomRef();if(!e.length||!t){return}if(e[0].clientWidth<t.clientWidth){e.find(".sapMListTblCell:visible").eq(0).addClass("sapMTableForcedColumn").width("")}this._bCheckLastColumnWidth=false};C.prototype.setShowOverlay=function(e){var t=this.getDomRef()!=null;this.setProperty("showOverlay",e,t);if(t){this._handleOverlay()}return this};C.prototype.exit=function(){i.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null}if(this._clearAllIcon){this._clearAllIcon.destroy();this._clearAllIcon=null}if(this._aPopinHeaders){this._aPopinHeaders.forEach(function(e){e.destroy()});this._aPopinHeaders=null}};C.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return i.prototype.destroyItems.apply(this,arguments)};C.prototype.removeSelections=function(){i.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this};C.prototype.selectAll=function(){i.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this};C.prototype.getColumns=function(e){var t=this.getAggregation("columns",[]);if(e){t.sort(function(e,t){return e.getOrder()-t.getOrder()})}return t};C.prototype.getRenderedColumns=function(){return this.getColumns(true).filter(function(e){return e.getVisible()&&(e.isPopin()||!e.isHidden())}).sort(function(e,t){var i=e.getIndex(),s=t.getIndex(),o=i-s;if(o==0){return 0}if(i<0){return 1}if(s<0){return-1}return o})};C.prototype.setFixedLayout=function(e){if(e==undefined||e=="true"){e=true}else if(e=="false"){e=false}if(typeof e=="boolean"||e=="Strict"){return this.setProperty("fixedLayout",e)}throw new Error('"'+e+'" is an invalid value, expected false, true or "Strict" for the property fixedLayout of '+this)};C.prototype.shouldRenderItems=function(){return this.getColumns().some(function(e){return e.getVisible()})};C.prototype.shouldGrowingSuppressInvalidation=function(){if(this.getAutoPopinMode()){return false}return i.prototype.shouldGrowingSuppressInvalidation.call(this)};C.prototype.onItemTypeColumnChange=function(e,t){this._iItemNeedsTypeColumn+=t?1:-1;if(this._iItemNeedsTypeColumn==1&&t){this._setTypeColumnVisibility(true)}else if(this._iItemNeedsTypeColumn==0){this._setTypeColumnVisibility(false)}};C.prototype.onItemSelectedChange=function(e,t){clearTimeout(this._iSelectAllCheckboxTimer);this._iSelectAllCheckboxTimer=setTimeout(this.updateSelectAllCheckbox.bind(this));i.prototype.onItemSelectedChange.apply(this,arguments)};C.prototype.getTableDomRef=function(){return this.getDomRef("listUl")};C.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody")};C.prototype.onmousedown=function(e){this._bMouseDown=true;var t;var s=e.target.closest(".sapMTblCellFocusable:not([aria-haspopup])");if(s&&!document.activeElement.classList.contains("sapMTblCellFocusable")){t=s.getAttribute("tabindex");s.removeAttribute("tabindex")}setTimeout(function(){this._bMouseDown=false;t&&s.setAttribute("tabindex",t)}.bind(this));i.prototype.onmousedown.apply(this,arguments)};C.prototype.onclick=function(e){if(this.getMultiSelectMode()=="ClearAll"&&this.getDomRef("tblHeadModeCol")?.contains(e.target)&&!this._clearAllIcon?.hasStyleClass("sapMTableDisableClearAll")){this.removeSelections(false,true,false)}};C.prototype._onItemNavigationBeforeFocus=function(e){var t=e.getParameter("event");var i=e.getSource();var s=e.getParameter("index");if(t.type=="mousedown"&&this.getDomRef("tblHeadModeCol")?.contains(t.target)){e.preventDefault();i.setFocusedIndex(s+1);i.getItemDomRefs()[s+1].focus();return}if(this._bMouseDown&&!t.target.hasAttribute("tabindex")){return}var o;var n=-1;var r=this._colHeaderAriaOwns.length+1;if(this._bMouseDown){var a=s-s%r;if(this._headerHidden||a||!this._columnHeadersActive){n=a}}else{var l=i.getItemDomRefs();var u=l[s];if(t.target.classList.contains("sapMTblCellFocusable")){var p=l.indexOf(t.target);if(t.type=="saphome"&&p%r!=1){n=s-s%r+1}else if(t.type=="sapend"&&p%r==r-1){n=p-r+1}else if(t.type.startsWith("sappage")&&p%r!=s%r){n=s-s%r+p%r}}else if(t.target.classList.contains("sapMLIBFocusable")){if(t.type.startsWith("sappage")){n=s-s%r;if(t.type=="sappageup"&&n==0&&i.getFocusedIndex()>r){n=r}}else if(t.type=="saphome"){n=0}else if(t.type=="sapend"){n=l.length-r}}if(n==-1&&u.classList.contains("sapMGHLICell")){n=s-1;o=n+i.getFocusedIndex()%r}}if(n!=-1){t.preventDefault();e.preventDefault();i.setFocusedIndex(n);i.getItemDomRefs()[n].focus();o&&i.setFocusedIndex(o)}};C.prototype.setNavigationItems=function(e){var t=this.getNavigationRoot();var i=t.querySelectorAll(".sapMListTblRow,.sapMGHLI,.sapMTblCellFocusable,.sapMTblItemNav");e.setItemDomRefs(Array.from(i));var s=e.iColumns;var o=this._colHeaderAriaOwns.length+1;var n=Math.min(this.getVisibleItems().length,this.getGrowingThreshold());e.setTableMode(true,false);e.setColumns(o);e.setPageSize(n*o);e.detachEvent("BeforeFocus",this._onItemNavigationBeforeFocus,this);e.attachEvent("BeforeFocus",this._onItemNavigationBeforeFocus,this);e.detachEvent("FocusAgain",this._onItemNavigationBeforeFocus,this);e.attachEvent("FocusAgain",this._onItemNavigationBeforeFocus,this);if(e.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==f.Upwards){e.setFocusedIndex(i.length-o)}else{e.setFocusedIndex(this._headerHidden?0:o)}}else if(e.getFocusedIndex()>=s){e.setFocusedIndex(e.getFocusedIndex()+o-s)}};C.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false}return this.getColumns().some(function(e){return e.getVisible()&&e.getMergeDuplicates()})};C.prototype.onColumnPress=function(e){var t=e.getHeaderMenuInstance();t&&t.openBy(e);if(this.bActiveHeaders&&!t){this.fireEvent("columnPress",{column:e})}};C.prototype.onColumnResize=function(e){this._bFirePopinChanged=true;this.invalidate()};C.prototype._setTypeColumnVisibility=function(e){if(!this._bItemsBeingBound&&!this._bRendering){this.invalidate()}};C.prototype._notifyColumns=function(e,t,i){this.getColumns().forEach(function(s){s["on"+e](t,i)})};C.prototype._getClearAllIcon=function(){if(!this._clearAllIcon){this._clearAllIcon=new p({id:this.getId()+"-clearSelection",src:"sap-icon://clear-all",decorative:true,noTabStop:true}).setParent(this,null,true);this.updateSelectAllCheckbox()}return this._clearAllIcon};C.prototype._getSelectAllCheckbox=function(){if(this.bPreventMassSelection){return}if(!this._selectAllCheckBox){this._selectAllCheckBox=new o({id:this.getId("sa"),activeHandling:false,tooltip:c.getResourceBundleFor("sap.m").getText("TABLE_SELECT_ALL_TOOLTIP")}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true)}else{this.removeSelections(false,true)}},this);this._selectAllCheckBox.useEnabledPropagator(false);this.updateSelectAllCheckbox()}return this._selectAllCheckBox};C.prototype.updateSelectAllCheckbox=function(){if(this.getMode()!=="MultiSelect"){return}h.hideSelectionLimitPopover();if(this._selectAllCheckBox&&this.getMultiSelectMode()!="ClearAll"){var e=this.getItems(),t=this.getSelectedItems().length,i=e.filter(function(e){return e.isSelectable()}).length;var s=e.length>0&&t==i;this.$("tblHeader").find(".sapMTblCellFocusable").addBack().attr("aria-selected",s);this._selectAllCheckBox.setSelected(s)}else if(this._clearAllIcon){this._clearAllIcon.toggleStyleClass("sapMTableDisableClearAll",!this.getSelectedItems().length)}};C.prototype.enhanceAccessibilityState=function(e,t){if(e==this._selectAllCheckBox){t.label=c.getResourceBundleFor("sap.m").getText("TABLE_CHECKBOX_SELECT_ALL")}};C.prototype.getColCount=function(){return this._colCount||0};C.prototype.shouldRenderDummyColumn=function(){return Boolean(this._dummyColumn)};C.prototype.hasPopin=function(){return Boolean(this._hasPopin)};C.prototype.doItemsNeedTypeColumn=function(){return Boolean(this._iItemNeedsTypeColumn)};C.prototype.hasHeaderRow=function(){return!this._headerHidden};C.prototype.isHeaderRowEvent=function(e){var t=this.$("tblHeader");return!!jQuery(e.target).closest(t,this.getTableDomRef()).length};C.prototype.isFooterRowEvent=function(e){var t=this.$("tblFooter");return!!jQuery(e.target).closest(t,this.getTableDomRef()).length};C.prototype.getAccessibilityType=function(){return c.getResourceBundleFor("sap.m").getText("TABLE_ROLE_DESCRIPTION")};C.prototype.getAccessbilityPosition=function(e){var t=i.prototype.getAccessbilityPosition.apply(this,arguments);if(e){t.posinset+=!this._headerHidden}if(t.setsize!=-1){t.setsize+=!this._headerHidden+!!this._hasFooter}return t};C.prototype._setHeaderAnnouncement=function(){var e=c.getResourceBundleFor("sap.m"),t=e.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.getMultiSelectMode()!=="ClearAll"&&this.isAllSelectableSelected()){t+=e.getText("LIST_ALL_SELECTED")}this.getColumns(true).forEach(function(e,i){if(!e.getVisible()||e.isHidden()){return}var o=e.getHeader();if(o&&o.getVisible()){t+=s.getAccessibilityText(o,false,true)+" . "}});this.updateInvisibleText(t)};C.prototype._setFooterAnnouncement=function(){var e=c.getResourceBundleFor("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(t,i){if(!t.getVisible()||t.isHidden()){return}var o=t.getFooter();if(o&&o.getVisible()){var n=t.getHeader();if(n&&n.getVisible()){e+=s.getAccessibilityText(n)+" "}e+=s.getAccessibilityText(o)+" "}});this.updateInvisibleText(e)};C.prototype._setNoColumnsMessageAnnouncement=function(e){if(!this.shouldRenderItems()){var t=this.getNoData();var i=c.getResourceBundleFor("sap.m").getText("TABLE_NO_COLUMNS");if(t&&typeof t!=="string"&&t.isA("sap.m.IllustratedMessage")){i=s.getAccessibilityText(this.getAggregation("_noColumnsMessage"))}this.updateInvisibleText(i,e)}};C.prototype.onsapspace=C.prototype.onsapenter=function(e){if(e.isMarked()){return}if(e.target.id==this.getId("tblHeader")||this.getDomRef("tblHeadModeCol")?.contains(e.target)){e.preventDefault();e.setMarked();var t=this.getMultiSelectMode();if(this._selectAllCheckBox&&t!="ClearAll"){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect()}else if(this._clearAllIcon&&t=="ClearAll"&&!this._clearAllIcon.hasStyleClass("sapMTableDisableClearAll")){this.removeSelections(false,true,false)}}else if(e.target.classList.contains("sapMTblCellFocusable")){e.preventDefault()}};C.prototype.onsaptabprevious=function(e){if(e.target.id===this.getId("overlay")){this._bIgnoreFocusIn=true;this.$().attr("tabindex","-1").trigger("focus").removeAttr("tabindex")}else{i.prototype.onsaptabprevious.apply(this,arguments)}};C.prototype.focus=function(e){this._oFocusInfo=e;i.prototype.focus.apply(this,arguments);delete this._oFocusInfo};C.prototype.getFocusDomRef=function(){var e=this._oFocusInfo&&this._oFocusInfo.targetInfo&&r.isObjectA(this._oFocusInfo.targetInfo,"sap.ui.core.message.Message");if(e){var t=this.$("tblHeader");var s=t.find(".sapMListTblCell:visible");if(s.length){return t[0]}var o=this.$("nodata");if(o.length){return o[0]}}return i.prototype.getFocusDomRef.apply(this,arguments)};C.prototype.onfocusin=function(e){var t=e.target;if(t.id==this.getId("tblHeader")){this._setHeaderAnnouncement();this._setFirstLastVisibleCells(t)}else if(t.id==this.getId("tblFooter")){this._setFooterAnnouncement();this._setFirstLastVisibleCells(t)}else if(t.id==this.getId("nodata")){this._setFirstLastVisibleCells(t)}else if(!this._bIgnoreFocusIn&&this.getShowOverlay()){this._bIgnoreFocusIn=true;this.$("overlay").trigger("focus")}i.prototype.onfocusin.call(this,e);this._setNoColumnsMessageAnnouncement(t)};C.prototype.onThemeChanged=function(){i.prototype.onThemeChanged.call(this);if(this._bCheckLastColumnWidth){this._checkLastColumnWidth()}};C.prototype.onpaste=function(e){if(e.isMarked()||/^(input|textarea)$/i.test(document.activeElement.tagName)){return}var t=l.getPastedDataAs2DArray(e.originalEvent);if(!t||t.length===0||t[0].length===0){return}this.firePaste({data:t})};C.prototype.ondragenter=function(e){var t=e.dragSession;if(!t||!t.getDropControl()||!t.getDropControl().isA("sap.m.Column")){return}t.setIndicatorConfig({height:this.getTableDomRef().clientHeight})};C.prototype._configureAutoPopin=function(){if(!this.getAutoPopinMode()){return}var e=this.getColumns(true).filter(function(e){return e.getVisible()});if(!e.length){return}var t=this.getItems();var i={High:[],Medium:[],Low:[]};e.forEach(function(e){var t=e.getImportance();if(t==="None"){t="Medium"}i[t].push(e)});var s=Object.values(i);var o=s.find(String)[0];s.reduce(function(e,t){return C._updateAccumulatedWidth(t,o,e)},this._getInitialAccumulatedWidth(t))};C.prototype._getInitialAccumulatedWidth=function(e){var i=this.getInset()?4:0;var s=this.$(),o=3;if(s.closest(".sapUiSizeCompact").length||jQuery(document.body).hasClass("sapUiSizeCompact")){o=2}else{var n=false;s.find(".sapMTableTH[aria-hidden=true]:not(.sapMListTblHighlightCol):not(.sapMListTblDummyCell):not(.sapMListTblNavigatedCol)").get().forEach(function(e){var i=jQuery(e).width();if(!n&&i>0){o=i/parseFloat(t.BaseFontSize);n=true}})}var r=u.ModeOrder[this.getMode()]?o:0;var a=e.some(function(e){var t=e.getType();return t==="Detail"||t==="DetailAndActive"||t==="Navigation"})?o:0;return i+r+a+.25};C._updateAccumulatedWidth=function(e,i,s){e.forEach(function(e){var o=e.getWidth();var n=o.replace(/[^a-z]/gi,"");var r=parseFloat(t.BaseFontSize)||16;if(n==="px"){s+=parseFloat(o)/r}else if(n==="em"||n==="rem"){s+=parseFloat(o)}else{s+=e.getAutoPopinWidth()}e.setDemandPopin(e!==i);e.setMinScreenWidth(e!==i?parseFloat(s).toFixed(2)+"rem":"")});return s};C.prototype._getHiddenInPopin=function(){return this._getPopins().filter(function(e){return!e.isPopin()})};C.prototype._getVisiblePopin=function(){return this._getPopins().filter(function(e){return e.isPopin()})};C.prototype._getPopins=function(){return this.getColumns().filter(function(e){return e.getVisible()&&e.getDemandPopin()&&e.isHidden()})};C.prototype._firePopinChangedEvent=function(){this._bFirePopinChanged=false;this._iVisibleItemsLength=this.getVisibleItems().length;this.fireEvent("popinChanged",{hasPopin:this.hasPopin(),visibleInPopin:this._getVisiblePopin(),hiddenInPopin:this._getHiddenInPopin()})};C.prototype._fireUpdateFinished=function(e){i.prototype._fireUpdateFinished.apply(this,arguments);this.updateSelectAllCheckbox();var t=this.getNavigationRoot();if(t){t.setAttribute("aria-rowcount",this.getAccessbilityPosition().setsize)}var s=Boolean(this.getVisibleItems().length);var o=Boolean(this._iVisibleItemsLength);if(s^o){this._firePopinChangedEvent()}};C.prototype.onItemFocusIn=function(t,s){i.prototype.onItemFocusIn.apply(this,arguments);if(t!=s||!e.isAccessibilityEnabled()){return}this._setFirstLastVisibleCells(t.getDomRef())};C.prototype._setFirstLastVisibleCells=function(e,t){var i=jQuery(e);if(!t&&!i.hasClass("sapMTableRowCustomFocus")){return}i.find(".sapMTblLastVisibleCell").removeClass("sapMTblLastVisibleCell");i.find(".sapMTblFirstVisibleCell").removeClass("sapMTblFirstVisibleCell");for(var s=e.firstChild;s&&!s.clientWidth;s=s.nextSibling){}for(var o=e.lastChild.classList.contains("sapMListTblDummyCell")?e.lastChild.previousSibling:e.lastChild;o&&!o.clientWidth;o=o.previousSibling){}jQuery(s).addClass("sapMTblFirstVisibleCell");jQuery(o).addClass("sapMTblLastVisibleCell");var n=i.next();if(n.attr("id")==i.attr("id")+"-sub"){this._setFirstLastVisibleCells(n[0],true)}};C.prototype.getAriaRole=function(){return"grid"};C.prototype._updateAriaRowCount=function(){var e=this.getNavigationRoot();if(!e){return}var t=this.getAccessbilityPosition().setsize;e.setAttribute("aria-rowcount",t)};C.prototype.validateAggregation=function(e,t,s){var o=i.prototype.validateAggregation.apply(this,arguments);if(e==="items"&&!r.isA(t,"sap.m.ITableItem")){d.error(t+" is not a valid items aggregation of "+this+". Items aggregation in ResponsiveTable control only supports ITableItem.");return o}if(e==="items"&&!r.isA(t,"sap.m.ITableItem")){throw Error(t+" is not a valid items aggregation of "+this+". Items aggregation in ResponsiveTable control only supports ITableItem.")}return o};C.prototype.setLastGroupHeader=function(){};return C});
//# sourceMappingURL=Table.js.map