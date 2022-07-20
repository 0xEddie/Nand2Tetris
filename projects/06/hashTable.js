function hashStringToInt(s, tableSize) {
	// DIY hash function. Does JS have a stdlib hash function? Python has djb2 I think
	let hash = 17;

	for (let i=0; i < s.length; i++) {
		hash = (13 * hash * s.charCodeAt(i)) % tableSize;
	}
	
	return hash;
}

class HashTable {

	table = new Array(19);
	
	setItem = (key, value) => {
		const idx = hashStringToInt(key, this.table.length);
		this.table[idx] = value;
	}

	getItem = (key) => {
		const idx = hashStringToInt(key, this.table.length);
		return this.table[idx];
	}

}

const myTable = new HashTable();
myTable.setItem('firstName', 'bob');
console.log(myTable.getItem('firstName'));