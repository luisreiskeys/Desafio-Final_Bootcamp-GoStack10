import Sequelize, { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveriesController {
  async index(req, res) {
    const { page = 1, q = '' } = req.query;
    const end_date =
      req.params.status && req.params.status === 'entregue'
        ? { [Op.ne]: null }
        : null;
    const deliveries = await Delivery.findAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'created_at',
        'status'
      ],
      limit: 20,
      offset: (page - 1) * 20,
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date,
        product: { [Op.iLike]: `%${q}%` }
      },
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

    return res.json(deliveries);
  }

  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.delivery_id);

    if (
      (req.body.end_date || req.body.signature_id) &&
      (!req.body.end_date || !req.body.signature_id)
    ) {
      return res.status(400).json({
        error: 'To end a delivery ou must informe both end_date e signature_id'
      });
    }
    await delivery.update(req.body).catch(Sequelize.Error, err => {
      return res.status(401).json({ error: err.message });
    });
    return res.json();
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

export default new DeliveriesController();
