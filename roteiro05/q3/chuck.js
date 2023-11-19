class PWChuck extends HTMLElement {
	constructor() {
        super();
        // element created
    }

	connectedCallback() {
		let time = this.getAttribute('tempo') || "10000"
		this.updateInterval = parseInt(time)
        this.lastTime = new Date()
		this.updateTime = -1
		setInterval(() => {this.update()}, 500)
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
    }

	async update() {
		let currDate = new Date()
		let diffDate = new Date(currDate - this.lastTime)
		let diffMs = diffDate.getMilliseconds()
		if (this.updateTime - diffMs < 0) {
			this.currentJoke = await this.getJoke()
			this.lastTime = new Date()
			this.updateTime = this.updateInterval
		} else {
			this.updateTime -= diffMs
		}
		this.innerHTML = `<div>
							<p>${this.currentJoke}</p>
						  </div>
						  <div>
							<p>${this.updateTime/1000}</p>
						  </div>`
	}

	async getJoke() {
		const response = await fetch("https://api.chucknorris.io/jokes/random")
		const json = await response.json()
		return json.value
	}

    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define("pw-chuck", PWChuck);
