/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var a={"grandTotal":"boolean","max":"boolean","min":"boolean","name":"string","subtotals":"boolean","with":"string"},A={aggregate:"object",group:"object",groupLevels:"array"},_;function c(d,m,n){var k;function e(M){if(n){M+=" at property: "+n;}throw new Error(M);}function t(v){return Array.isArray(v)?"array":typeof v;}for(k in d){if(!(m&&k in m)){e("Unsupported '"+k+"'");}else if(t(d[k])!==m[k]){e("Not a "+m[k]+" value for '"+k+"'");}}}function b(m,d){var n;for(n in m){c(m[n],d,n);}}_={buildApply:function(o,q,m,f){var d,s="",C=[],g,h,S;function e(j){var D=o.aggregate[j],k=D.name||j,G=j,w=D.with;if(w){if((w==="average"||w==="countdistinct")&&(D.grandTotal||D.subtotals)){throw new Error("Cannot aggregate totals with '"+w+"'");}k+=" with "+w+" as "+j;}else if(D.name){k+=" as "+j;}if(!f){if(D.min){p(j,"min");}if(D.max){p(j,"max");}}if(D.grandTotal){h=true;if(!q.$skip){if(w){G+=" with "+w+" as UI5grand__"+j;}C.push(G);}}return k;}function n(G){return o.groupLevels.indexOf(G)<0;}function p(N,M){var j="UI5"+M+"__"+N;C.push(N+" with "+M+" as "+j);if(m){m[j]={measure:N,method:M};}}function i(){var t="";if(q.$skip){t="skip("+q.$skip+")";}delete q.$skip;if(q.$top<Infinity){if(t){t+="/";}t+="top("+q.$top+")";}delete q.$top;return t;}q=jQuery.extend({},q);c(o,A);o.groupLevels=o.groupLevels||[];if(o.groupLevels.length>1){throw new Error("More than one group level: "+o.groupLevels);}o.aggregate=o.aggregate||{};b(o.aggregate,a);d=Object.keys(o.aggregate).sort().map(e);if(h&&o.groupLevels.length){throw new Error("Cannot combine visual grouping with grand total");}if(d.length){s="aggregate("+d.join(",")+")";}o.group=o.group||{};b(o.group);g=o.groupLevels.concat(Object.keys(o.group).sort().filter(n));if(g.length){s="groupby(("+g.join(",")+(s?"),"+s+")":"))");}if(f){delete q.$count;}else if(q.$count){C.push("$count as UI5__count");delete q.$count;}if(q.$filter){s+="/filter("+q.$filter+")";delete q.$filter;}if(q.$orderby){s+="/orderby("+q.$orderby+")";delete q.$orderby;}if(h){if(q.$skip){q.$skip-=1;}else{q.$top-=1;}}S=i();if(C.length){s+="/concat(aggregate("+C.join(",")+"),"+(S||"identity")+")";}else if(S){s+="/"+S;}q.$apply=s;return q;},hasGrandTotal:function(m){return!!m&&Object.keys(m).some(function(s){return m[s].grandTotal;});},hasMinOrMax:function(m){return!!m&&Object.keys(m).some(function(s){var d=m[s];return d.min||d.max;});}};return _;},false);
