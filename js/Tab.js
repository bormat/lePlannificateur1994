//length ne se calcule plus tout seul une foix h�rit� de tableau il faut le reprogrammer
//notation en crochet pour l'ajout(push) prohib� car on ne peux recacul� length;
//reste possible les modification et acc�s en lecture via crochets

Class.create("Tab", {
	extend:Array,
	initialize : function(){
		Object.defineProperties(this, {
			"length": {
				enumerable: false,
				writable:true
			},
		});
		if( !isNaN(arguments[0]) && arguments.length == 1){
			this.length=arguments[0];
		}else{
			this.length=0;
			this.push.apply(this,arguments);
		}
	},
	push : function(){
		for (var i in arguments){
			this[this.length] = arguments[i];
			this.length++;
		}
		return this.length;
	},
	//n�gatif part de la fin ,valeur faculatif 
	at : function(i, valeur){
		if (i < 0){
			i = this.length + i 
		}else if(i>this.length){
			this.length = i;
		}
		return this[i] = valeur || this[i];
	},
	last:function(x){
		return(this.at(this.length - 1,x));
	},
	suppElmt: function(elmt){
		var indiceMonEvnmt = this.indexOf(elmt);
		if (indiceMonEvnmt > -1){
			return this.splice(indiceMonEvnmt,1);
		}
		return false;
	},
	ArrayToTab: function(arr){
		arr.__proto__ = Tab.prototype
		//vieux navig
		if 	(arr.__proto__!= Tab.prototype){
			var tab = new Tab;
			for(var i = 0; i< arr.length;i++){
				tab[i] = arr[i];
			}
			arr.length=i;
		}
	},
	//m�me les indice de type chaine sont compt�
	size : function(){
		var size = 0;
		for(var i in this){
			size++;
		}
		return size;
	}
	
})

for( var prop in Tab.prototype ){
	Object.defineProperty(Tab.prototype, ""+prop, {
		enumerable: false, //exlu des for in;
	});
}

for( var prop in Tab.prototype.__proto__ ){
	Object.defineProperty(Tab.prototype.__proto__, prop, {
		enumerable: false, //exlu des for in;
	});
}