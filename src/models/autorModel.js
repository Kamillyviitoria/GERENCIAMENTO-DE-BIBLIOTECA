'use strict';

module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define('Autor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Nome do autor é obrigatório' }
            }
        },
        nacionalidade: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: { msg: 'Data de nascimento inválida' }
            }
        },
        biografia: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'autores',
        underscored: true,
        timestamps: true
    });

    // Associações (chame Autor.associate(models) no bootstrap dos models)
    Autor.associate = (models) => {
        if (models.Livro) {
            Autor.hasMany(models.Livro, {
                as: 'livros',
                foreignKey: 'autor_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            });
        }
    };

    return Autor;
};