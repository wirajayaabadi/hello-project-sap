/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/base/i18n/Localization","sap/ui/core/Renderer","sap/ui/Device"],function(e,t,s,a){"use strict";var n=s.extend(e);n.apiVersion=2;n.renderLIAttributes=function(e,t){e.class("sapMFeedListItemTitleDiv");e.class("sapMFeedListShowSeparatorsAll")};n.renderLIContent=function(e,s){var n=s.getId(),i=a.system.phone;e.openStart("div");e.class("sapMFeedListItem");e.openEnd();if(s.getShowIcon()){this._writeAvatarControl(e,s,n)}if(i){e.openStart("div").class("sapMFeedListItemHeader").class("sapUiSelectable");if(s.getShowIcon()){e.class("sapMFeedListItemHasFigure")}if(s.getSender()&&s.getTimestamp()){e.class("sapMFeedListItemFullHeight")}e.openEnd();if(s.getSender()){e.openStart("p",n+"-name").class("sapMFeedListItemTextName").class("sapUiSelectable").openEnd();e.renderControl(s._getLinkSender(false));e.close("p")}if(s.getTimestamp()){e.openStart("p",n+"-timestamp").class("sapMFeedListItemTimestamp").class("sapUiSelectable").openEnd();e.text(s.getTimestamp());e.close("p")}e.close("div");e.openStart("div").class("sapMFeedListItemText").class("sapUiSelectable").openEnd();this._writeText(e,s,n,i);if(s._checkTextIsExpandable()){this._writeCollapsedText(e,s,n)}else{e.unsafeHtml(s._sFullText);e.close("span")}e.close("div");if(s.getInfo()){e.openStart("p").class("sapMFeedListItemFooter").class("sapUiSelectable").openEnd();if(s.getInfo()){e.openStart("span",n+"-info").class("sapMFeedListItemInfo").class("sapUiSelectable").openEnd();e.text(s.getInfo());e.close("span")}e.close("p")}}else{e.openStart("div").class("sapMFeedListItemText");if(s.getShowIcon()){e.class("sapMFeedListItemHasFigure")}e.openEnd();e.openStart("div",n+"-text").class("sapMFeedListItemTextText").class("sapUiSelectable").openEnd();if(s.getSender()){e.openStart("span",n+"-name").class("sapMFeedListItemTextName").class("sapUiSelectable").openEnd();e.renderControl(s._getLinkSender(true));e.close("span")}this._writeText(e,s,n,i);if(s._checkTextIsExpandable()){this._writeCollapsedText(e,s,n)}else{e.unsafeHtml(s._sFullText);e.close("span")}e.close("div");if(s.getInfo()||s.getTimestamp()){e.openStart("p").class("sapMFeedListItemFooter").class("sapUiSelectable").openEnd();if(!t.getRTL()){if(s.getInfo()){this._writeInfo(e,s,n);if(s.getTimestamp()){e.openStart("span").openEnd();e.text("  ·  ");e.close("span")}}if(s.getTimestamp()){this._writeTimestamp(e,s,n)}}else{if(s.getTimestamp()){this._writeTimestamp(e,s,n)}if(s.getInfo()){if(s.getTimestamp()){e.openStart("span").openEnd();e.text("  ·  ");e.close("span")}this._writeInfo(e,s,n)}}e.close("p")}e.close("div")}if(s.getActions().length>0){var p=s.getActions().every(function(e){return e.getVisible()===false});if(!p){e.openStart("div",n+"-action-button");e.class("sapMFeedListItemActionButton");e.openEnd();e.renderControl(s.getAggregation("_actionButton"));e.close("div")}}e.close("div")};n._writeAvatarControl=function(e,t,s){e.openStart("figure",s+"-figure");e.class("sapMFeedListItemFigure");if(!t.getIcon()){e.class("sapMFeedListItemIsDefaultIcon")}e.openEnd();e.renderControl(t._getAvatar());e.close("figure")};n._writeCollapsedText=function(e,t,s){if(t._bTextExpanded){e.unsafeHtml(t._sFullText);e.close("span");e.openStart("span",s+"-threeDots").class("sapMFeedListItemTextString").openEnd();e.text(" ");e.close("span")}else{e.unsafeHtml(t._sShortText);e.close("span");e.openStart("span",s+"-threeDots").class("sapMFeedListItemTextString").openEnd();e.text(" ... ");e.close("span")}var a=t._getLinkExpandCollapse();a.addStyleClass("sapMFeedListItemLinkExpandCollapse");e.renderControl(a)};n._writeTimestamp=function(e,t,s){e.openStart("span",s+"-timestamp");e.class("sapMFeedListItemTimestampText");e.class("sapUiSelectable");if(t.getUnread()){e.class("sapMFeedListItem-Unread")}e.openEnd();e.text(t.getTimestamp());e.close("span")};n._writeInfo=function(e,t,s){e.openStart("span",s+"-info");e.class("sapMFeedListItemInfoText");e.class("sapUiSelectable");if(t.getUnread()){e.class("sapMFeedListItem-Unread")}e.openEnd();e.text(t.getInfo());e.close("span")};n._writeText=function(e,t,s,a){e.openStart("span",s+"-realtext");e.class(a?"sapMFeedListItemText":"sapMFeedListItemTextString");e.class("sapMFeedListItemText");e.class("sapUiSelectable");if(t.getUnread()){e.class("sapMFeedListItem-Unread")}e.openEnd()};return n},true);
//# sourceMappingURL=FeedListItemRenderer.js.map