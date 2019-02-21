/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer','sap/ui/core/theming/Parameters','./FormLayoutRenderer',"sap/base/Log"],function(R,t,F,L){"use strict";var G=R.extend(F);G.renderForm=function(r,l,f){var s=l.getSingleColumn();var c=16;var S=false;var C=0;var a=f.getFormContainers();var b=a.length;var i=0;var o;var d;var T=f.getToolbar();var e=f.getTitle();if(s){c=c/2;C=c;}else{C=c/2;for(i=0;i<b;i++){d=this.getContainerData(l,a[i]);if(d&&d.getHalfGrid()){S=true;break;}}}r.write("<table role=\"presentation\"");r.writeControlData(l);r.write(" cellpadding=\"0\" cellspacing=\"0\"");r.addStyle("border-collapse","collapse");r.addStyle("table-layout","fixed");r.addStyle("width","100%");r.addClass("sapUiGrid");this.addBackgroundClass(r,l);if(T){r.addClass("sapUiFormToolbar");}r.writeStyles();r.writeClasses();r.write(">");r.write("<colgroup>");r.write("<col span="+C+">");if(S){r.write("<col class = \"sapUiGridSpace\"span=1>");}if(!s){r.write("<col span="+C+">");}r.write("</colgroup><tbody>");if(T||e){var g=c;if(S){g++;}r.write("<tr class=\"sapUiGridTitle\"><th colspan="+g+">");var h;if(!T){h=t.get('sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize');}this.renderHeader(r,T,e,undefined,false,h,f.getId());r.write("</th></tr>");}i=0;var j;var k;while(i<b){o=a[i];o._checkProperties();if(o.isVisible()){d=this.getContainerData(l,o);if(d&&d.getHalfGrid()&&!s){j=a[i+1];k=undefined;if(j&&j.isVisible()){k=this.getContainerData(l,j);}if(k&&k.getHalfGrid()){j._checkProperties();this.renderContainerHalfSize(r,l,o,j,c);i++;}else{this.renderContainerHalfSize(r,l,o,undefined,c);}}else{this.renderContainerFullSize(r,l,o,c,S);}}i++;}r.write("</tbody></table>");};G.renderContainerFullSize=function(r,l,c,C,s){var e=c.getExpandable();var T=c.getTooltip_AsString();var o=c.getToolbar();var a=c.getTitle();if(o||a){var b=C;if(s){b++;}r.write("<tr class=\"sapUiGridConteinerFirstRow sapUiGridConteinerHeaderRow\"><td colspan="+b);r.addClass("sapUiGridHeader");if(T){r.writeAttributeEscaped('title',T);}if(o){r.addClass("sapUiFormContainerToolbar");}else if(a){r.addClass("sapUiFormContainerTitle");}r.writeClasses();r.write(">");this.renderHeader(r,o,c.getTitle(),c._oExpandButton,e,false,c.getId());r.write("</td></tr>");}if(!e||c.getExpanded()){var E=c.getFormElements();var d;var f=[];var g;var h=false;for(var j=0,k=E.length;j<k;j++){d=E[j];if(d.isVisible()){g=f[0]&&(f[0][0]==C);r.write("<tr");if(!h){h=true;if(!o&&!a){r.addClass("sapUiGridConteinerFirstRow");}}if(!this.checkFullSizeElement(l,d)&&f[0]!="full"&&!g){r.writeElementData(d);r.addClass("sapUiFormElement");}r.writeClasses();r.write(">");if(!g){f=this.renderElement(r,l,d,false,C,s,f);}else{f.splice(0,1);}r.write("</tr>");if(f[0]=="full"||g){j=j-1;}}}if(f.length>0){for(var i=0;i<f.length;i++){r.write("<tr></tr>");}}}};G.renderContainerHalfSize=function(r,l,c,C,a){var b=a/2;var e=c.getExpandable();var T=c.getTooltip_AsString();var s;var o=c.getTitle();var d;var f=c.getToolbar();var g;var E=[];if(!e||c.getExpanded()){E=c.getFormElements();}var h=E.length;var j=[];var k=0;var m=false;if(C){m=C.getExpandable();s=C.getTooltip_AsString();d=C.getTitle();g=C.getToolbar();if(!m||C.getExpanded()){j=C.getFormElements();}k=j.length;}if(o||d||f||g){r.write("<tr class=\"sapUiGridConteinerFirstRow sapUiGridConteinerHeaderRow\"><td colspan="+b);r.addClass("sapUiGridHeader");if(T){r.writeAttributeEscaped('title',T);}if(f){r.addClass("sapUiFormContainerToolbar");}else if(o){r.addClass("sapUiFormContainerTitle");}r.writeClasses();r.write(">");if(c){this.renderHeader(r,f,o,c._oExpandButton,e,false,c.getId());}r.write("</td><td></td><td colspan="+b);r.addClass("sapUiGridHeader");if(s){r.writeAttributeEscaped('title',s);}if(g){r.addClass("sapUiFormContainerToolbar");}else if(d){r.addClass("sapUiFormContainerTitle");}r.writeClasses();r.write(">");if(C){this.renderHeader(r,g,d,C._oExpandButton,m,false,C.getId());}r.write("</td></tr>");}if((!e||c.getExpanded())||(!m||C.getExpanded())){var n=[],p=[];var q=0,u=0;var v;var w;var x;var y;var z=false;while(q<h||u<k){v=E[q];w=j[u];x=n[0]&&(n[0][0]==b);y=p[0]&&(p[0][0]==b);if((v&&v.isVisible())||(w&&w.isVisible())||x||y){r.write("<tr");if(!z){z=true;if(!f&&!o&&!g&&!d){r.addClass("sapUiGridConteinerFirstRow");}}r.writeClasses();r.write(">");if(!x){if(v&&v.isVisible()&&(!e||c.getExpanded())){n=this.renderElement(r,l,v,true,b,false,n);}else{r.write("<td colspan="+b+"></td>");}if(n[0]!="full"){q++;}}else{if(n[0][2]>0){r.write("<td colspan="+n[0][2]+"></td>");}n.splice(0,1);}r.write("<td></td>");if(!y){if(w&&w.isVisible()&&(!m||C.getExpanded())){p=this.renderElement(r,l,w,true,b,false,p);}else{r.write("<td colspan="+b+"></td>");}if(p[0]!="full"){u++;}}else{if(p[0][2]>0){r.write("<td colspan="+p[0][2]+"></td>");}p.splice(0,1);}r.write("</tr>");}else{q++;u++;}}if(n.length>0||p.length>0){for(var i=0;i<n.length||i<p.length;i++){r.write("<tr></tr>");}}}};G.renderElement=function(r,l,e,h,c,s,a){var o=e.getLabelControl();var b=0;var f=e.getFields();var C=0;var A=0;var m=false;var d=1;var g=1;var x=0;if(this.checkFullSizeElement(l,e)){if(a.length>0&&a[0]!="full"){L.error("Element \""+e.getId()+"\" - Too much fields for one row!","Renderer","GridLayout");return a;}if(s){c=c+1;}if(o&&a[0]!="full"){r.write("<td colspan="+c+" class=\"sapUiFormElementLbl sapUiGridLabelFull\">");r.renderControl(o);r.write("</td>");return["full"];}else{a.splice(0,1);g=this.getElementData(l,f[0]).getVCells();r.write("<td colspan="+c);if(g>1&&h){r.write(" rowspan="+g);for(x=0;x<g-1;x++){a.push([c,undefined,false]);}}r.write(" >");r.renderControl(f[0]);r.write("</td>");return a;}}if(a.length>0&&a[0][0]>0){c=c-a[0][0]+a[0][2];m=a[0][1];b=a[0][2];a.splice(0,1);}var j=b;var E;var k="";if(o||b>0){j=3;if(o&&b==0){E=this.getElementData(l,o);if(E){k=E.getHCells();if(k!="auto"&&k!="full"){j=parseInt(k);}}}r.write("<td colspan="+j+" class=\"sapUiFormElementLbl\">");if(o){r.renderControl(o);}c=c-j;r.write("</td>");}if(f&&f.length>0){var n=c;var p=f.length;var q;var i=0;var u=0;for(i=0,u=f.length;i<u;i++){q=f[i];E=this.getElementData(l,q);if(E&&E.getHCells()!="auto"){n=n-parseInt(E.getHCells());p=p-1;}}var v=0;for(i=0,v=0,u=f.length;i<u;i++){q=f[i];E=this.getElementData(l,q);k="auto";d=1;g=1;if(E){k=E.getHCells();g=E.getVCells();}if(k=="auto"){if(n>0){d=Math.floor(n/p);if(d<1){d=1;}v++;A=A+d;if((v==p)&&(n>A)){d=d+(n-A);}}else{d=1;}}else{d=parseInt(k);}C=C+d;if(C>c){L.error("Element \""+e.getId()+"\" - Too much fields for one row!","Renderer","GridLayout");C=C-d;break;}if(g>1){for(x=0;x<g-1;x++){if(o){b=j;}if(a.length>x){a[x][0]=a[x][0]+d;a[x][2]=b;}else{a.push([j+d,undefined,b]);}}}if(s&&C>=Math.floor(c/2)&&!m){d=d+1;m=true;if(g>1){for(x=0;x<g-1;x++){a[x][1]=true;}}}r.write("<td");if(d>1){r.write(" colspan="+d);}if(g>1){r.write(" rowspan="+g);}r.write(" >");r.renderControl(q);r.write("</td>");}}if(C<c){var w=c-C;if(!h&&s&&!m){w++;}r.write("<td colspan="+w+" ></td>");}return a;};G.checkFullSizeElement=function(l,e){var f=e.getFields();if(f.length==1&&this.getElementData(l,f[0])&&this.getElementData(l,f[0]).getHCells()=="full"){return true;}else{return false;}};G.getContainerData=function(l,c){return l.getLayoutDataForElement(c,"sap.ui.layout.form.GridContainerData");};G.getElementData=function(l,c){return l.getLayoutDataForElement(c,"sap.ui.layout.form.GridElementData");};return G;},true);
