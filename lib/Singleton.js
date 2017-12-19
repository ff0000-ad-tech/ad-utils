// Utility class for implementing Singleton pattern (commonly shared stateful module)
let instance;
class Singleton {
	constructor() {
		if (!instance) {
			instance = this;
		}

		return instance;
	}
}

export default Singleton