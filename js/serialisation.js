	/*ce module peut être utilisé à part pour serialiser n'importe quel objet, chaine, nombre, tableau*/
	
	/*****************************************************************************************/
	/************************Objet et contenu enumerable vers Chaine**************************/
	/*****************************************************************************************/

	var serializeObjet = function(theMainObject){
		if(!(theMainObject instanceof Object)){
			throw "veuillez passer un objet et non un type primitif"
		}
		function addSlashes(ch){
			if (typeof ch == "string"){
				ch = ch.replace(/\\/g,"\\\\")
				ch = ch.replace(/\'/g,"\\'")
				ch = ch.replace(/\"/g,"\\\"")
			}
			return ch
		}
		var tab=[];
		function genererTableauDeChaine(obj){
			if(obj.serializationName){
				obj.serializationName = obj.serializationName;// ceci n'est pas inutile __proto__ vers objet
			}else if(obj instanceof Array){
				obj.serializationName = "Array"; //non utilisé dans notre code mais autant faire une bibliotèque complète
			}
			obj.myid = tab.push(obj) - 1;
			var chaine = new Tab();
			chaine.push("{");
			for(var i in obj){
				if (i != "myid" && obj.hasOwnProperty(i)){
					chaine.push(i,":");
					if(typeof obj[i] == "number" || obj[i] instanceof Function){
							chaine.push(obj[i]);
					}else if ( obj[i] instanceof Object){
						if (obj[i].myid == undefined){
							genererTableauDeChaine(obj[i]);
						}
						chaine.push("'tab[",obj[i].myid,"]'");
					}else{
						chaine.push("'",addSlashes(obj[i]),"'");
					}					
					chaine.push(",");
				}
			}
			chaine.last("}");//que c'est beau last pour écraser les virgules
			tab[obj.myid] = chaine.join("");
		}
		function deleteMyid(obj){
			if(obj && obj.myid != undefined){
				delete obj.myid;
				for(var i in obj){
					if(obj.hasOwnProperty(i)){
							deleteMyid(obj[i]);
					}
				}
			}
		}		
		genererTableauDeChaine(theMainObject);
		deleteMyid(theMainObject);	
		
		return "[" + tab.join(",\n") +"]"
	}


	/*****************************************************************************************/
	/************************************Chaine vers Objet************************************/
	/*****************************************************************************************/

		
	var parseChaine = function(chaine){
		//function principal
		function parse(chaine){
			eval("tab="+chaine);
			genererHeritage2()
			for( var i in tab){ 
				var obj=tab[i];
				for( var prop in obj){				
					if (contientUneRef(obj,prop)){
						eval ("obj[prop]="+ obj[prop]);
					}
				}
			}
			nettoyage();
			remettreLengthAuFauxTableaux();
		}
		
		function contientUneRef(obj,prop){
			return  prop && obj[prop].indexOf && obj[prop].indexOf("tab[") != -1 
		}
		
		function genererHeritage2(obj){
			for( var i in tab){ 
				var theClass = window[tab[i].serializationName] || {};
				theClass.prototype = theClass.prototype || {};
				var obj = (theClass == Array) ? [] : Object.create(theClass.prototype) // bonne classe
				// on remmet les infos
				for (var j in tab[i]){
					obj[j] = tab[i][j];
				}
				tab[i] = obj 
			}
		}	
	
		function nettoyage(){
			for(var i in tab){
				delete tab[i].serializationName;
			}
		}
		//un faux tableau est un objet héritant de Array mais dont la length n'est du coup plus automatique
		function remettreLengthAuFauxTableaux(){
			for( var i in tab){
				if(tab[i] instanceof Array ){
					var max=-1;
					Object.defineProperties(tab[i], {
						"length": {
							enumerable: false,
							writable: true
						},
					});
					for( var j in tab[i]){
						if (!isNaN(j) && j > max){
							max = parseInt(j);
						}
					}
					tab[i].length = max+1;
				}		
			}
		}
		var tab;
		parse(chaine);
		return tab[0];
	}