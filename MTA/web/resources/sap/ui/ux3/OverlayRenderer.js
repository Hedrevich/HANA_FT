/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var O={};O.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUiUx3Overlay");if(this.addRootClasses){this.addRootClasses(r,c);}r.writeClasses();r.write(">");r.write("<div role='presentation'");r.addClass("sapUiUx3OverlayOverlay");if(this.addOverlayClasses){this.addOverlayClasses(r,c);}r.writeClasses();r.write(">");r.write("</div>");r.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+c.getId()+"-firstFocusDummyPaneFw'></span>");r.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+c.getId()+"-firstFocusDummyPaneBw'></span>");if(c.getOpenButtonVisible()){r.write("<a role=\"button\" aria-disabled=\"false\" class='sapUiUx3OverlayOpenButton' id='"+c.getId()+"-openNew' tabindex=\"0\" title=\""+c._getText("OVERLAY_OPEN_BUTTON_TOOLTIP")+"\">"+c._getText("OVERLAY_OPEN_BUTTON_TEXT")+"</a>");}if(c.getCloseButtonVisible()){r.write("<a role=\"button\" aria-disabled=\"false\" class='sapUiUx3OverlayCloseButton' id='"+c.getId()+"-close' tabindex=\"0\" aria-label='"+c._getText("OVERLAY_CLOSE_BUTTON_TOOLTIP")+"'></a>");}if(this.renderContent){this.renderContent(r,c);}r.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+c.getId()+"-LastFocusDummyPane'></span>");r.write("</div>");};return O;},true);
