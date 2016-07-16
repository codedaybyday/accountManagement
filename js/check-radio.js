$(document).ready(function() {
    var fp;
    var data = [
        [1,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [2,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [3,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [4,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [5,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [6,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员'],
        [7,'刘北京','刘','封存','2016-7-8','2016-7-8','管理员']  
    ];
    var t = $('#example').DataTable();
    data.forEach(function(el,index){
         t.row.add( el).draw( false );
    });
    $(".js-example-basic-single").select2();
    $('button[type="submit"]').click(function(){
        var name = $.trim($('input[name="name"]').val());
        var ps = $.trim($('input[name="ps"]').val());
        //var state = $.trim($('input[name="state"]').val());
        //var stateRadio = Ext.getCmp('state').items;
        var stateValue = fp.getForm().getValues()['state'];
        console.log(stateValue);
        return false;
    });
    setRadioGroup();
    function setRadioGroup(){
        Ext.require([
            'Ext.form.*',
            'Ext.layout.container.Column',
            'Ext.window.MessageBox',
            'Ext.fx.target.Element'
        ]);

        Ext.onReady(function(){

            /*====================================================================
             * RadioGroup examples
             *====================================================================*/
            // NOTE: These radio examples use the exact same options as the checkbox ones
            // above, so the comments will not be repeated.  Please see comments above for
            // additional explanation on some config options.

            var radioGroup = {
                xtype: 'fieldset',
                //title: 'Radio Groups',
                // in this section we use the form layout that will aggregate all of the fields
                // into a single table, rather than one table per field.
                layout: 'form',
                //collapsible: true,
                items: [/*{
                    xtype: 'textfield',
                    name: 'txt-test4',
                    fieldLabel: 'Alignment Test'
                },*/{
                    xtype: 'radiogroup',
                    //fieldLabel: 'Auto Layout',
                    cls: 'x-check-group-alt',
                    items: [
                        {boxLabel: '封存', name: 'state', inputValue: 1},
                        {boxLabel: '启封', name: 'state', inputValue: 2, checked: true},
                    ]
                }]
            };


            // combine all that into one huge form
            fp = Ext.create('Ext.FormPanel', {
                //title: 'Check/Radio Groups Example',
                //frame: true,
                /*fieldDefaults: {
                    labelWidth: 110,
                    labelStyle: 'color:green;padding-left:4px'
                },*/
                //width: 600,
                renderTo:'form-ct',
                //bodyPadding: 10,
                items: [
                    //individual,
                    //checkGroup,
                    radioGroup
                ]
            });
        });
    }
});