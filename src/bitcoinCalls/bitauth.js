export class Auth {
    constructor(user, password, rpcurl, port) {
        this.user = user;
        this.password = password
        this.rpcurl = rpcurl
        this.port = port,
        this.url = `http://${user}:${pass}@${rpcurl}:${port}/`
    }
    getUrl() {
        return `http://${user}:${pass}@${rpcurl}:${port}`;
    }
}