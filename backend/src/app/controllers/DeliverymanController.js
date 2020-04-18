import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, q = '', perPage = 6 } = req.query;
    const total = await Deliveryman.count({
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      }
    });
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      limit: perPage,
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      },
      offset: (page - 1) * perPage,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path']
        }
      ]
    });

    return res.json({ deliveryman, total });
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    });
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exixts. ' });
    }
    const { id, name, email, createdAt, avatar } = deliveryman;
    return res.json({ id, name, email, created_at: createdAt, avatar });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade failure' });
    }
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email }
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliver already exixts. ' });
    }
    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exixts. ' });
    }
    if (req.body.email && req.body.email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: req.body.email }
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exixts. ' });
      }
    }

    await deliveryman.update(req.body);

    const { id, name, email, avatar } = await Deliveryman.findByPk(
      req.params.id,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url']
          }
        ]
      }
    );

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'This deliver does not exists' });
    }

    const deliveries = await Delivery.count({
      where: { deliveryman_id: deliveryman.id }
    });

    if (deliveries > 0) {
      return res.status(401).json({
        error: 'Esse entregador não pode ser deletado pois possui encomendas'
      });
    }
    deliveryman.destroy();

    return res.json({ msg: 'Deliveryman removed' });
  }
}

export default new DeliverymanController();
