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

class ChainedHashTable {

	table = new Array(19);
	
	setItem = (key, value) => {
		const idx = hashStringToInt(key, this.table.length);
		if (this.table[idx]) {
			this.table[idx].push([key, value]);
		} else {
			this.table[idx] = [[key, value]];
		}
	}

	getItem = (key) => {
		const idx = hashStringToInt(key, this.table.length);
		// if this key doesn't exist yet return null
		if (!this.table[idx]) {
			return null;
		}
		// find the of the first array that matches the key
		// return the second elem of array (ie. the value, of the KVP)
		return this.table[idx].find(ind => ind[0] === key)[1];
	};
}

const myTable = new ChainedHashTable();
myTable.setItem('firstName', 'bob');
myTable.setItem('lastName', 'tim');
myTable.setItem('age', 5);
myTable.setItem('dob', '1/2/3');

console.log(myTable.getItem('firstName'));
console.log(myTable.getItem('lastName'));
console.log(myTable.getItem('age'));
console.log(myTable.getItem('dob'));