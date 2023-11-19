class PWChuck extends HTMLElement {
	constructor() {
        super();
        // element created
    }

	connectedCallback() {
		let username = this.getAttribute('username') || "medeirosgabriel"
		fetch(`https://api.github.com/users/${username}`, {
			method: 'GET',
    		headers: new Headers({
    			"Accept": "application/vnd.github+json",
				"Authorization": "Bearer [token]",
				"X-GitHub-Api-Version": "2022-11-28"
			})
  		})
		.then(resp => resp.json())
		.then(data => {
			let html = `<div>\
							<img src="${data.avatar_url}" alt="avatar">
							<h1>Login: ${data.login}</h1>\
							<p>Followers: ${data.followers}</p>\
							<p>Following: ${data.following}</p>\
							<p>Public Repositories: ${data.public_repos}</p>
						</div>`

			this.innerHTML = html;
		})
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
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

customElements.define("pw-ghuser", PWChuck);
