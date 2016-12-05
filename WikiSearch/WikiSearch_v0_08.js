//JS // v.08 // 04-DEC-2016 // k.patenaude
//JQuery loaded: https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js

//buiuld wiki API query from user input:
//broken into pieces for potential future user input variables
function queryBuild(inPut) {
	var endpoint = "https://en.wikipedia.org/w/api.php",
		action = "action=query",
		generator = "generator=allpages",
		properties = "prop=revisions",
		gaplimit = "gaplimit=10",
		gapfrom = "gapfrom=",  //append searchterm to this variable <<<<
		content = "rvprop=content",
		indexes = "indexpageids",
		format = "format=json",
		gapfilter = "gapfilterredir=nonredirects",
		callback = "&callback=?";
		return endpoint + "?" + action + "&" + generator + "&" + gaplimit + "&" + gapfrom + 
			inPut + "&" + gapfilter + "&" + properties + "&" + content + "&" + indexes + "&" + format + callback; 
		//holder add content later:  
}


//Output Parsing Functions  ####################################################
//Working for ~ 80% of entrires:
function stripNewLine(inString){
	return inString.replace(/\n/g, "");
}

//function for template removal... works for ordered matched brackets: 
// '{{XXX}}, {{XXX{{YYYY}}ZZZ}}, etc.. 
function matchedBracketKill(inString){
	var outPut = inString.split(/\}\}/);
	var matches = [];
	var logicOut = [];
	
	for(j=0; j<outPut.length; j++){
		if (outPut[j].match(/\{\{/g) !== null) {
			matches.push(outPut[j].match(/\{\{/g).length)
		} else {
			matches.push(0);
		}
	}
	for(k=0; k<matches.length;){
		if(matches[k] > 1){
			var count = matches[k];
			for(l=0; l<count; l++){
				outPut[k] = "";
				k++;
			}
		} else {
			outPut[k] = outPut[k].replace(/\{\{.*/, "");
			k++;
		}
	}
	return outPut.join("");
}

//function removes Category boxes '[[Cat]] and logical === (sectioning) constructs:
function catAndEqualKill(inString){
	var outString = inString.replace(/\[\[Category:.*?\]\]/g, "")
	return outString.replace(/==.*?==/g, "");
}

//function removes 'front parts' of links: [[XXXXXXXX|keep]]
function frontLinkKill(inString){
	var frontLinkParse = inString.split("]]");	
				for(j=0; j<frontLinkParse.length; j++){
					frontLinkParse[j] = frontLinkParse[j].replace(/\[\[.*?\|/g, ""); //wipe [[...| from entries
					frontLinkParse[j] = frontLinkParse[j].replace(/\[\[/g, ""); //wipe remaining [[
				}
	return frontLinkParse.join("").match(/.*?\./);
}
	
//combine all parsing functions:
function bigKill(inString){
	return frontLinkKill(catAndEqualKill(matchedBracketKill(stripNewLine(inString))));
}

//####################################################################################

//get user input / output links
function getter(){
		
	var term = document.getElementsByName("searchterm")[0].value;
	var wikiapi = queryBuild(term); 
	console.log(wikiapi);
	
	$.getJSON(wikiapi, function(data) {
		var pageHits = data.query.pageids,  //page ids
			outputTitle = "",  //output init
			outputContent = [], //for troubleshooting
			hrefBuild = "",
			parsedContent = "",
			combo = "";

		for(i=0; i<pageHits.length; i++){
			outputTitle = (data.query.pages[pageHits[i]].title);
			outputContent[i] = (data.query.pages[pageHits[i]].revisions[0]["*"]);
			hrefBuild = "https://en.wikipedia.org/wiki/index.html?curid=" + pageHits[i];
			parsedContent = bigKill(outputContent[i]); //bigkill function parses output
			
			//build html output: #######################################################
			combo += '<p class="linkBoxes"><a class="btn" href="' + hrefBuild + '" target="_blank">' + outputTitle + ": " + parsedContent + '</a></p>';
		}
		
		$("#outString").html(combo); //actual output
	});
}
