function load(arg,dossier){
	arg = arg.split(",");
	for (var i in arg){
		var script = document.createElement("script");
		script.src = (window.hasOwnProperty("pasUnTest") ? "test/" : "")
				+ dossier +arg[i] + ".js";
		document.body.appendChild(script);
	}
}
load("serialisation,ElementGraphique,Planning,Colonne,Evenement,Periode,Graphique,Categorie,Page","../js/")
load("gererCategorie,gererColonne,gererCreationPlanning,gererEvenement,gererPolice","../cont/")
load("controllerImpl","../")
