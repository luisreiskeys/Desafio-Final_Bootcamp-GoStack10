import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data }) {
    const { delivery } = data;
    const complemento = delivery.recipient.complemento
      ? ` -${delivery.recipient.complemento} -`
      : null;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova entrega cadastrada',
      template: 'newDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        recipient: delivery.recipient.name,
        recipient_address: `${delivery.recipient.rua}, ${delivery.recipient.numero} ${complemento}, ${delivery.recipient.cidade} - ${delivery.recipient.estado}, ${delivery.recipient.cep} `,
        createdAt_date: format(
          parseISO(delivery.createdAt),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt
          }
        )
      }
    });
  }
}

export default new NewDelivery();
