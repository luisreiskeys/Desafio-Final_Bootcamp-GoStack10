import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class RecipientController {
  async index(req, res) {
    const { page = 1, q = '', perPage = 6 } = req.query;
    const total = await Recipient.count({
      where: {
        name: { [Op.iLike]: `%${q}%` }
      }
    });
    const recipients = await Recipient.findAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      where: {
        name: { [Op.iLike]: `%${q}%` }
      },
      order: ['id']
    });

    return res.json({ recipients, total });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string()
        .required()
        .length(8)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade failure' });
    }
    const {
      id,
      name,
      numero,
      rua,
      complemento,
      estado,
      cidade,
      cep
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string().length(8)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validade failure' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    const {
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep
    });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'This recipient does not exists' });
    }

    const deliveries = await Delivery.count({
      where: { recipient_id: recipient.id }
    });

    if (deliveries > 0) {
      return res.status(401).json({
        error: 'Esse destinatário não pode ser deletado pois possui encomendas'
      });
    }
    recipient.destroy();

    return res.json({ msg: 'Recipient removed' });
  }
}

export default new RecipientController();
