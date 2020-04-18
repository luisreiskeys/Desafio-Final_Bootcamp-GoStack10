import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import NewDelivery from '../jobs/NewDelivery';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { page = 1, q = '', perPage = 6 } = req.query;
    const total = await Delivery.count({
      where: {
        product: { [Op.iLike]: `%${q}%` }
      }
    });
    const deliveries = await Delivery.findAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'status',
        'canceled_at'
      ],
      limit: perPage,
      order: ['id'],
      where: {
        product: { [Op.iLike]: `%${q}%` }
      },
      offset: (page - 1) * perPage,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'cep',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade'
          ]
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path']
            }
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path']
        }
      ]
    });

    return res.json({ deliveries, total });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade failure' });
    }

    const { id, recipient_id, deliveryman_id, product } = await Delivery.create(
      req.body
    );

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'end_date', 'createdAt'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'cep',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade'
          ]
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    await Queue.add(NewDelivery.key, { delivery });

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    await delivery.update(req.body);
    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(401).json({ error: 'This delivery does not exists' });
    }

    delivery.destroy();
    return res.json({ msg: 'This delivery was deleted' });
  }
}

export default new DeliveryController();
