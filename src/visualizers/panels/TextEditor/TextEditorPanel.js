/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Wed May 18 2016 08:58:20 GMT-0500 (CDT).
 */

define(['js/PanelBase/PanelBaseWithHeader',
    'js/PanelManager/IActivePanel',
    'widgets/TextEditor/TextEditorWidget',
    './TextEditorControl'
], function (PanelBaseWithHeader,
             IActivePanel,
             TextEditorWidget,
             TextEditorControl) {
    'use strict';

    var TextEditorPanel;

    TextEditorPanel = function (layoutManager, params) {
        var options = {};
        //set properties from options
        options[PanelBaseWithHeader.OPTIONS.LOGGER_INSTANCE_NAME] = 'TextEditorPanel';
        options[PanelBaseWithHeader.OPTIONS.FLOATING_TITLE] = true;

        //call parent's constructor
        PanelBaseWithHeader.apply(this, [options, layoutManager]);

        this._client = params.client;
        this._embedded = params.embedded;

        //initialize UI
        this._initialize();

        this.logger.debug('ctor finished');
    };

    //inherit from PanelBaseWithHeader
    _.extend(TextEditorPanel.prototype, PanelBaseWithHeader.prototype);
    _.extend(TextEditorPanel.prototype, IActivePanel.prototype);

    TextEditorPanel.prototype._initialize = function () {
        var self = this;

        //set Widget title
        this.setTitle('');

        this.widget = new TextEditorWidget(this.logger, this.$el);

        this.widget.setTitle = function (title) {
            self.setTitle(title);
        };

        this.control = new TextEditorControl({
            logger: this.logger,
            client: this._client,
            embedded: this._embedded,
            widget: this.widget
        });

        this.onActivate();
    };

    /* OVERRIDE FROM WIDGET-WITH-HEADER */
    /* METHOD CALLED WHEN THE WIDGET'S READ-ONLY PROPERTY CHANGES */
    TextEditorPanel.prototype.onReadOnlyChanged = function (isReadOnly) {
        //apply parent's onReadOnlyChanged
        PanelBaseWithHeader.prototype.onReadOnlyChanged.call(this, isReadOnly);

    };

    TextEditorPanel.prototype.onResize = function (width, height) {
        this.logger.debug('onResize --> width: ' + width + ', height: ' + height);
        this.widget.onWidgetContainerResize(width, height);
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    TextEditorPanel.prototype.destroy = function () {
        this.control.destroy();
        this.widget.destroy();

        PanelBaseWithHeader.prototype.destroy.call(this);
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    TextEditorPanel.prototype.onActivate = function () {
        this.widget.onActivate();
        this.control.onActivate();
        WebGMEGlobal.KeyboardManager.setListener(this.widget);
        WebGMEGlobal.Toolbar.refresh();
    };

    TextEditorPanel.prototype.onDeactivate = function () {
        this.widget.onDeactivate();
        this.control.onDeactivate();
        WebGMEGlobal.KeyboardManager.setListener(undefined);
        WebGMEGlobal.Toolbar.refresh();
    };

    return TextEditorPanel;
});
