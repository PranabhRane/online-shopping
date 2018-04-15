$(function() {
	
	// solving the active menu problem
	switch (menu) {

	case 'About Us':
		$('#about').addClass('active');
		break;
	case 'Contact Us':
		$('#contact').addClass('active');
		break;
	case 'All Products':
		$('#listProduct').addClass('active');
		break;
		
	case 'Manage Products':
		$('#manageProducts').addClass('active');
		break;
		
	default:
		if (menu == "Home")
			break;
	 $('#listProduct').addClass('active');
	   $('#a_' + menu).addClass('active');
		break;
	}

	
	var $table=$('#productListTable');
	if($table.length){
		
		var jsonUrl='';
		if(window.categoryId==''){
			
			jsonUrl=window.contextRoot+'/json/data/all/products';

		}
		else
		{
		
			jsonUrl=window.contextRoot+'/json/data/category/'+window.categoryId+'/products';
			
		}
		
		
		
		$table.DataTable({
			lengthMenu : [ [ 3, 5, 10, -1 ], [ '3 Records', '5 Records', '10 Records', 'ALL' ] ],
			pageLength : 3,
			
			ajax:{
				url:jsonUrl,
				dataSrc:''
			},
			
			columns: [
			          	{
			          		data:'code',
			          		bSortable:false,
			          		mRender: function(data,type,row){
			          			return '<img src="'+window.contextRoot+'/resources/images/'+data+'.jpg" class="dataTableImage"/>';
			          		}
			          	
			          	},
			          	{
			          		data:'name'
			          	},
			          	{
			          		data:'brand'
			          	},
			          	{
			          		data:'unitPrice',
			          		mRender:function(data,type,row){
			          			return '&#8377;'+data;
			          		}
			          		
			          	},
			          	{
			          		data:'quantity',
			          		mRender:function(data,type,row){
			          			if(data<1){
			          				return '<span style="color:red"> Out of Stock!</span>';
			          			}
			          			return data;
			          		}
			          	
			          	},
			          	{
			          		data:'id',
			          		bSortable:false,
			          		mRender:function(data,type,row){
			          			var str='';
			          			str+='<a href="'+contextRoot+'/show/'+data+'/product" class="btn btn-primary"><i class="fa fa-eye"></i></a>&#160;';
			          			
			          			if(row.quantity<1){
			          				str+='<a href="javascript:void(0);" class="btn btn-success disabled"><i class="fa fa-shopping-cart"></i></a>';
				          			
			          			}
			          			else
			          			{
			          				str+='<a href="'+contextRoot+'/cart/add/'+data+'/product" class="btn btn-success"><i class="fa fa-shopping-cart"></i></a>';
				          			
			          			}
			          			
			          			return str;
			          		}
			          	}
			          	
			          ]
		});
	}
	
	var $alert=$('.alert');
	if($alert.length){
		setTimeout(function(){
			$alert.fadeOut("slow");
		},3000)
	}
	
	
	
	//-- Data Table for Admin
		
	var $adminProductstable=$('#adminProductsTable');
	if($adminProductstable.length){
		
		var jsonUrl=window.contextRoot+'/json/data/admin/all/products';
		
		
		
		
		$adminProductstable.DataTable({
			lengthMenu : [ [ 10, 30, 50, -1 ], [ '10 Records', '30 Records', '50 Records', 'ALL' ] ],
			pageLength : 30,
			
			ajax:{
				url:jsonUrl,
				dataSrc:''
			},
			
			columns: [
			          	{
			          		data:'id',
			          	},
			          	{
			          		data:'code',
			          		bSortable:false,
			          		mRender: function(data,type,row){
			          			return '<img src="'+window.contextRoot+'/resources/images/'+data+'.jpg" class="adminDataTableImage"/>';
			          		}
			          	
			          	},
			          	{
			          		data:'name'
			          	},
			          	{
			          		data:'brand'
			          	},
			          	{
			          		data:'quantity',
			          		mRender:function(data,type,row){
			          			if(data<1){
			          				return '<span style="color:red"> Out of Stock!</span>';
			          			}
			          			return data;
			          		}
			          	
			          	},
			          	{
			          		data:'unitPrice',
			          		mRender:function(data,type,row){
			          			return '&#8377;'+data;
			          		}
			          		
			          	},
			          	
			          	{
			          		data:'active',
			          		mRender:function(data,type,row){
			          			var str='';
			          			str+='<label class="switch">';
			          			if(data){
			          			str+='<input type="checkbox" checked="checked" value="'+row.id+'">';
			          			}
			          			else{
			          				str+='<input type="checkbox" value="'+row.id+'">';
				          				
			          			}
			          			
			          			str+='<span class="slider"></span></label>';
			          			return str;
			          		}
			          	
			          	},
			          	{
			          		data:'id',
			          		bSortable:false,
			          		mRender:function(data,type,row){
			          			var str='';
			          			str+='<a href='+window.contextRoot+'/manage/'+data+'/product class="btn btn-warning">';
			          			str+='<i class="fa fa-edit" style="font-size:24px"></i></a>';
			          			return str;
			          		}
			          	
			          	}
			          	
			          	
			          ],
			          initComplete : function(){
			        	  
			        	  var api=this.api();
			        	 
			        	  api.$('.switch input[type="checkbox"]').on('change',function(){
			        		
			        		  var checkbox=$(this);
			        			var checked=checkbox.prop('checked');
			        			var dMsg=(checked)?'You want to Activate Product?':'You Want to deactivate Product?';
			        			var value=checkbox.prop('value');
			        			
			        			bootbox.confirm({
			        				size:'medium',
			        				closeButton: false,
			        				title:'Product Activation and Deactivation',
			        				message:dMsg,
			        				callback:function(confirmed){
			        					if(confirmed)
			        					{
			        						console.log(value);
			        						
			        						var activationUrl=window.contextRoot+'/manage/product/'+value+'/activation';
			        						$.post(activationUrl,function(data){
			        							bootbox.alert({
				        							size:'medium',
				        							closeButton: false,
				        							title:'Information',
				        							message:'You are going to perform operation on product '+value
				        						});
			        							
			        						});
			        						
			        						
			        						
			        					}
			        					else
			        					{
			        						checkbox.prop('checked',!checked);
			        					}
			        				}
			        			
			        			});
			        			
			        		});
			          }
		});
	}
	
	
	//--------------
	
	//Validation for Category
	var $categoryForm=$('#categoryForm');
	if($categoryForm.length){
		$categoryForm.validate({
			
			rules : {
				name:{
					required:true,
					minlength:2
				},
				description:{
					required:true
				}
		
			},
			
			messages:{
				
				name:{
					required:'Please add the category name!',
					minlength: 'The Category name should not be less than 2 Characters '
				},
				description:{
					required:'Please add description for this category'
				}
				
			},
			errorElement : 'em',
			
			errorPlacement:function(error,element){
				error.addClass('help-block');
				error.insertAfter(element);
			}
			
		
			
		});
		
		
	}
	
	
	//Validation for Category
	var $loginForm=$('#loginForm');
	if($loginForm.length){
		$loginForm.validate({
			
			rules : {
				username:{
					required:true,
					email:true
				},
				password:{
					required:true
				}
		
			},
			
			messages:{
				
				username:{
					required:'Please enter the username!',
					email: 'Please enter valid email address!'
				},
				password:{
					required:'Please enter the password'
				}
				
			},
			errorElement : 'em',
			
			errorPlacement:function(error,element){
				error.addClass('help-block');
				error.insertAfter(element);
			}
			
		
			
		});
		
		
	}
	
		
	
});




