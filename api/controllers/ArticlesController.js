/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function (req, res) {
        Articles.find({}).exec(function (err, articles) {
            if (err) {
                res.send(500, { error: 'Database error' });
            }
            res.view('pages/list', { articles: articles });
        });
    },
    add: function (req, res) {
        res.view('pages/add');
    },
    create: function (req, res) {
        Articles.create({ title: req.body.title, body: req.body.body }).exec(function (err) {
            if (err) {
                res.send(500, { message: 'Database error' });
            }

            res.redirect('/articles/list');
        });
    },
    delete: function (req, res) {
        Articles.destroy({ id: req.param('id') }).exec(function (err) {
            if (err) {
                res.send(500, { message: 'Database error' });
            }

            res.redirect('/articles/list');
        });

        return false;
    },
    edit: function (req, res) {
        Articles.findOne({ id: req.param('id') }).exec(function (err, article) {
            if (err) {
                res.send(500, { message: 'Database error' });
            }

            res.view('pages/edit', { article: article });
        });
    },
    update: function (req, res) {
        Articles.update({ id: req.param('id') }, { title: req.body.title, body: req.body.body }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database error' });
            }

            res.redirect('/articles/list');
        });

        return false;
    }
};

