class PWBasic extends HTMLElement {
    constructor() {
        super();
        // element created
    }

    connectedCallback() {
        this.user = "medeirosgabriel"
        this.innerHTML= `<p><a href="https://github.com/${this.user}">${this.user}</a></p>`
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

customElements.define("pw-basic", PWBasic);
