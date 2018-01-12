// 				code by Technostalgic
// 	http://technostalgic.tech | @TechnostalgicGM

function formatDocs(docdata){
	var spldat = docdata.split('\n');
	var groups = [];
	var lastgroup = 0;
	var container = document.createElement("div");
	for(var i = 0; i < spldat.length; i++){
		var indents = countIndentation(spldat[i]);
		var str = truncateIndents(spldat[i]);
		str = wrapBrackets(str);
		
		var elem = document.createElement("div");
		var clss = "";
		
		switch(indents){
			case 0:
				clss = "mainDivider";
				break;
			case 1:
				clss = "subDivider";
				break;
			case 2:
				clss = "category";
				break;
			case 3:
				clss = "descriptor";
				break;
		}
		
		elem.innerHTML = "<span class='afmSpan " + clss + "'>" + str + "</span>";
		elem.classList.add("afmDiv");
		
		groups[indents] = elem;
		
		if(indents > 0)
			groups[indents - 1].appendChild(elem);
		else
			container.appendChild(elem);
		lastgroup = indents;
	}
	document.body.appendChild(container);
	return container;
}

function countIndentation(str){
	var r = 0;
	while(str[r] == '\t')
		r++;
	return r;
}
function truncateIndents(str){
	return str.substr(countIndentation(str));
}

function wrapBrackets(str){
	var found = true;
	var r0 = 0;
	var r1 = 0;
	var fstr = "";
	
	while(found)
	{
		r0 = r1;
		while(str[r0] != '['){
			if(r0 >= str.length){
				found = false;
				break;
			}
			r0++;
		} if(!found) break;
		
		fstr = fstr + str.substr(r1, r0 - r1) + "<span class='afmSpan inBrackets'>";
		r1 = r0;
		
		while(str[r1] != ']'){
			if(r1 >= str.length){
				found = false;
				break;
			}
			r1++;
		}
		if(str[r1] == ']') r1++;
		fstr = fstr + str.substr(r0, r1 - r0) + "</span>";
	}
	fstr = fstr + str.substr(r1);
	
	return fstr;
}