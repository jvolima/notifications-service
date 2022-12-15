import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  content: string;
  category: string;
  recipientId: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { content, category, recipientId } = request;

    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
