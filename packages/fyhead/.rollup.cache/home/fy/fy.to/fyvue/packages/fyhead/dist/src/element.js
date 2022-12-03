import { generateUUID } from './helpers';
export class ElProperty {
    key;
    value;
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return this.value ? `${this.key}="${this.value}"` : this.key;
    }
}
export class El {
    tag;
    properties;
    content;
    key;
    constructor(tag, properties = [], key, content) {
        this.tag = tag;
        this.properties = properties;
        this.content = content;
        if (key)
            this.key = key;
        else
            this.key = this.getKey();
    }
    getKey() {
        return generateUUID();
    }
    toStringProperties() {
        let propertiesString = '';
        for (const property of this.properties) {
            propertiesString += ` ${property.toString()}`;
        }
        return propertiesString.trim();
    }
    toString() {
        return `<${this.tag} ${this.toStringProperties()}>${this.content ? this.content : ''}</${this.tag}>`;
    }
    toDom(doc) {
        const el = doc.createElement(this.tag);
        for (const property of this.properties) {
            el.setAttribute(property.key, property.value ? property.value : '');
        }
        if (this.content) {
            el.innerText = this.content;
        }
        return el;
    }
}
//# sourceMappingURL=element.js.map