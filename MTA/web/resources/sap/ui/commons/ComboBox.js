/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./TextField','./library','sap/ui/core/Popup','./ComboBoxRenderer','sap/ui/core/library','sap/ui/Device','./ListBox','sap/ui/base/Event','sap/ui/dom/containsOrEquals','sap/ui/events/KeyCodes','sap/ui/events/jquery/EventExtension','sap/ui/dom/jquery/selectText','jquery.sap.strings'],function(q,T,a,P,C,c,D,L,E,b,K,d){"use strict";var A=c.AccessibleRole;var e=T.extend("sap.ui.commons.ComboBox",{metadata:{interfaces:["sap.ui.commons.ToolbarItem"],library:"sap.ui.commons",properties:{maxPopupItems:{type:"int",group:"Behavior",defaultValue:10},displaySecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},selectedKey:{type:"string",group:"Data",defaultValue:null},selectedItemId:{type:"string",group:"Data",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.ListItem",multiple:true,singularName:"item",bindable:"bindable"},myListBox:{type:"sap.ui.commons.ListBox",multiple:false,visibility:"hidden"}},associations:{listBox:{type:"sap.ui.commons.ListBox",multiple:false}}}});e.prototype.init=function(){T.prototype.init.apply(this,arguments);this._iClosedUpDownIdx=-1;this._sCloseId=null;this.setAccessibleRole(A.Combobox);if(!D.system.desktop){this.mobile=true;}};e.prototype.exit=function(){if(this._oListBox){if(this._oListBoxDelegate){this._oListBox.removeDelegate(this._oListBoxDelegate);}if(this.getAggregation("myListBox")){this.destroyAggregation("myListBox",true);}else{this._oListBox.destroy();}this._oListBox=null;}else if(this.getListBox()){var l=sap.ui.getCore().byId(this.getListBox());if(l){l.detachEvent("itemsChanged",this._handleItemsChanged,this);l.detachEvent("itemInvalidated",this._handleItemInvalidated,this);}}this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;if(this._sHandleItemsChanged){clearTimeout(this._sHandleItemsChanged);this._sHandleItemsChanged=null;this._bNoItemCheck=undefined;}};e.prototype.onclick=function(o){if(this.getEnabled&&this.getEnabled()&&this.getEditable()&&o.target===this.getF4ButtonDomRef()){if(this.oPopup&&this.oPopup.isOpen()){this._close();}else if(!this._F4ForClose){this._open();}this.focus();}this._F4ForClose=false;};e.prototype.onmousedown=function(o){var f=this.getF4ButtonDomRef();if(o.target!==f||!this.getEnabled()||!this.getEditable()){if(this.oPopup&&this.oPopup.isOpen()){o.stopPropagation();}return;}else if(o.target==f&&q(this.getFocusDomRef()).data("sap.INItem")){o.stopPropagation();this.focus();}if(this.oPopup&&this.oPopup.isOpen()){this._F4ForClose=true;}else{this._F4ForOpen=true;}};e.prototype.onsapshow=function(o){if(this.mobile){return;}if(this.oPopup&&this.oPopup.isOpen()){this._close();}else{this._open();}o.preventDefault();o.stopImmediatePropagation();};e.prototype.onsapnextmodifiers=function(o){T.prototype.onsapnextmodifiers.apply(this,arguments);if(o.keyCode==K.ARROW_DOWN&&o.altKey){this.onsapshow(o);o.stopPropagation();}};e.prototype.onsaphide=function(o){if(this.mobile){return;}this._close();o.stopPropagation();};e.prototype.onsapescape=function(o){if(this.oPopup&&this.oPopup.isOpen()){this._close();o.stopPropagation();}T.prototype.onsapescape.apply(this,arguments);var i=this.getSelectedItemId();if(i){var I=sap.ui.getCore().byId(i);this._iClosedUpDownIdx=this.indexOfItem(I);var l=this._getListBox();l.setSelectedIndex(this._iClosedUpDownIdx);this._updatePosInSet(null,this._iClosedUpDownIdx+1,(I.getAdditionalText?I.getAdditionalText():""));}else{this._updatePosInSet(null,-1,null);this._iClosedUpDownIdx=-1;}};e.prototype.onsapenter=function(o){this._close();this._checkChange(o);};e.prototype.onsapfocusleave=function(o){var l=this._getListBox();if((o.relatedControlId&&b(l.getFocusDomRef(),sap.ui.getCore().byId(o.relatedControlId).getFocusDomRef()))||this._bOpening){this.focus();}else{T.prototype.onsapfocusleave.apply(this,arguments);}};e.prototype._checkChange=function(o,I){var f=this.getInputDomRef();if(!f){return;}var n=q(f).val(),O=this.getValue();if(!this._F4ForOpen&&(this.getEditable()&&this.getEnabled())){var g=this.getItems(),h=null,t,k,s,j;if(O!=n){this.setValue(n,true);for(var i=0,l=g.length;i<l;i++){t=g[i].getText();if(t===n){if(i==this._iClosedUpDownIdx){h=g[i];k=h.getKey();s=h.getId();j=i;break;}else if(!j){h=g[i];k=h.getKey();s=h.getId();j=i;}}}this.setProperty("selectedKey",k,true);this.setProperty("selectedItemId",s,true);if(s){this._iClosedUpDownIdx=j;}else{this._iClosedUpDownIdx=-1;}if(this.mobile){if(!s){this._addDummyOption(n);}else{this._removeDummyOption();this.getDomRef("select").selectedIndex=j;}}}else{var m=this.getSelectedItemId();var N;j=this._iClosedUpDownIdx;if(j>=0){h=g[j];if(h.getText()==n){N=h.getId();}}if(N&&N!=m){this.setSelectedItemId(N,true);}else{return;}}this.fireChange({newValue:n,selectedItem:h});}};e.prototype.onkeypress=function(o){if(o.target.id==this.getId()+"-select"){return;}if(!this.getEnabled()||!this.getEditable()){return;}if(this._sTypeAhead){clearTimeout(this._sTypeAhead);}if(e._isHotKey(o)||o.keyCode===K.F4&&o.which===0){return;}var k=o.which||o.keyCode;if(k!==K.DELETE&&k!==K.BACKSPACE&&k!==K.ESCAPE){this._sTypeAhead=setTimeout(function(){this._doTypeAhead();}.bind(this),200);}else{T.prototype.onkeypress.apply(this,arguments);if(k!==K.ESCAPE){this._updatePosInSet(null,-1,null);}}};e.prototype.onsapup=function(o){if(o.target.id==this.getId()+"-select"){return;}if(!this.getEnabled()||!this.getEditable()){return;}if(q(this.getFocusDomRef()).data("sap.InNavArea")){return;}var l=this._getListBox(),I=l.getItems(),f=this.getInputDomRef(),v=q(f).val();var i=this._prepareUpDown(I,v);i=this._updateIdx(I,f,i-1,i,o);o.preventDefault();o.stopPropagation();};e.prototype.onsapdown=function(o){if(o.target.id==this.getId()+"-select"){return;}if(!this.getEnabled()||!this.getEditable()){return;}if(q(this.getFocusDomRef()).data("sap.InNavArea")){return;}var l=this._getListBox(),I=l.getItems(),f=this.getInputDomRef(),v=q(f).val();var i=this._prepareUpDown(I,v);i=this._updateIdx(I,f,i+1,i,o);o.preventDefault();o.stopPropagation();};e.prototype.onsaphome=function(o){T.prototype.onsaphome.apply(this,arguments);if(o.target.id==this.getId()+"-select"){return;}if(!this.getEditable()||!this.getEnabled()||!this.oPopup||!this.oPopup.isOpen()){return;}var l=this._getListBox(),i=l.getItems(),f=this.getInputDomRef();this._updateIdx(i,f,0,undefined,o);o.preventDefault();o.stopPropagation();};e.prototype.onsapend=function(o){T.prototype.onsapend.apply(this,arguments);if(o.target.id==this.getId()+"-select"){return;}if(!this.getEditable()||!this.getEnabled()||!this.oPopup||!this.oPopup.isOpen()){return;}var l=this._getListBox(),I=l.getItems(),f=this.getInputDomRef();var i=I.length-1;i=this._updateIdx(I,f,i,undefined,o);o.preventDefault();o.stopPropagation();};e.prototype._doTypeAhead=function(){this._sTypeAhead=null;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;var o=this._getListBox(),I=o.getItems(),f,t,r=q(this.getInputDomRef()),v=r.val(),s=q.sap.startsWithIgnoreCase;this._sTypedChars=v;var F=false;var i=0;for(var l=I.length;i<l;i++){f=I[i];t=""+f.getText();if(s(t,v)&&f.getEnabled()){this._updatePosInSet(r,i+1,(f.getAdditionalText?f.getAdditionalText():""));r.val(t);this._doSelect(v.length,t.length);o.setSelectedIndex(i);o.scrollToIndex(i,true);F=true;if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=i;}return;}}o.clearSelection();o.scrollToIndex(i,true);if(!F){this._updatePosInSet(r,-1,null);if(this.mobile){this._addDummyOption(v);}}};e.prototype._prepareUpDown=function(I,v){var t;if(this._iClosedUpDownIdx>=0&&I[this._iClosedUpDownIdx]&&I[this._iClosedUpDownIdx].getText()!==v){this._iClosedUpDownIdx=-1;}if(this._iClosedUpDownIdx===-1){for(var i=0,l=I.length;i<l;i++){t=I[i].getText();if(t===v){this._iClosedUpDownIdx=i;break;}}}return this._iClosedUpDownIdx;};e.prototype._updateIdx=function(I,o,n,f,g){var l=I.length,F=n===0&&f===undefined,h=f!==undefined&&f<n||F,i,r=q(o);if(n<0){i=0;}else if(n<l){i=n;}else{i=l-1;}var j,v=false;do{n=h?i++:i--;j=I[n];v=j&&j.getEnabled()&&!(j instanceof sap.ui.core.SeparatorItem)&&j.getId()!==this.getId()+"_shi";}while(!v&&i<l&&i>=0);if(v){var t=j.getText();var p=n+1;if(this._determinePosinset){p=this._determinePosinset(I,n);}this._updatePosInSet(r,p,(j.getAdditionalText?j.getAdditionalText():""));r.val(t);this._doSelect();this._fireLiveChange(g);var k=this._getListBox();k.setSelectedIndex(n);k.scrollToIndex(n,true);}else{n=f;}this._iClosedUpDownIdx=n;return n;};e.prototype._doSelect=function(s,i){var o=this.getInputDomRef();if(o){var r=q(o);o.focus();r.selectText(s?s:0,i?i:r.val().length);}return this;};e.prototype.getF4ButtonDomRef=function(){return this.getDomRef("icon");};e.prototype._getPrivateListBox=function(){if(this._oListBox){return this._oListBox;}this._oListBox=new L(this.getId()+"-lb",{allowMultiSelect:false});this.setAggregation("myListBox",this._oListBox,true);this._oListBox.attachEvent("itemsChanged",this._handleItemsChanged,this);this._oListBox.attachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this.getDomRef()){this.$().attr("aria-owns",this.getId()+"-input "+this._oListBox.getId());}return this._oListBox;};e.prototype._getExistingListBox=function(){var l=this.getListBox(),o;if(l){o=sap.ui.getCore().byId(l);}else if(this._oListBox){o=this._getPrivateListBox();}return o;};e.prototype._getListBox=function(u){var l=this._getExistingListBox();if(!l){l=this._getPrivateListBox();}if(u){l.setAllowMultiSelect(false);l.setDisplaySecondaryValues(this.getDisplaySecondaryValues());var o=this.getDomRef();if(o){l.setMinWidth(q(o).rect().width+"px");}}return l;};e.prototype._open=function(i){if(this.mobile){return;}if(i===undefined){i=-1;}if(!this.getEditable()||!this.getEnabled()){return;}if(!this.oPopup){this.oPopup=new P();}this._F4ForOpen=false;var l=this._getListBox(!this.oPopup.isOpen());var p=this.oPopup;this._prepareOpen(l);if(!this._oListBoxDelegate){this._oListBoxDelegate={oCombo:this,onclick:function(o){var g=q(o.target).closest("li").attr("id");if(g){var n=new E("_internalSelect",this.oCombo,{selectedId:g});this.oCombo._handleSelect(n);}}};}l.addDelegate(this._oListBoxDelegate);p.setContent(l);p.setAutoClose(true);p.setAutoCloseAreas([this.getDomRef()]);p.setDurations(0,0);p.setInitialFocusId(this.getId()+'-input');var s=this._rerenderListBox(l);if(s){return;}p.attachOpened(this._handleOpened,this);var f=P.Dock;p.open(i,f.BeginTop,f.BeginBottom,this,null,null,P.CLOSE_ON_SCROLL);q(l.getFocusDomRef()).attr("tabIndex","-1");q(this.getDomRef()).attr("aria-expanded",true);};e.prototype._rerenderListBox=function(l){sap.ui.getCore().applyChanges();return false;};e.prototype._prepareOpen=function(o){this._bOpening=true;var r=q(this.getInputDomRef()),v=r.val(),n,I=o.getItems(),t,s=q.sap.startsWithIgnoreCase,f=v==="",S=this.getSelectedItemId(),g;var i=0;var h=-1;for(var l=I.length;i<l;i++){g=I[i];if(!g.getEnabled()){continue;}t=""+g.getText();if(f||s(t,v)){if(t==v&&i==this._iClosedUpDownIdx){h=i;n=t;break;}else if(this._iClosedUpDownIdx<0&&t==v&&g.getId()==S){h=i;n=t;break;}else if(h<0){h=i;n=t;}}}if(h>=0){this._iClosedUpDownIdx=h;this._updatePosInSet(r,h+1,(g.getAdditionalText?g.getAdditionalText():""));r.val(n);this._doSelect();var j=new q.Event("sapshow");j.which=K.F4;this._fireLiveChange(j);}var k=o.getItems().length;var m=this.getMaxPopupItems();o.setVisibleItems(m<k?m:-1);o.setSelectedIndex(h);};e.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);var l=this._getListBox();l.scrollToIndex(this._iClosedUpDownIdx,true);l.attachSelect(this._handleSelect,this);this.oPopup.attachClosed(this._handleClosed,this);if(D.browser.msie){setTimeout(function(){q(this.getInputDomRef()).focus();}.bind(this),0);}if(q(this.getFocusDomRef()).data("sap.InNavArea")){q(this.getFocusDomRef()).data("sap.InNavArea",false);}this._bOpening=false;};e.prototype._close=function(o){if(this.oPopup){this.oPopup.close(0);}};e.prototype._handleClosed=function(){this.oPopup.detachClosed(this._handleClosed,this);var l=this._getListBox();l.removeDelegate(this._oListBoxDelegate);l.detachSelect(this._handleSelect,this);q(this.getDomRef()).attr("aria-expanded",false);if(this._cleanupClose){this._cleanupClose(l);}};e.prototype._handleSelect=function(o){var s=o.getParameter("selectedIndex"),S=o.getParameter("selectedId"),i=o.getParameter("selectedItem");if(!i&&S){i=sap.ui.getCore().byId(S);if(i.getParent()!==this._getListBox(false)){i=null;}s=q.inArray(i,this._getListBox().getItems());}if(i&&i.getEnabled()){var n=i.getText();this._iClosedUpDownIdx=s;this._close();this._updatePosInSet(null,this._getListBox().getSelectedIndex()+1,(i.getAdditionalText?i.getAdditionalText():""));var O=this.getValue();var f=this.getSelectedKey();var N=i.getKey();var g=this.getSelectedItemId();var h=i.getId();this._sTypedChars=n;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;if(O!=n||f!=N||g!=h){this.setValue(n,true);this.setProperty("selectedKey",N,true);this.setProperty("selectedItemId",h,true);this.fireChange({newValue:n,selectedItem:i});}else if(n!=q(this.getInputDomRef()).val()){q(this.getInputDomRef()).val(n);}}this._doSelect();return i;};e.prototype.getItems=function(){var l=this._getExistingListBox();return l?l.getItems():[];};e.prototype.insertItem=function(i,I){i=this.validateAggregation("items",i,true);this._getListBox().insertItem(i,I);return this;};e.prototype.addItem=function(i){i=this.validateAggregation("items",i,true);this._getListBox().addItem(i);return this;};e.prototype.removeItem=function(v){return this._getListBox().removeItem(v);};e.prototype.removeAllItems=function(){var l=this._getExistingListBox();return l?l.removeAllItems():[];};e.prototype.indexOfItem=function(i){return this._getListBox().indexOfItem(i);};e.prototype.destroyItems=function(){var l=this._getExistingListBox();if(l){this._getListBox().destroyItems();}return this;};e.prototype.updateItems=function(){this._bNoItemCheck=true;this.updateAggregation("items");if(!this._sHandleItemsChanged){this._sHandleItemsChanged=setTimeout(function(){this._handleItemsChanged(null,true);}.bind(this),0);}};e.prototype.setListBox=function(l){var o=sap.ui.getCore().byId(this.getListBox());if(o){o.detachEvent("itemsChanged",this._handleItemsChanged,this);o.detachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this._bListBoxDependentSet){this.removeDependent(o);this._bListBoxDependentSet=false;}}if(this._oListBox&&l){this._oListBox.detachEvent("itemsChanged",this._handleItemsChanged,this);this._oListBox.detachEvent("itemInvalidated",this._handleItemInvalidated,this);if(this.getAggregation("myListBox")){this.destroyAggregation("myListBox",true);}else{this._oListBox.destroy();}this._oListBox=null;}this.setAssociation("listBox",l);var f=typeof l==="string"?sap.ui.getCore().byId(l):l;if(f&&f.attachEvent){f.attachEvent("itemsChanged",this._handleItemsChanged,this);f.attachEvent("itemInvalidated",this._handleItemInvalidated,this);}if(f&&!f.getParent()){this.addDependent(f);this._bListBoxDependentSet=true;}if(this.getDomRef()&&f){this.$().attr("aria-owns",this.getId()+"-input "+f.getId());}return this;};e.prototype._handleItemsChanged=function(o,f){if(f){this._sHandleItemsChanged=null;this._bNoItemCheck=undefined;}if(this._bNoItemCheck){return;}var I=[];if(this._getExistingListBox()){I=this._getListBox().getItems();}var s=this.getSelectedKey();var S=this.getSelectedItemId();var n,N,g,h;var v=this.getValue();var j=-1;var F=false;var k=false;var l=false;this._iClosedUpDownIdx=-1;var B=!!this.getBinding("value");var m=!!this.getBinding("selectedKey");if(B&&m){B=false;}var i=0;var p;for(i=0;i<I.length;i++){p=I[i];if((this._sWantedSelectedKey||this._sWantedSelectedItemId)&&(p.getKey()==this._sWantedSelectedKey||p.getId()==this._sWantedSelectedItemId)&&p.getEnabled()){n=p.getKey();N=p.getId();g=p.getText();h=(p.getAdditionalText?p.getAdditionalText():"");j=i;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;break;}else if(s&&p.getKey()==s&&p.getEnabled()&&!(l&&B)){F=true;n=s;N=p.getId();g=p.getText();h=(p.getAdditionalText?p.getAdditionalText():"");j=i;if(g==v&&N==S&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break;}if(m&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break;}}else if(S&&p.getId()==S&&p.getEnabled()&&!F&&!(l&&B)){k=true;n=p.getKey();N=S;g=p.getText();h=(p.getAdditionalText?p.getAdditionalText():"");j=i;}else if(p.getText()==v&&p.getEnabled()&&!(F&&!B)&&!(k&&!B)&&!l){l=true;n=p.getKey();N=p.getId();g=v;h=(p.getAdditionalText?p.getAdditionalText():"");j=i;if(B&&!this._sWantedSelectedKey&&!this._sWantedSelectedItemId){break;}}}this._iClosedUpDownIdx=j;if(v!=g&&j>=0){this.setProperty("value",g,true);q(this.getInputDomRef()).val(g);}this.setProperty("selectedKey",n,true);this.setProperty("selectedItemId",N,true);var r=this.getDomRef();if(r){q(this.getInputDomRef()).attr("aria-setsize",I.length);if(N){this._updatePosInSet(null,j+1,h);}else{this._updatePosInSet(null,-1,null);}if(this.mobile){var t=this.getDomRef("select");while(t.length>0){t.remove(0);}for(i=0;i<I.length;i++){p=I[i];var O=document.createElement("option");O.text=p.getText();O.id=this.getId()+"-"+p.getId();if(!p.getEnabled()){O.disabled="disabled";}t.add(O,null);}t.selectedIndex=j;}}};e.prototype._handleItemInvalidated=function(o){if(this._bNoItemCheck){return;}var i=o.getParameter("item");if(i.getId()==this.getSelectedItemId()){if(i.getKey()!=this.getSelectedKey()){this.setProperty("selectedKey",i.getKey(),true);}if(i.getText()!=this.getValue()){T.prototype.setValue.apply(this,[i.getText()]);}}if(!this._sHandleItemsChanged){this._handleItemsChanged(o);}};e.prototype.onAfterRendering=function(o){T.prototype.onAfterRendering.apply(this,arguments);var l=this.getListBox();if(l){var f=sap.ui.getCore().byId(l);if(f.getDomRef()){f.$().appendTo(sap.ui.getCore().getStaticAreaRef());}}if(this.mobile){var t=this;this.$("select").bind("change",function(){var n=t.$("select").val();var g=t.getItems();var h=true;var O=0;var s=t.getValue();for(var i=0;i<g.length;i++){if(g[i].getText()==n){h=g[i].getEnabled();}if(g[i].getText()==s){O=i;}}if(h){t.setValue(n);t.fireChange({newValue:n,selectedItem:sap.ui.getCore().byId(t.getSelectedItemId())});}else{t.getDomRef("select").selectedIndex=O;}});if(this.getSelectedItemId()){for(var i=0;i<this.getItems().length;i++){var I=this.getItems()[i];if(this.getSelectedItemId()==I.getId()){this.getDomRef("select").selectedIndex=i;break;}}}else{this._addDummyOption(this.getValue());}}};e._isHotKey=function(o){if(o.altKey||o.ctrlKey||o.metaKey){return true;}var k=o.keyCode||o.which;switch(k){case K.ENTER:case K.SHIFT:case K.TAB:case K.ALT:case K.CONTROL:return true;case K.END:case K.HOME:case K.ARROW_LEFT:case K.ARROW_UP:case K.ARROW_RIGHT:case K.ARROW_DOWN:case K.F1:case K.F2:case K.F3:case K.F4:case K.F5:case K.F6:case K.F7:case K.F8:case K.F9:case K.F10:case K.F11:case K.F12:if(o.type=="keypress"){return o.which===0;}else{return true;}default:return false;}};e.prototype.setSelectedKey=function(s){if(this.getSelectedKey()==s){return this;}if(!s&&this._isSetEmptySelectedKeyAllowed()){return this;}var I=this.getItems();var n=true;var S;var f;var g;for(var i=0;i<I.length;i++){if(I[i].getKey()==s&&I[i].getEnabled()){var o=I[i];S=o.getId();var v=o.getText();g=(o.getAdditionalText?o.getAdditionalText():"");this.setValue(v,true);this._sTypedChars=v;f=i;n=false;break;}}if(!n){this.setProperty("selectedKey",s,true);this.setProperty("selectedItemId",S,true);var h=this.getDomRef();if(h){this._updatePosInSet(null,f+1,g);if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=f;}}this._sWantedSelectedKey=undefined;this._iClosedUpDownIdx=f;}else{this._sWantedSelectedKey=s;this._iClosedUpDownIdx=-1;}this._sWantedSelectedItemId=undefined;return this;};e.prototype._isSetEmptySelectedKeyAllowed=function(){this.setProperty("selectedKey","",true);this.setProperty("selectedItemId","",true);this.setValue("",true);return true;};e.prototype.setSelectedItemId=function(s){if(this.getSelectedItemId()==s){return this;}if(!s&&this._isSetEmptySelectedKeyAllowed()){return this;}var I=this.getItems();var n=true;var k;var f;var g;for(var i=0;i<I.length;i++){if(I[i].getId()==s&&I[i].getEnabled()){var S=I[i];k=S.getKey();var v=S.getText();g=(S.getAdditionalText?S.getAdditionalText():"");this.setValue(v,true);this._sTypedChars=v;f=i;n=false;break;}}if(!n){this.setProperty("selectedItemId",s,true);this.setProperty("selectedKey",k,true);var o=this.getDomRef();if(o){this._updatePosInSet(null,f+1,g);if(this.mobile){this._removeDummyOption();this.getDomRef("select").selectedIndex=f;}}this._sWantedSelectedItemId=undefined;this._iClosedUpDownIdx=f;}else{this._sWantedSelectedItemId=s;this._iClosedUpDownIdx=-1;}this._sWantedSelectedKey=undefined;return this;};e.prototype.setValue=function(v,n){if(!n){var I=this.getItems();var k;var s;var f;var g;this._iClosedUpDownIdx=-1;for(var i=0;i<I.length;i++){if(I[i].getText()==v&&I[i].getEnabled()){var S=I[i];s=S.getId();k=S.getKey();g=(S.getAdditionalText?S.getAdditionalText():"");f=i;this._iClosedUpDownIdx=f;break;}}this.setProperty("selectedKey",k,true);this.setProperty("selectedItemId",s,true);var o=this.getDomRef();if(o){if(s){this._updatePosInSet(null,f+1,g);}else{this._updatePosInSet(null,-1,null);}if(this.mobile){if(!s){this._addDummyOption(v);}else{this._removeDummyOption();this.getDomRef("select").selectedIndex=f;}}}}T.prototype.setValue.apply(this,[v]);this._sTypedChars=this.getValue();this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;return this;};e.prototype.invalidate=function(o){if(!o||!(o instanceof L)||o!=this._getListBox()){T.prototype.invalidate.apply(this,arguments);}else{if(this.getUIArea()&&o.getDomRef()){this.getUIArea().addInvalidatedControl(o);}}};e.prototype.clone=function(i){var o=T.prototype.clone.apply(this,arguments),l=this.getAggregation("myListBox"),f;if(l&&!o._oListBox){l.detachEvent("itemsChanged",this._handleItemsChanged,this);l.detachEvent("itemInvalidated",this._handleItemInvalidated,this);f=l.clone(i);f.attachEvent("itemsChanged",o._handleItemsChanged,o);f.attachEvent("itemInvalidated",o._handleItemInvalidated,o);o.setAggregation("myListBox",f,true);o._oListBox=f;l.attachEvent("itemsChanged",this._handleItemsChanged,this);l.attachEvent("itemInvalidated",this._handleItemInvalidated,this);}return o;};e.prototype._addDummyOption=function(v){var o=this.getDomRef("dummyOption");if(!o){var i=this.getItems();o=document.createElement("option");o.text=v;o.id=this.getId()+"-dummyOption";if(i.length>0){this.getDomRef("select").add(o,document.getElementById(this.getId()+"-"+i[0].getId()));}else{this.getDomRef("select").add(o,null);}}else{o.text=v;}this.getDomRef("select").selectedIndex=0;};e.prototype._removeDummyOption=function(){var o=this.getDomRef("dummyOption");if(o){this.getDomRef("select").remove(0);}};e.prototype.getFocusDomRef=function(){if(this.mobile){return this.getDomRef("select")||null;}else{return this.getDomRef("input")||null;}};e.prototype._updatePosInSet=function(i,I,s){if(!i){i=this.$("input");}if(I>=0){i.attr("aria-posinset",I);if(this.getDisplaySecondaryValues()){this.$("SecVal").text(s);}}else{i.removeAttr("aria-posinset");if(this.getDisplaySecondaryValues()){this.$("SecVal").text("");}}};e.prototype.getAccessibilityInfo=function(){var i=T.prototype.getAccessibilityInfo.apply(this,arguments);i.role="combobox";i.type=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_COMBO");return i;};return e;});
