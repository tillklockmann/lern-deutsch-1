var ArtChallenge = {
	derDieDas : document.getElementById("btnBox").getElementsByTagName("button"),
	mistake : 0,
	mstkArr : [],
	mstkBox : document.getElementById("mstkBox"),
	nomenBtns : document.getElementById("nomenBox").getElementsByTagName("button"),
	nomenBtnsLen : document.getElementById("nomenBox").getElementsByTagName("button").length,
	correctGuesses : 0,
	active : 1,
	activate : function(el){
		if(this.active != el.dataset.genus){
			var activeNode = this.active - 1;
			var newActiveNode = el.dataset.genus - 1;
			this.derDieDas[activeNode].classList.remove("active");
			// set active to new genus
			this.active = el.dataset.genus;
			// add class 'active' to button
			this.derDieDas[newActiveNode].classList.add("active");
		}
	},
	checkGenus : function(el){
		if(el.dataset.genus == this.active){
			el.classList.remove("w3-white");
			
			if(el.dataset.genus == 1){
					el.classList.add("w3-green");
					el.setAttribute("disabled", true);
			}else if(el.dataset.genus == 2){
					el.setAttribute("disabled", true);
					el.classList.add("w3-blue");
			}else{
					el.setAttribute("disabled", true);
					el.classList.add("w3-red");
			}
			
			this.mstkBox.innerHTML = "richtig";
			this.mstkBox.classList.add("fade");
			
			

			this.correctGuesses++;
			if(this.correctGuesses == this.nomenBtnsLen){
				this.mstkBox.innerHTML = "Bingo";
				this.mstkBox.classList.add("w3-animate-left");
				this.mstkBox.classList.add("fade");
				this.mstkBox.style.opacity = 1;
				// create Report
				var mssg = this.mstkArr.length + ' Fehler ';
				if(this.mstkArr.length > 0){
					var mssg = mssg + '(';
					for(var i = 0; i < this.mstkArr.length; i++){
						var mssg = mssg +  this.mstkArr[i];
						if((this.mstkArr.length - 1) > i){
							var mssg = mssg +  ', ';
						}
					}
					var mssg = mssg + ')';
				}
				this.rearrangeBtns();
				// displ success mssg inside mstk display el
				document.getElementById("Fehler").innerHTML = mssg;
			}else{
				setTimeout(function(){
					this.mstkBox.classList.remove("fade");
				},1000);
			}
		
		}else{

			this.dsplMstk();
			if(!inArray(trim(el.innerHTML), this.mstkArr)){
				this.mstkArr.push(trim(el.innerHTML));
			}
		}
	},
	dsplMstk : function(){
		this.mstkBox.innerHTML = "falsch";
		document.getElementById("mstkBox").classList.add("fade", "shake");
		setTimeout(function(){
			this.mstkBox.classList.remove("fade", "shake");
		},2000)
	},
	rearrangeBtns : function(){
		Array.prototype.forEach.call(this.nomenBtns, function(el){
			el.classList.add("ld-fade-out");
		})
		setTimeout(function(){
			var btnsArr = Array.prototype.slice.call(ArtChallenge.nomenBtns);
			btnsArr.sort(function(a,b){
				return a.dataset.genus - b.dataset.genus;
				// var genusA = a.dataset.genus;
				// var genusB = b.dataset.genus;
				// if(genusA > genusB) return 1;
				// if(genusA < genusB) return -1;
				// return 0
			});
			// Array.prototype.forEach.call(ArtChallenge.nomenBtns, function(el){
			// 	el.remove();
			// });
			// btnDiv.innerHTML = '';
			btnsArr.forEach(function(el){
				el.classList.add("ld-fade-in");
				// console.log("btnsArr el: " + el);
				// el.disabeld = true;
			
				if(el.dataset.genus == 1){
					document.getElementById("das").appendChild(el);
				}
				if(el.dataset.genus == 2){
					document.getElementById("der").appendChild(el);
				}
				if(el.dataset.genus == 3){
					document.getElementById("die").appendChild(el);
				}

				el.style.opacity = 1;
				el.style.cursor = 'default';

				// this.bind(ArtChallenge, el);
				// console.log("this: " + this).bind(ArtChallenge);
			});
			var spanBox = document.getElementById("spanBox");
			var span = spanBox.getElementsByTagName("span");
			Array.prototype.forEach.call(span, function(el){
				el.style.display = "block";
				el.style.marginTop = '8px';
				Array.prototype.forEach.call(el.children, function(el){
					el.removeAttribute("disabled");
					el.style.display = "inline-block";
					el.classList.remove("w3-hide");
				});
			});
			var btns = document.getElementById("btnBox").getElementsByTagName("button");
			Array.prototype.forEach.call( btns, function(el){
				el.classList.add("w3-hide");
			});
			// var appBtns = document.getElementById("nomenBox").getElementsByTagName("button");
			// Array.prototype.forEach.call(appBtns, function(el){
			// 	el.classList.add("ld-fade-in");
			// });
			document.getElementById("nomenBox").classList.remove("w3-padding-64");
			document.getElementById("back").classList.add("show");
			var words = document.getElementById("spanBox").getElementsByClassName("words");
			Array.prototype.forEach.call(words, function(el){
				el.disabled = true;
			});
		},1000);

		Array.prototype.forEach.call(ArtChallenge.derDieDas, function(el){
			el.classList.add("ld-fade-in");
			el.style.borderBottom = 'none';
		});

	}
}

// var nomenBtns = document.getElementById("nomenBox").getElementsByTagName("button");
Array.prototype.forEach.call(ArtChallenge.nomenBtns, function(el){
	el.addEventListener("click", ArtChallenge.checkGenus.bind(ArtChallenge, el));
})

Array.prototype.forEach.call(ArtChallenge.derDieDas, function(el){
	el.addEventListener("click",ArtChallenge.activate.bind(ArtChallenge, el));
});
