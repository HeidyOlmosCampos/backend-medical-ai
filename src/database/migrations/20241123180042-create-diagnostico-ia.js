
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diagnosticos_ia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      examen_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'examenes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      modelo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'modelos_ia',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      imagen_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      resultado: {
        type: Sequelize.JSON,
        allowNull: false
      },
      anomalia_detectada: Sequelize.TEXT,
      gravedad: {
        type: Sequelize.ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA'),
        allowNull: false
      },
      confianza: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 1
        }
      },
      recomendaciones: Sequelize.TEXT,
      validado_por: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      estado: {
        type: Sequelize.ENUM('PENDIENTE', 'VALIDADO', 'RECHAZADO'),
        defaultValue: 'PENDIENTE'
      },
      comentarios_medico: Sequelize.TEXT,
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Añadir índices
    await queryInterface.addIndex('diagnosticos_ia', ['paciente_id']);
    await queryInterface.addIndex('diagnosticos_ia', ['examen_id']);
    await queryInterface.addIndex('diagnosticos_ia', ['modelo_id']);
    await queryInterface.addIndex('diagnosticos_ia', ['fecha']);
    await queryInterface.addIndex('diagnosticos_ia', ['gravedad']);
    await queryInterface.addIndex('diagnosticos_ia', ['estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diagnosticos_ia');
  }
};