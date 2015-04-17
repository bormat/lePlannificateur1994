var gererPolice=function($){
	/*******************************/
	/********Changement police*************/
	/*******************************/
	$.changerPolice=function(){			
			var f=$.formPerso;
			$$("#changeStyle" + f.classCss).html("."+f.classCss+"{color:"+f.polCouleur+";font-size:"+
			f.polTaille+"px;font-family:"+f.polStyle+";}");
	}
	
	$.font=[
            'Arial, Helvetica, sans-serif',
			'Arial Black, Gadget, sans-serif',
			'Comic Sans MS, cursive',
			'Courier, monospace',
			'Courier New, Courier, monospace',
			'Garamond, serif',
			'Georgia, serif',
			'Gill Sans,Geneva,sans-serif',
			'Impact, Charcoal, sans-serif',
			'Lucida Console, Monaco, monospace',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'MS Sans Serif, Geneva, sans-serif',
			'MS Serif, New York, sans-serif',
			'Palatino Linotype,Book Antiqua,Palatino,serif',
			'Symbol, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',
			'Webdings, sans-serif',
			'Wingdings, Zapf Dingbats, sans-serif',
            ];
	
}