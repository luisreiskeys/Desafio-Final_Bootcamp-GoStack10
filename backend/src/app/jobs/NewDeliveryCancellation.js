import Mail from '../../lib/Mail';

class NewDeliveryCancellation {
  get key() {
    return 'NewDeliveryCancellation';
  }

  async handle({ data }) {
    const { mailData } = data;
    const { delivery, problem } = mailData;
    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'entrega cancelada',
      template: 'newDeliveryCancellation',
      context: {
        delivery_id: delivery.id,
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        recipient: delivery.recipient.name,
        problem
      }
    });
  }
}

export default new NewDeliveryCancellation();
