import axios from 'axios'

class Network {
    constructor() {
        this.waiting = false
    }

    get(path, handler) {
        if (this.waiting) return

        this.waiting = true
        axios.get(path)
            .then(response => {
                this.waiting = false
                handler(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    put(path, args, handler){
        if (this.waiting) return

        this.waiting = true
        axios.put(path, args)
            .then(response => {
                this.waiting = false
                handler(response)
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export default Network