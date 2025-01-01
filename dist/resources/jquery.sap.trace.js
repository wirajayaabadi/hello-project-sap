/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/performance/trace/Passport","sap/ui/performance/trace/Interaction","sap/ui/performance/trace/FESR","sap/base/Log","sap/base/config","sap/ui/Global"],function(jQuery,t,e,a,n,r){"use strict";function i(){if(!(performance&&performance.getEntries)){n.warning("Interaction tracking is not supported on browsers with insufficient performance API")}}jQuery.sap.interaction={};jQuery.sap.interaction.setActive=function(t){i();return e.setActive.apply(this,arguments)};jQuery.sap.interaction.getActive=()=>e.getActive();jQuery.sap.interaction.notifyStepStart=(t,a,n)=>{e.notifyStepStart(t,a,n)};jQuery.sap.interaction.notifyStepEnd=()=>{e.notifyStepEnd()};jQuery.sap.interaction.notifyEventStart=t=>{e.notifyEventStart(t)};jQuery.sap.interaction.notifyScrollEvent=t=>{e.notifyScrollEvent(t)};jQuery.sap.interaction.notifyEventEnd=()=>{e.notifyEventEnd()};jQuery.sap.interaction.setStepComponent=()=>{e.setStepComponent()};jQuery.sap.fesr={};jQuery.sap.fesr.setActive=function(t){i();return a.setActive.apply(this,arguments)};jQuery.sap.fesr.getActive=()=>a.getActive();jQuery.sap.fesr.getCurrentTransactionId=()=>t.getTransactionId();jQuery.sap.fesr.getRootId=()=>t.getRootId();jQuery.sap.fesr.addBusyDuration=t=>{e.addBusyDuration(t)};jQuery.sap.passport={};jQuery.sap.passport.setActive=t.setActive;jQuery.sap.passport.traceFlags=t.traceFlags;a.setActive(r.get({name:"sapUiFesr",type:r.Type.Boolean,external:true,freeze:true}));if(r.get({name:"sapUiXxE2eTrace",type:r.Type.Boolean,external:true,freeze:true})){sap.ui.requireSync("sap/ui/core/support/trace/E2eTraceLib")}return jQuery});
//# sourceMappingURL=jquery.sap.trace.js.map