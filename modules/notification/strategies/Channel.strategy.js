'use-strict';

class ChannelStrategy {
    constructor() {
        this.channel = "";
    }

    static async setStrategy(channel) {
        this.channel = channel;
    }

    static async sendToGateway(notification) {
        return await this.channel.sendToGateway(notification);
    }
}


module.exports = ChannelStrategy;