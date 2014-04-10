var message = require('../message');
var ko = require('../lib/knockout');
var route = require('../lib/router');
var api = require('../api');
var validate = require('../validate');

exports.create = function(data) {

    var user = {

        username: ko.observable(''),
        fullname: ko.observable(''),
        type: ko.observable('normal'),
        link: ko.observable(''),
        password: ko.observable(''),
        password_edit: ko.observable(true),
        password_text: ko.observable(false),
        error: ko.observable(''),
        creating: true,

        save: function(form) {

            validate.clear(form);

            if (user.password_edit()) {

                var password = user.password();

                if (password === '') {

                    validate.error('user-password', 'Password is not set.');

                } else if (password.length < 6) {

                    validate.error('user-password', 'Password length must be at least 6.');
                }
            }

            var username = user.username();

            if (username === '') {

                validate.error('user-username', 'Username is not set.');

            } else {

                if (!username.match(/^[a-zA-Z0-9]+$/)) {

                    validate.error('user-username', 'Use letters and numbers only.');
                }
            }

            var fullname = user.fullname();

            if (fullname === '') {

                validate.error('user-fullname', 'Full name is not set.');
            }

            var link = user.link();

            if (link !== '') {

                if (!link.match(/https?:\/\//)) {

                    validate.error('user-link', 'Link must start with http:// or https:// prefix.');
                }
            }

            if (validate.hasError(form)) {

                return false;
            }

            if (user.$id) {

                api.updateUser(user.$id, user.toJS()).then(function(response) {

                    if (response.status === 'success') {

                        route.go('users');

                    } else {

                        validate.formError(form, response.message);
                    }

                }, message.error);

            } else {

                api.saveUser(user.toJS()).then(function(response) {

                    if (response.status === 'success') {

                        route.go('users');

                    } else {

                        validate.formError(form, response.message);
                    }

                }, message.error);
            }

            return false;
        },

        toJS: function() {

            var js = {

                username: user.username(),
                fullname: user.fullname(),
                type: user.type(),
                link: user.link()
            };

            if (user.password_edit()) {

                js.password = user.password();
            }

            return js;
        }
    };

    user.password_text.subscribe(function(value) {

        if (value) {

            document.getElementById('user-password').type = 'text';

        } else {

            document.getElementById('user-password').type = 'password';
        }
    });

    if (data) {

        user.$id = data.$id;
        user.creating = false;
        user.username(data.username);
        user.fullname(data.fullname);
        user.type(data.type);
        user.link(data.link);
        user.password_edit(false);
    }

    return user;
};