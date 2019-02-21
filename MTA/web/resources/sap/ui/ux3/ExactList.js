/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/commons/ListBox','sap/ui/core/Control','sap/ui/core/Popup','sap/ui/core/theming/Parameters','./library','./ExactListRenderer','sap/ui/core/delegate/ItemNavigation','sap/ui/ux3/ExactAttribute','sap/ui/core/ListItem','sap/ui/dom/getScrollbarSize','sap/ui/events/KeyCodes','sap/ui/dom/containsOrEquals','sap/ui/events/ControlEvents','sap/ui/Device','sap/base/security/encodeXML'],function(q,L,C,P,a,l,E,I,b,c,g,K,d,e,D,f){"use strict";var h=l.ExactOrder;var j=C.extend("sap.ui.ux3.ExactList",{metadata:{library:"sap.ui.ux3",properties:{showClose:{type:"boolean",group:"Misc",defaultValue:false},topTitle:{type:"string",group:"Misc",defaultValue:null},topHeight:{type:"int",group:"Appearance",defaultValue:290}},aggregations:{subLists:{type:"sap.ui.ux3.ExactList",multiple:true,singularName:"subList"},controls:{type:"sap.ui.commons.ListBox",multiple:true,singularName:"control",visibility:"hidden"}},associations:{data:{type:"sap.ui.ux3.ExactAttribute",multiple:false}},events:{attributeSelected:{parameters:{attribute:{type:"sap.ui.ux3.ExactAttribute"},allAttributes:{type:"object"}}}}}});L.extend("sap.ui.ux3.ExactList.LB",{init:function(){L.prototype.init.apply(this,arguments);this.setAllowMultiSelect(true);this.setDisplayIcons(true);this.addStyleClass("sapUiUx3ExactLstLb");},invalidate:function(){L.prototype.invalidate.apply(this,arguments);if(!this.bInvalidated&&this.getParent()){this.getParent().invalidate();}this.bInvalidated=true;},_handleUserActivation:function(i){i.metaKey=true;L.prototype._handleUserActivation.apply(this,[i]);},onclick:function(i){L.prototype.onclick.apply(this,arguments);this.getParent().onclick(i);},onAfterRendering:function(){L.prototype.onAfterRendering.apply(this,arguments);this.bInvalidated=false;var s=this.getParent();var S=this.getItems();var T=s._isTop();var U=false;for(var i=0;i<S.length;i++){var V=S[i];var W=sap.ui.getCore().byId(V.getKey());var X=V.$();U=false;if(T||(!W||!W.getShowSubAttributesIndicator_Computed())){X.addClass("sapUiUx3ExactLstNoIco");U=T;}else{U=true;}if(U&&!T){X.attr("aria-label",s._rb.getText(X.hasClass("sapUiLbxISel")?"EXACT_LST_LIST_ITEM_SEL_ARIA_LABEL":"EXACT_LST_LIST_ITEM_ARIA_LABEL",[V.getText()]));}}var Y=s._bRTL?"left":"right";q(".sapUiLbxITxt",this.getDomRef()).css("margin-"+Y,20+g().width+"px");q(".sapUiLbxIIco",this.getDomRef()).css(Y,5+g().width+"px");q(this.getDomRef()).attr("tabindex","-1");var Z;if(T){Z=s.getTopTitle();}else{Z=s._rb.getText("EXACT_LST_LIST_ARIA_LABEL",[s._iLevel,s._getAtt().getText()]);}q(this.getFocusDomRef()).attr("aria-label",Z).attr("aria-expanded","true");this.oItemNavigation.iActiveTabIndex=-1;this.oItemNavigation.setSelectedIndex(-1);this.oItemNavigation.onsapnext=function($){if($.keyCode!=K.ARROW_DOWN){return;}I.prototype.onsapnext.apply(this,arguments);};this.oItemNavigation.onsapprevious=function($){if($.keyCode!=K.ARROW_UP){return;}I.prototype.onsapprevious.apply(this,arguments);};},renderer:"sap.ui.commons.ListBoxRenderer"});j.prototype.init=function(){var i=this;this._iLevel=0;this._bCollapsed=false;this._bIsFirstRendering=true;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._lb=new j.LB(this.getId()+"-lb",{select:function(s){z(i);var S=s.getParameter("selectedItem").getKey();var T=sap.ui.getCore().byId(S);var U=s.getParameter("selectedIndex");if(i._lb.isIndexSelected(U)){T.setProperty("selected",true,true);var V=M(i,T);if(V){var W=r(i,T);if(W<0){i.addSubList(V);}else{i.insertSubList(V,W);}}}else{N(i,T,U);}Q(i)._selectionChanged(T);}});this.addAggregation("controls",this._lb);this._closeHandle=q.proxy(this.onForceVerticalClose,this);};j.prototype.exit=function(){if(this.bIsDestroyed){return;}O(this);this._lb.removeAllItems();this._lb=null;this._closeHandle=null;this._scrollCheckHandle=null;this._rb={getText:function(){return"";}};this._oTopList=null;if(this._dirtyListsCleanupTimer){clearTimeout(this._dirtyListsCleanupTimer);this._dirtyListsCleanupTimer=null;this._dirtyLists=null;}};j.prototype.getFocusDomRef=function(){if(this._isTop()&&this.$().hasClass("sapUiUx3ExactLstTopHidden")){return this.getDomRef("foc");}return this._bCollapsed?this.getDomRef("head"):this._lb.getFocusDomRef();};j.prototype.onBeforeRendering=function(){this._oTopList=null;if(!this._bIsFirstRendering){return;}this._bRTL=sap.ui.getCore().getConfiguration().getRTL();if(!this._isTop()){this._bCollapsed=true;this._oCollapseStyles={"cntnt":"margin-"+(this._bRTL?"right":"left")+":"+a.get("sapUiUx3ExactLstCollapseWidth")+";border-top-width:0px;","lst":"width:0px;"};}else{this._bIsFirstRendering=false;}};j.prototype.onAfterRendering=function(){var i=this;var s=this._isTop();if(!this._iCurrentWidth){this._iCurrentWidth=this._getAtt().getWidth();}if(s){this._iScrollWidthDiff=-1;this.onCheckScrollbar();this.$("lst").css("bottom",g().height+"px");this.$("cntnt").bind("scroll",function(S){if(S.target.id===i.getId()+"-cntnt"&&S.target.scrollTop!=0){S.target.scrollTop=0;}});}if(!this._bCollapsed){y(this,this._iCurrentWidth);}z(this);if(this._bIsFirstRendering){this._bIsFirstRendering=false;F(this,false,null,true);}else{t(this);G(this);}if(this._bRefreshList){this._bRefreshList=false;setTimeout(function(){i._lb.invalidate();},0);}};j.prototype.onfocusin=function(i){if(i.target===this.getDomRef()){this.getFocusDomRef().focus();}var $=this.$("head");if(this._isTop()){$.attr("tabindex","-1");this.$("foc").attr("tabindex","-1");if(!o(this)&&i.target===$[0]){this.getFocusDomRef().focus();}if(this.$().hasClass("sapUiUx3ExactLstTopHidden")&&i.target===this.getDomRef("foc")){var s=this.getSubLists();if(s.length>0){s[0].getFocusDomRef().focus();}}}if(!i.__exactHandled){$.addClass("sapUiUx3ExactLstHeadFocus");i.__exactHandled=true;}};j.prototype.onfocusout=function(i){var $=this.$("head");if(this._isTop()){$.attr("tabindex","0");this.$("foc").attr("tabindex","0");}$.removeClass("sapUiUx3ExactLstHeadFocus");};j.prototype.onclick=function(i){var s=this._lb.getScrollTop();if(q(i.target).attr("id")==this.getId()+"-exp"){H(this);this.focus();i.stopPropagation();}else if(q(i.target).attr("id")==this.getId()+"-close"){J(this);}else if(q(i.target).attr("id")==this.getId()+"-hide"){F(this,!this._bCollapsed,i);}else if(this._isTop()&&o(this)&&d(this.$("head")[0],i.target)){n(this,i,false);return;}else if(!d(this.$("cntnt")[0],i.target)){this.focus();}this._lb.setScrollTop(s);};j.prototype.onkeydown=function(i){function _(i,T){if(q(T).hasClass("sapUiUx3ExactLstFoc")){return;}if(T){T.focus();}i.preventDefault();i.stopPropagation();}switch(i.keyCode){case K.ENTER:case K.SPACE:if(this._isTop()&&o(this)&&d(this.$("head")[0],i.target)){n(this,i,true);}break;case K.DELETE:if(!this._isTop()&&this.getShowClose()){J(this);_(i,this.getParent().getFocusDomRef());}break;case K.NUMPAD_MINUS:if(i.shiftKey){if(!this._bCollapsed){y(this,this._iCurrentWidth-10);_(i);}}else if(!this._bCollapsed){F(this,true,i);}break;case K.NUMPAD_PLUS:if(i.shiftKey){if(!this._bCollapsed){y(this,this._iCurrentWidth+10);_(i);}}else if(this._bCollapsed){F(this,false,i);}break;case K.TAB:if(this._iLevel==0){var s=o(this);if(!i.shiftKey&&s&&d(this.$("head")[0],i.target)){_(i,this.getFocusDomRef());}else if(d(this.getFocusDomRef(),i.target)){if(i.shiftKey&&s){_(i,this.$("head")[0]);}else if(!i.shiftKey){var S=m(this);if(S){_(i,S.getFocusDomRef());}}}return;}if(this._iLevel==1){var S=null;if(i.shiftKey){if(d(this.$("cntnt")[0],i.target)){S=this;}else{S=k(this);}}else{S=m(this);}if(S){_(i,S.getFocusDomRef());}i.stopPropagation();}break;case K.ARROW_LEFT:case K.ARROW_RIGHT:var S=null;if(this._iLevel>=1){if((this._bRTL&&i.keyCode===K.ARROW_LEFT)||(!this._bRTL&&i.keyCode===K.ARROW_RIGHT)){S=m(this,true);}else{S=k(this,true);}if(S){_(i,S.getFocusDomRef());}i.stopPropagation();}break;}};j.prototype.onmousedown=function(i){if(i.target.id===this.getId()+"-rsz"){q(document.body).append("<div id=\""+this.getId()+"-ghost\" class=\"sapUiUx3ExactLstRSzGhost\" style =\" z-index:"+P.getNextZIndex()+"\" ></div>");q(document.body).bind("selectstart."+this.getId(),v);var s=D.browser.msie?q(document.body):this.$("ghost");s.bind("mouseup."+this.getId(),q.proxy(x,this)).bind("mousemove."+this.getId(),q.proxy(w,this));this._iStartDragX=i.pageX;this._iStartWidth=this.$("lst").width();this.$("rsz").addClass("sapUiUx3ExactLstRSzDrag");}};j.prototype.onForceVerticalClose=function(i){if(i.type=="mousedown"||i.type=="click"||i.type=="dblclick"||i.type=="focusin"||i.type=="focusout"||i.type=="keydown"||i.type=="keypress"||i.type=="keyup"||i.type=="mousedown"||i.type=="mouseup"){var s=this.$("lst");if(!d(s[0],i.target)||i.target.tagName=="BODY"){if(s.hasClass("sapUiUx3ExactLstExpanded")){this._oPopup.close(true);}}}};j.prototype.onCheckScrollbar=function(i){this._scrollCheckTimer=null;var s=this.$("cntnt");var S=s[0];if(S){var T=S.scrollWidth-S.clientWidth;if(this._iScrollWidthDiff!=T){this._iScrollWidthDiff=T;if(T<=0){s.css({"overflow-x":"hidden","bottom":g().height+"px"});}else{s.css({"overflow-x":"scroll","bottom":"0px"});}}this._scrollCheckTimer=setTimeout(this.onCheckScrollbar.bind(this),300);}};j.prototype.insertSubList=function(s,i){this.insertAggregation("subLists",s,i);if(s){A(s,this._iLevel+1);}return this;};j.prototype.addSubList=function(s){this.addAggregation("subLists",s);if(s){A(s,this._iLevel+1);}return this;};j.prototype.setData=function(s){if(s!=null&&typeof(s)!="string"){s=s.getId();}if(s){this.setAssociation("data",s);s=this._getAtt();this._lb.removeAllItems();if(!s){return this;}var S=s.getAttributesInternal(true);var T=[];var U=[];for(var i=0;i<S.length;i++){var V=R(S[i]);this._lb.addItem(V);if(S[i].getSelected()){var W=M(this,S[i]);if(W){U.push(W);}T.push(V.getKey());}}this._lb.setSelectedKeys(T);var X=this.getSubLists();for(var i=0;i<X.length;i++){var Y=U.indexOf(X[i]);if(Y>=0){if(s.getListOrder()!=h.Fixed){U.splice(Y,1);}}else{X[i]._lb.removeAllItems();X[i].destroy();}}if(s.getListOrder()===h.Fixed){this.removeAllSubLists();}for(var i=0;i<U.length;i++){this.addSubList(U[i]);}var Z=this;s.setChangeListener({id:Z.getId(),_notifyOnChange:function($,_){if($==="width"){if(Z._getAtt()===_&&Z.getDomRef()){y(Z,_.getWidth());}return;}var a1=Q(Z);if(!a1._dirtyLists){a1._dirtyLists={};}if(!a1._dirtyLists[Z.getId()]){a1._dirtyLists[Z.getId()]=Z;}if(!a1._dirtyListsCleanupTimer){a1._dirtyListsCleanupTimer=setTimeout(function(){this._dirtyListsCleanupTimer=null;q.each(this._dirtyLists,function(i,W){if(W._lb&&W.getParent()){if(!W._isTop()){W.getParent().setData(W.getParent().getData());}else{W.setData(W.getData());}}});this._dirtyLists=null;}.bind(a1),0);}}});}return this;};j.prototype.setShowClose=function(s){if(this._isTop()){this.setProperty("showClose",s);}return this;};j.prototype.getShowClose=function(){return Q(this).getProperty("showClose");};j.prototype.getTopTitle=function(){var T=this.getProperty("topTitle");return T?T:this._rb.getText("EXACT_BRWSR_LST_TITLE");};j.prototype._getAtt=function(){return sap.ui.getCore().byId(this.getData());};j.prototype._isTop=function(){return!(this.getParent()instanceof j);};j.prototype._selectionChanged=function(i){if(!this._isTop()){return;}i=sap.ui.getCore().byId(i.getId());var _=function(U,V){if(!U.getSelected()){return;}V.push(U);var W=U.getAttributesInternal();for(var S=0;S<W.length;S++){_(W[S],V);}};var s=[];var T=this._getAtt().getAttributesInternal();for(var S=0;S<T.length;S++){_(T[S],s);}this.fireAttributeSelected({attribute:i,allAttributes:s});};j.prototype._closeAll=function(){if(!this._isTop()){return;}var s=this;var S=function(){s._getAtt()._clearSelection();s._lb.clearSelection();s.fireAttributeSelected({attribute:undefined,allAttributes:[]});};var T=this.getSubLists();if(T.length>0){for(var i=0;i<T.length;i++){J(T[i],true,i==T.length-1?S:null);}}else{S();}};var k=function(i,s){function S(W){var X=W.getParent();var Y=X.getSubLists();var Z=X.indexOfSubList(W)-1;if(Z>=0){return Y[Z];}return null;}function T(W){var X=W.getSubLists();if(X.length>0){return T(X[X.length-1]);}return W;}if(i._iLevel==0){return null;}else if(i._iLevel==1){if(s){return null;}var U=S(i);if(U){return U;}return i.getParent();}else if(i._iLevel>1){var U=S(i);if(U){return T(U);}var V=i.getParent();if(V._iLevel>=1){return V;}}return null;};var m=function(i,s){function S(W){var X=W.getParent();var Y=X.getSubLists();var Z=X.indexOfSubList(W)+1;if(Z<Y.length){return Y[Z];}return null;}function T(W){var X=W.getSubLists();if(X.length>0){return X[0];}return null;}function U(W){var X=S(W);if(X){return X;}var Y=W.getParent();if(Y._iLevel>(s?1:0)){return U(Y);}else{return null;}}if(i._iLevel==0){return T(i);}else if(i._iLevel==1){return s?T(i):S(i);}else if(i._iLevel>1){var V=T(i);if(V){return V;}return U(i);}return null;};var n=function(i,s,S){i.fireEvent("_headerPress",{kexboard:S,domRef:i.$("head")});s.stopPropagation();};var o=function(i){return!p(i)&&i.$().hasClass("sapUiUx3ExactLstTopActive");};var p=function(i){return i.$().hasClass("sapUiUx3ExactLstTopHidden");};var r=function(s,S){if(s._getAtt().getListOrder()!=h.Fixed){return-1;}var T=s._getAtt().getAttributes();var U=0;for(var i=0;i<T.length;i++){if(T[i]===S){break;}if(T[i].getChangeListener()){U++;}}return U;};var t=function(i){if(B(i)){i.$("lst").addClass("sapUiUx3ExactLstLstExp");if(!i._oPopup){var s=function(S){i._handleEvent(S);};i._oPopup=new P();if(!D.browser.firefox){i._oPopup._fixPositioning=function(S,T){P.prototype._fixPositioning.apply(this,arguments);if(T){var $=this._$();var U=q(S.of);var V=0;if(S.offset){V=parseInt(S.offset.split(" ")[0]);}$.css("right",(q(window).width()-U.outerWidth()-U.offset().left+V)+"px");}};}i._oPopup.open=function(){var S=i.$("lst");u(S,false,-1,function(T){S.addClass("sapUiUx3ExactLstExpanded");i.$("exp").html(E.getExpanderSymbol(true,false));i.__sOldHeight=S.css("height");S.css("height",i.__sOldHeight);var U=i.$("head");var V=q(i._lb.getDomRef());var W=V[0].scrollHeight+i.$("exp").height()+V.outerHeight()-V.height()+1;var X=q(window).height()-parseInt(V.offset().top)+q(window).scrollTop()-U.outerHeight();var Y=Math.min(W,X);i._oPopup.setContent(S[0]);var Z=a.get()["sapUiUx3ExactLst"+(i._isTop()?"Root":"")+"ExpandOffset"]||"0 0";P.prototype.open.apply(i._oPopup,[0,P.Dock.BeginTop,P.Dock.BeginBottom,U[0],Z,"none none"]);i._bPopupOpened=true;return Y;},function(T){S.addClass("sapUiUx3ExactLstExpandedBL");B(i);i.getFocusDomRef().focus();e.bindAnyEvent(i._closeHandle);T.bind(e.events.join(" "),s);});};i._oPopup.close=function(S){var T=i.$("lst");T.removeClass("sapUiUx3ExactLstExpandedBL");u(T,false,i.__sOldHeight,function(U){e.unbindAnyEvent(i._closeHandle);U.unbind(e.events.join(" "),s);T.removeClass("sapUiUx3ExactLstExpanded");i.$("exp").html(E.getExpanderSymbol(false,false));},function(U){U.detach();T.removeClass("sapUiShd");U.attr("style","width:"+i._iCurrentWidth+"px;");q(i.getDomRef()).prepend(U);i._oPopup.setContent(null);i._bPopupOpened=undefined;i.__sOldHeight=null;if(i._isTop()){U.css("bottom",g().height+"px");}B(i);P.prototype.close.apply(i._oPopup,[0]);if(!S){i.getFocusDomRef().focus();}});};}}};var u=function(i,W,V,s,S){if(s){var T=s(i);if(T!=undefined){V=T;}}var _=S?function(){S(i);}:function(){};if(q.fx.off){if(W){i.width(V);}else{i.height(V);}_();}else{var U=W?{width:V}:{height:V};i.stop(true,true).animate(U,200,'linear',_);}};var v=function(i){i.preventDefault();i.stopPropagation();return false;};var w=function(i){var s=i.pageX;var S=this._bRTL?(this._iStartDragX-s):(s-this._iStartDragX);y(this,this._iStartWidth+S);};var x=function(i){q(document.body).unbind("selectstart."+this.getId()).unbind("mouseup."+this.getId()).unbind("mousemove."+this.getId());this.$("ghost").remove();this.$("rsz").removeClass("sapUiUx3ExactLstRSzDrag");this._iStartWidth=undefined;this._iStartDragX=undefined;this.focus();};var y=function(i,W){W=b._checkWidth(W);var s=i._bRTL?"right":"left";i._iCurrentWidth=W;i._getAtt()._setWidth(i._iCurrentWidth);i.$("lst").css("width",W+"px");i.$("rsz").css(s,(W-4)+"px");if(i._isTop()){if(!p(i)){i.$("head").css("width",W+"px");i.$("cntnt").css(s,(W+8)+"px");i.$("scroll").css(s,(W+8)+"px");}}else{if(!i.$().hasClass("sapUiUx3ExactLstCollapsed")){i.$("cntnt").css("margin-"+s,W+"px");}}};var z=function(i){var s=i._getAtt();if(s&&!i._isTop()){i.$("head-txt").html(f(s.getText())+"<span class=\"sapUiUx3ExactLstHeadInfo\">&nbsp;("+i._lb.getSelectedIndices().length+"/"+i._lb.getItems().length+")</span>");}};var A=function(s,S){s._iLevel=S;var T=s.getSubLists();for(var i=0;i<T.length;i++){A(T[i],S+1);}};var B=function(i){if(i._lb){var s=q(i._lb.getDomRef());i.$("lst").removeClass("sapUiUx3ExactLstScroll");if(s.length>0&&s.outerHeight()<s[0].scrollHeight){i.$("lst").addClass("sapUiUx3ExactLstScroll");return true;}}return false;};var F=function(i,s,S,T){if(S){S.preventDefault();S.stopPropagation();}if(i._isTop()){return;}if(i._bCollapsed!=s){var U=!!S;var V={};V["margin-"+(i._bRTL?"right":"left")]=(i._bCollapsed?(i._iCurrentWidth+"px"):a.get("sapUiUx3ExactLstCollapseWidth"));V["border-top-width"]=(i._bCollapsed?a.get("sapUiUx3ExactLstContentTop"):"0px");var $=i.$("cntnt");if(q.fx.off){for(var W in V){$.css(W,V[W]);}}else{$.stop(true,true).animate(V,200,'linear');}if(i._bCollapsed){u(i.$("lst"),true,i._iCurrentWidth+"px",function(){q(i.getDomRef()).removeClass("sapUiUx3ExactLstCollapsed");i.$("head").css("overflow","hidden");},function(Z){i.$("hide").html(E.getExpanderSymbol(true,true)).attr("title",i._rb.getText("EXACT_LST_LIST_COLLAPSE"));if(U){i.focus();}var _=i.$("head");i.$("head-txt").removeAttr("style");_.removeAttr("style");Z.removeAttr("style");t(i);y(i,i._iCurrentWidth);G(i);_.removeAttr("role");_.removeAttr("aria-label");_.removeAttr("aria-expanded");var a1=i._getAtt();if(a1&&a1._scrollToAttributeId){a1.scrollTo(sap.ui.getCore().byId(a1._scrollToAttributeId));}});i._oCollapseStyles=undefined;}else{i._oCollapseStyles={};u(i.$("lst"),true,0,null,function(){q(i.getDomRef()).addClass("sapUiUx3ExactLstCollapsed");i.$("hide").html(E.getExpanderSymbol(false,true)).attr("title",i._rb.getText("EXACT_LST_LIST_EXPAND"));if(U){i.focus();}G(i);var Z=i.$("head");Z.attr("role","region");Z.attr("aria-label",i._rb.getText("EXACT_LST_LIST_COLL_ARIA_LABEL",[i._iLevel,i._getAtt().getText()]));Z.attr("aria-expanded","false");});var X=[];for(var W in V){X.push(W,":",V[W],";");}i._oCollapseStyles["cntnt"]=X.join("");i._oCollapseStyles["lst"]="width:0px;";}i._bCollapsed=!i._bCollapsed;}if(T){return;}var Y=i.getParent();if(!i._isTop()&&Y&&Y._isTop&&!Y._isTop()){F(Y,s);}};var G=function(s){if(s._bCollapsed){var W=s.$("cntnt").height()-50;var $=s.$("head-txt");$.css("width",W+"px");}var S=s.getSubLists();for(var i=0;i<S.length;i++){G(S[i]);}};var H=function(i){var s=i.$("lst");if(s.hasClass("sapUiUx3ExactLstExpanded")){i._oPopup.close();}else{i._oPopup.open();}};var J=function(i,s,S){var T=function(V){if(!s){var W=i._getAtt();var X=W.getParent().indexOfAttribute(W);N(i.getParent(),W,X,true);z(i.getParent());Q(i)._selectionChanged(W);}i.destroy();if(S){S();}};var U=i.getDomRef();if(U){u(q(U),true,0,function(V){V.css("overflow","hidden");},T);}else{T();}};var M=function(i,s){if(s.getSelected()){var S=s.getAttributesInternal(true);if(S.length>0){var T;if(s.getChangeListener()){T=sap.ui.getCore().byId(s.getChangeListener().id);}else{T=new j();}T.setData(s);return T;}}return null;};var N=function(s,S,T,U){s._lb.removeSelectedIndex(T);S._clearSelection();if(!U){var V=s.getSubLists();for(var i=0;i<V.length;i++){if(V[i].getData()===S.getId()){J(V[i],true);}}}};var O=function(i){var s=i._getAtt();if(s&&s.getChangeListener()&&s.getChangeListener().id===i.getId()){s.setChangeListener(null);}};var Q=function(i){if(i._isTop()){return i;}if(!i._oTopList){i._oTopList=Q(i.getParent());}return i._oTopList;};var R=function(i){var s;if(i.__oItem){s=i.__oItem;if(s.getText()!=i.getText()){s.setText(i.getText());}if(s.getKey()!=i.getId()){s.setKey(i.getId());}}else{s=new c({text:i.getText(),key:i.getId()});i.exit=function(){if(b.prototype.exit){b.prototype.exit.apply(i,[]);}this.__oItem.destroy();this.__oItem=null;};i.__oItem=s;}return s;};return j;});
