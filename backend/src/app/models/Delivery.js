/* eslint-disable no-underscore-dangle */
import Sequelize, { Model, Op, ValidationError } from 'sequelize';
import { isAfter, isBefore, addHours, startOfDay, endOfDay } from 'date-fns';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.getDataValue('canceled_at')) {
              return 'cancelada';
            }
            if (
              this.getDataValue('start_date') === null &&
              this.getDataValue('end_date') === null
            ) {
              return 'pendente';
            }
            if (
              this.getDataValue('start_date') !== null &&
              this.getDataValue('end_date') === null
            ) {
              return 'retirada';
            }
            return 'entregue';
          }
        },
        withdrawable: {
          type: Sequelize.VIRTUAL,
          get() {
            return (
              isAfter(
                new Date(this.getDataValue('start_date')),
                addHours(startOfDay(new Date()), 8)
              ) &&
              isBefore(
                new Date(this.getDataValue('start_date')),
                addHours(startOfDay(new Date()), 18)
              )
            );
          }
        }
      },
      {
        sequelize
      }
    );
    this.addHook('beforeUpdate', async delivery => {
      if (delivery.start_date !== delivery._previousDataValues.start_date) {
        if (!delivery.withdrawable) {
          throw new ValidationError(
            'Withdrawals can only be made between 8:00 am and 6:00 pm'
          );
        }
        const todayDeliveries = await this.count({
          where: {
            deliveryman_id: delivery.deliveryman_id,
            start_date: {
              [Op.between]: [
                startOfDay(delivery.start_date),
                endOfDay(delivery.start_date)
              ]
            }
          }
        });
        if (
          delivery._previousDataValues.start_date === null &&
          todayDeliveries > 4
        ) {
          throw new ValidationError('You can only make 5 deliveries per day');
        }
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.DeliveryProblem, {
      foreignKey: 'delivery_id',
      as: 'problems'
    });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature'
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient'
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman'
    });
  }
}

export default Delivery;
