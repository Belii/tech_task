window.addEventListener("load", loader, false);

function loader(){

		var liElems = document.getElementsByTagName("li");

		var iElem,										// Elem <i>
				liElem,										// Elem <li>
				ulElem,										// Elem <Ul>
				liElemIdFest,
				liElemIdLast;
		var arrayItemsLiId = [];

		document.addEventListener("click", clickItem, false);

		function clickItem(e){											// event target
			var iElem = e.target;
			var liElem = e.target.parentNode;
			var liElemId = liElem.id;
			var liElemIdFest = +liElemId.charAt(liElemId.length - 2);		//penultimate number id Item - Li
			var liElemIdLast = +liElemId.charAt(liElemId.length - 1);		//last nomber id Item - Li

			matrixSquea(liElemIdFest, liElemIdLast);

			function matrixSquea(liId3, liId4) {
				if (liId3 === 0 && liId4 === 0){
						target(liId3, liId4);
						right(liId3, liId4);
						down(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 === 6 && liId4 === 0){
						target(liId3, liId4);
						right(liId3, liId4);
						up(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 === 0 && liId4 === 5){
						target(liId3, liId4);
						left(liId3, liId4);
						down(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 === 6 && liId4 === 5){
						target(liId3, liId4);
						left(liId3, liId4);
						up(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 && liId4 === 0){
						target(liId3, liId4);
						up(liId3, liId4);
						down(liId3, liId4);
						right(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 && liId4 === 5){
						target(liId3, liId4);
						up(liId3, liId4);
						down(liId3, liId4);
						left(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 === 0 && liId4){
						target(liId3, liId4);
						left(liId3, liId4);
						right(liId3, liId4);
						down(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 === 6 && liId4){
						target(liId3, liId4);
						left(liId3, liId4);
						right(liId3, liId4);
						up(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					} else if (liId3 && liId4){
						target(liId3, liId4);
						left(liId3, liId4);
						right(liId3, liId4);
						up(liId3, liId4);
						down(liId3, liId4);
						//console.log("target: " + liId3 + " - " + typeof(liId3) + ", " + liId4 + " - "+ typeof(liId4));
					}
			}

			function target(elemFest, elemLast) {												//Target Element 
				//console.log("target - " + elemFest + " " + elemLast);
				newItemTarget= "li" + elemFest + elemLast;
				verifyItemDel(newItemTarget);
			}

			function left(elemFest, elemLast) {													//Element from Left Side
				var elemLast = elemLast - 1;
				//console.log("left - " + elemFest + " - " + typeof(elemFest) + " , " + elemLast + " - " + typeof(elemLast));
				newItemLeft= "li" + elemFest + elemLast;
				verifyItemDel(newItemLeft);
			}

			function right(elemFest, elemLast) {												//Element from Rite Side
				var elemLast = elemLast + 1;
				//console.log("right - " + elemFest + " - " + typeof(elemFest) + " , " + elemLast + " - " + typeof(elemLast));
				newItemRight= "li" + elemFest + elemLast
				verifyItemDel(newItemRight);
				}

			function up(elemFest, elemLast) {														//Element from the top (up)
				var elemFest = elemFest - 1;
				//console.log("up - " + elemFest + " - " + typeof(elemFest) + " , " + elemLast + " - " + typeof(elemLast));
				newItemUp= "li" + elemFest + elemLast
				verifyItemDel(newItemUp);
			}

			function down(elemFest, elemLast) {													//Element from the bottom
				var elemFest = elemFest + 1;
				//console.log("down - " + elemFest + " - " + typeof(elemFest) + " , " + elemLast + " - " + typeof(elemLast));
				newItemDown= "li" + elemFest + elemLast
				verifyItemDel(newItemDown);
			}

			function verifyItemDel(liid) {															//Verify Element by className and id
				for (var i = 0; i<liElems.length; i++) {
					if (liElems[i].id === liid && liElems[i].firstChild.className === iElem.className){
						liElems[i].firstChild.style.display = "none";
						//liElems[i].style.background = "red";
						verifyPush(liid)
					}
				}
			}

			function verifyPush(liIdPush) {															//Push Elements to Array, and verify to unique 
				if (arrayItemsLiId.indexOf(liIdPush) === -1) {
					arrayItemsLiId.push(liIdPush);
					arrayItems();
				}
			}

			function arrayItems() {																			// All elements of Array is verify, and extracting 2 last numbers
					for (var key in arrayItemsLiId) {
						if (arrayItemsLiId.hasOwnProperty(key)) {
							//console.log( arrayItemsLiId[key]+ " , " + typeof(arrayItemsLiId[key]) + " new version verify" );
							var liElemIdUpFast = +arrayItemsLiId[key].charAt(arrayItemsLiId[key].length - 2);
							var liElemIdUpLast = +arrayItemsLiId[key].charAt(arrayItemsLiId[key].length - 1);
							//console.log(liElemIdUpFast + " - " + typeof(liElemIdUpFast) + " , " + liElemIdUpLast + " - " + typeof(liElemIdUpLast));
							matrixSquea(liElemIdUpFast, liElemIdUpLast)
						}
					}
			}
		};
};