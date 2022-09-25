'use-strict';
const { models: { Notification, NotificationChannel, NotificationGroup, NotificationTemplate } } = require('../../../lib/models/index');

class NotificationRepository {
    static async create(data) {
        try {
            const result = await Notification.create(data);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getNotficationTemplateByCode(code) {
        try{
            const template = await NotificationTemplate.findOne({where: {'code': code}, include: [{model: NotificationChannel}, {model: NotificationGroup}]});
            return Promise.resolve(template);
        }catch(err) {
            return Promise.reject(err);
        }
    }
}

module.exports = NotificationRepository;