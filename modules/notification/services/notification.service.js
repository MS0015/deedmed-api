'use-strict';

const NotificationRepository = require('../repositories/notification.repository');
const {NOTIFICATION_STATUS} = require('../../../lib/constant'); 
const ChannelStrategy = require('../strategies/Channel.strategy');
const Sms = require('../strategies/Sms.strategy');
const Email = require('../strategies/Email.strategy');

class NotificationService {

    static async create(data) {
        try{
            const notificationTemplate = await NotificationRepository.getNotficationTemplateByCode(data.template);
            if(!notificationTemplate) {
                return new Error('Template not found');
            }

            const content = await this.generateContent(notificationTemplate.template, data.params);

            const notification = {
                "mobile": data.mobile,
                "email": data.email,
                "deviceId": data.deviceId,
                "params": JSON.stringify(data.params),
                "groupId": notificationTemplate.groupId,
                "channelId": notificationTemplate.channelId,
                "message": content,
                "status": NOTIFICATION_STATUS.NOTIFICATION_CREATED
            };
            const save = await NotificationRepository.create(notification);
            if(save.id) {
                const sendToGateway = await this.sendToGateway(notification);
            } 
            return Promise.resolve({"notificationId": save.id});
        }catch(err){
            return Promise.reject(err);
        }
    }    

    static async generateContent(template, params) {
        let content = template;
        for (const key in params) {
            content = content.replace(key,params[key]);
        }
        return content;   
    }

    /**
     * 
     * Add your own channel strategy to here.
     */
    static async sendToGateway(notification) {
        if(notification.channelId == 1) {
           await ChannelStrategy.setStrategy(Sms);
        }else {
           await ChannelStrategy.setStrategy(Email);
        }

        return await ChannelStrategy.sendToGateway(notification);
    }
}

module.exports = NotificationService;