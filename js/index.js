$(document).ready(function() {
    var fp,fp2,t;
    var init_data = [
        [1,'刘北京','刘','封存','07/08/2016','07/08/2016','管理员'],
        [2,'刘北京','刘1','封存','07/08/2016','07/08/2016','管理员'],
        [3,'刘北京','刘2','封存','07/08/2016','07/08/2016','管理员'],
        [4,'刘北京','刘3','封存','07/08/2016','07/08/2016','管理员'],
        [5,'刘北京','刘4','封存','07/08/2016','07/08/2016','管理员'],
        [6,'刘北京','刘5','封存','07/08/2016','07/08/2016','管理员'],
        [7,'刘北京','刘6','封存','07/08/2016','07/08/2016','管理员']  
    ];
    init_table();
    crud();
    //表格初始化
    function init_table(){
        t = $('#example').DataTable({
            'bStateSave': true,
            'columnDefs':[{
                'targets':7,
                'data':null,
                'render':function(data,type,row){
                    var html = "<a href='###' class='delurl'>删除</a>";
                    html += " <a href='###' class='editurl'>编辑</a>";
                    return html;
                }
            }],
            /*"columns": [
                { "searchable": false },
                null,
                null,
                null,
                null,
                null,
                null
            ]*/
        });
        addData();
        //插件的初始化
        $(".js-example-basic-single").select2();
        $('input.date').daterangepicker({
            singleDatePicker: true,
            startDate: moment().subtract(6, 'days')
        });
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
                        {boxLabel: '封存', name: 'state', inputValue:'封存'},
                        {boxLabel: '启封', name: 'state', inputValue: '启封', checked: true},
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
            fp2 = Ext.create('Ext.FormPanel', {
                //title: 'Check/Radio Groups Example',
                //frame: true,
                /*fieldDefaults: {
                    labelWidth: 110,
                    labelStyle: 'color:green;padding-left:4px'
                },*/
                //width: 600,
                renderTo:'form-ct2',
                //bodyPadding: 10,
                items: [
                    //individual,
                    //checkGroup,
                    radioGroup
                ]
            });
        });
    }
    //添加数据
    function addData(){
        init_data.forEach(function(el,index){
            t.row.add( el).draw( false );
        });
    }
    //通过值来找到该值在数组中的下标
    function getArrayIndex(item,arr){
        for(var key in arr){
            if(Array.isArray(arr[key])){
                if(arr[key].toString() === item.toString()){
                    return key;
                }
            }else{
                if(key == item){
                    return key;
                }
            }
            
        }
        return -1;
    }
    //增删查改
    function crud(){
        //删除行
        $(document).on("click",'.delurl',function(){
            t.row($(this).closest('tr')[0]).remove().draw(false);
        });
        //编辑行数据
        $('#example tbody').on( 'click', '.editurl', function () {
            var row = t.row( $(this).parents('tr') ).data();
            var fields = $("form#add").serializeArray();
            console.log(row);
            var conf = {
                'name':1,
                'ps':2,
                'state':3,
                'type':6,
                'date':4
            };
            for(var key in conf){
                $("#edit input[name='"+key+"']").val(row[conf[key]]);
            }

            $('#edit button[type="submit"]').click(function(){
                row[conf['name']] = $.trim($('#edit input[name="name"]').val());
                row[conf['ps']] = $.trim($('#edit input[name="ps"]').val());
                row[conf['type']] = $(".js-example-basic-single").eq(1).val();
                row[conf['state']] = fp2.getForm().getValues()['state'];
                row[conf['date']] = $.trim($('#edit input[name="date"]').val());
                for(var key in row){
                    if(row[key] == ''){
                        alert('表单不能为空!');
                        return false;
                    }
                }
                var index = getArrayIndex(row,init_data);
                init_data[index] = row;
                t.rows($('tr')).remove().draw(false);
                addData();
                $('form#edit').get(0).reset();
                return false;
            });
        });
        //添加
        $('#add button[type="submit"]').click(function(){
            var post = {};
            post['number'] = init_data.length+1;
            post['name'] = $.trim($('#add input[name="name"]').val());
            post['ps'] = $.trim($('#add input[name="ps"]').val());
            post['type'] = $(".js-example-basic-single").eq(0).val();
            post['state'] = fp.getForm().getValues()['state'];
            post['date'] = $.trim($('#add input[name="date"]').val());
            post['last_login'] = post['date'];
            //console.log(post);
            for(var key in post){
                if(post[key] == ''){
                    alert('表单不能为空!');
                    return false;
                }
            }
            $.post('ajax.php',post,function(data){
                data = $.parseJSON(data);
                //console.log(data);return false;
                if(data){
                    var row = data.data;
                    var row_data = [row['number'],row['name'],row['ps'],row['state'],row['date'],row['last_login'],row['type']];
                    t.row.add(row_data).draw( false );
                    init_data.push(row_data);
                    $('form#add').get(0).reset();
                }else{
                    alert('账号添加失败!');
                }
            });
            return false;
        });
    }
});