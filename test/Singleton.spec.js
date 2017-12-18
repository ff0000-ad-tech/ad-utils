import { expect } from 'chai'

import Singleton from '../lib/Singleton'

describe('Singleton', function() {
	it('uses only one instance of itself', function() {
		const inst1 = new Singleton()
		const inst2 = new Singleton()
		expect(inst1).to.equal(inst2)
	})

	it('can be extended for other classes', function() {
		class Guy extends Singleton {
			constructor(name) {
				super()
				this.name = name
			}
		}

		const tim = new Guy('Tim')
		const tim2 = new Guy('Tam')

		expect(tim.name).to.equal(tim2.name)
	})
})