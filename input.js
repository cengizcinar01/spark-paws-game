export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            console.log(e.key, this.keys);
            if (e.key === 'ArrowDown' && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
    }
}
