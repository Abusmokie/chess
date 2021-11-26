draggables = document.querySelectorAll('img')
tiles = document.querySelectorAll('.col')

function getImgIndex(image){
	return [parseInt(image.parentNode.parentNode.id),parseInt(image.parentNode.id)]
}
function getTileIndex(tile){
	return [parseInt(tile.parentNode.id),parseInt(tile.id)]
}

draggables.forEach(draggable => {
	draggable.addEventListener('dragstart', () => {
		// console.log("from", getImgIndex(draggable))
		draggable.parentNode.classList.add('fromtileclass')
		draggable.id = "current"
	})
	draggable.addEventListener('touchstart',() => {
		draggable.parentNode.classList.add('fromtileclass')
		draggable.id = "current"
	})
	draggable.addEventListener('touchend',() => {
		draggable.removeAttribute('id')
		document.querySelector('.fromtileclass').classList.remove('fromtileclass')
	})
	draggable.addEventListener('dragend', () => {
		draggable.removeAttribute('id')
		document.querySelector('.fromtileclass').classList.remove('fromtileclass')
	})
})

tiles.forEach(tile => {
	tile.addEventListener('dragover',(e) => {
		e.preventDefault()
		tile.classList.add('totileclass')
	})
	tile.addEventListener('dragleave',(e) => {
		// e.preventDefault()
		tile.classList.remove('totileclass')
	})
	tile.addEventListener('drop',() => {
		const draggable = document.querySelector('#current')
		if (tile.childNodes.length == 0){
			tile.appendChild(draggable)
		}
		else if(draggable.src.includes('white') && tile.firstChild.src.includes('black')){
			tile.removeChild(tile.firstChild)
			tile.appendChild(draggable)
		}
		else if(draggable.src.includes('black') && tile.firstChild.src.includes('white')){
			tile.removeChild(tile.firstChild)
			tile.appendChild(draggable)
		}
		else {
			console.log("invalid move")
		}
		document.querySelector('.totileclass').classList.remove('totileclass')
	})
})
